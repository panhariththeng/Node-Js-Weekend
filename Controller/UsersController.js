const User = require('../Model/Users')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const getAll = async (req, res) => {
  try {
    const users = await User.find({
      is_delete: false,
    })
    res.status(200).json({ success: true, data: users })
  } catch (error) {
    res.status(400).json({ sucess: false, message: error })
  }
}

const getById = async (req, res) => {
  const id = req.params.id
  console.log(id)
  try {
    const user = await User.findById(id)
    console.log(user)
    if (!user || user.is_delete) {
      throw 'Data not exist!'
    }

    res.status(200).json({ success: true, data: user })
  } catch (error) {
    res.status(400).json({ sucess: false, message: error })
  }
}

const create = async (req, res) => {
  const password = req.body.password

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      try {
        req.body.password = hash
        await User.create(req.body)
        res.status(200).json({ success: true, message: 'Created successfully' })
      } catch (error) {
        res.status(400).json({ sucess: false, message: error })
      }
    })
  })
}

const update = async (req, res) => {
  const { lastname, firstName, password } = req.body
  const id = req.params
  try {
    const user = await User.findById(id)

    if (!user || user.is_delete) {
      throw 'Data not exist!'
    }
    if (lastname) user.lastname = lastname
    if (firstName) user.firstName = firstName
    if (password) user.password = password

    await user.save()

    res.status(200).json({ success: true, message: 'Updated successfully' })
  } catch (error) {
    res.status(400).json({ sucess: false, message: error })
  }
}

const deleteOne = async (req, res) => {
  const id = req.params
  try {
    const user = await User.findById(id)

    if (!user || user.is_delete) {
      throw 'Data not exist!'
    }
    user.is_delete = true

    await user.save()

    res.status(200).json({ success: true, message: 'Deleted successfully' })
  } catch (error) {
    res.status(400).json({ sucess: false, message: error })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.find({ email: email })

    console.log(user[0].password)
    if (user == '') {
      throw 'Email or password is not correct '
    }
    console.log(password)
    bcrypt.compare(password, user[0].password, (err, result) => {
      console.log(result)
      const token = jwt.sign(
        {
          user: { id: user[0]._id.toString() },
          exp: Math.floor(Date.now() / 1000) + 3600 * 24,
        },
        'privatekey',
      )
      //const decoded = jwt.verify(token, 'privatekey');
      if (result) {
        res
          .status(200)
          .json({ success: true, message: 'Login succesfully', token: token })
      } else {
        res
          .status(400)
          .json({ sucess: false, message: 'Email or password is not correct' })
      }
    })
  } catch (error) {
    res.status(400).json({ sucess: false, message: error })
  }
}

const changePassword = async (req, res, next) => {
  console.log('change password')
  let { oldPassword, newPassword } = req.body
  try {
    // get user info
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      throw 'user not exist'
    }
    bcrypt.compare(oldPassword, user.password, (err, result) => {
      if (!result) {
        throw 'Old password is not correct'

        // Compare password
      } else {
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(newPassword, salt, async function (err, hash) {
            try {
              console.log('Hello')

              newPassword = hash

              user.password = newPassword

              await user.save()
              res.status(200).json({
                success: true,
                message: 'Change password successfully',
              })
            } catch (error) {
              res.status(400).json({ sucess: false, message: error })
            }
          })
        })
      }
    })

    // const password = await bcrypt.hash(req.body.password);
    // const UserPassword = await user.findByIdAndUpdate({_id: id}, {password: password}, {new: true});
    // return res.status(200).json({success: true, message: "Password succesfully", password: UserPassword})
  } catch (error) {
    return res.status(400).json({ sucess: false, message: error })
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteOne,
  login,
  changePassword,
}
