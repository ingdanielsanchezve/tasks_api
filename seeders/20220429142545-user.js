'use strict'

const { faker } = require('@faker-js/faker')
const bcrypt = require('bcryptjs')

const hashPassword = password => bcrypt.hashSync(password, 10)

const users = [...Array(10)].map((user) => (
  {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: hashPassword(faker.internet.password(8)),
    createdAt: new Date(),
    updatedAt: new Date()
  }
))

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',
    [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'demo@demo.com',
      password: bcrypt.hashSync('$321pass!'),
      createdAt: new Date(),
      updatedAt: new Date()
    }, ...users], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
}