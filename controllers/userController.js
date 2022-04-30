const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { User, Task } = require('../models')

const createUser = async (req, res) => {
    try {

        const { firstName, lastName, email, password } = req.body

        if (!(email && password && firstName && lastName)) {
            res.status(400).json({ error: 'All input is required' })
        }

        const oldUser = await User.findOne({where: { email }})

        if (oldUser) {
            return res.status(409).json({ error: 'User Already Exist. Please Login' })
        }

        encryptedPassword = await bcrypt.hash(password, 10)

        let user = await User.create({firstName, lastName, email, password: encryptedPassword})

        const token = jwt.sign(
            { userId: user.id, email },
            process.env.TOKEN_KEY,
            { expiresIn: '2h', }
            )

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: user,
            token
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!(email && password)) {
          res.status(400).json({ error: 'All input are required' })
        }

        const user = await User.findOne({where: { email }})

        if (user && (await bcrypt.compare(password, user.password))) {

          const token = jwt.sign(
            { userId: user.id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: '2h',
            }
          )

          return res.status(200).json({
              success: true,
              user,
              token
          })
        }
        return res.status(400).json({ error: 'Invalid Credentials' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


const getUserById = async (req, res) => {
  try {
      const { id } = req.params
      const user = await User.findOne({
          where: { id: id },
          include: [
              {
                model: Task
              }
          ]
      })
      if (user) {
        return res.status(200).json({ success: true, user })
      }
      return res.status(404).send({ error: 'User with the specified ID does not exists'} )
  } catch (error) {
      return res.status(500).json({ error: error.message })
  }
}

module.exports = {
    createUser,
    loginUser,
    getUserById
}