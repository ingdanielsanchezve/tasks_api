'use strict'

const { faker } = require('@faker-js/faker')

const tasks = [...Array(100)].map((user) => (
  {
    title: faker.lorem.sentence(5),
    userId: faker.mersenne.rand(1, 10),
    createdAt: new Date(),
    updatedAt: new Date()
  }
))

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tasks',
    [{
      title: 'Hello World this is the first task',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, ...tasks], {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tasks', null, {})
  }
}
