/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the user.
 *         firstName:
 *           type: string
 *           description: The user first name.
 *         lastName:
 *           type: string
 *           description: The user last name.
 *         email:
 *           type: string
 *           description: The user email.
 *         password:
 *           type: string
 *           description: The user password.
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date of the record creation.
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date of the record update.
 *       example:
 *          firstName: John
 *          lastName: Doe
 *          email: john.doe@email.com
 *          password: 12345678
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - userId
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the task.
 *         title:
 *           type: string
 *           description: The title of your task.
 *         userId:
 *           type: integer
 *           description: User that create the task
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date of the record creation.
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date of the record update.
 *       example:
 *          title: Do the database migration
 *          userId: 1
 */

const { Router } = require('express');
const auth = require('../middleware/auth');

const router = Router();
const userController = require('../controllers/userController');
const taskController = require('../controllers/taskController');

/**
 * @swagger
 * /signup:
 *   post:
 *     description: Register a new user account
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: firstName
 *        description: First name of user.
 *        in: formData
 *        required: true
 *        type: string
 *      - name: lastName
 *        description: Last name of user.
 *        in: formData
 *        required: true
 *        type: string
 *      - name: email
 *        description: Email of user.
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        description: Password of user.
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Data from created user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success of the request.
 *                 message:
 *                   type: string
 *                   description: Message of the request.
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   description: JWT token.
 *               example:
 *                 success: true
 *                 message: User created successfully
 *                 data:
 *                   id: 1
 *                   firstName: John
 *                   lastName: Doe
 *                   email: jonh.doe@email.com
 *                   password: $2a$10$aiZBUW8KLZ/luGzj9HHNwukOI4LZgClFN2L0ADgA72srAIzAU9D9q
 *                   createdAt: 2020-01-01T00:00:00.000Z
 *                   updatedAt: 2020-01-01T00:00:00.000Z
 *                 token: eyJhbGciOiJIUzI1NeIsInR5cZI6IkpXVCJ3.eyJ0c2VySWQiOjEyLCJlbWFpbCI6ImpvbmguZG9lQGVtYWlsLmNvbSIsImlhdCI6MTY1MTMyOTA5NSwiZXhwIjoxNjUxMzM2Mjk1fQ.pO41DBMaJXPlB99Y6OHMLLPMOEPQxwKbvfC4bSJEXls
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       409:
 *         description: User already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *     schema:
 *      $ref: '#/components/schemas/User'
*/
router.post('/signup', userController.createUser)

/**
 * @swagger
 * /login:
 *   post:
 *     description: Login the user to the system
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: email
 *        in: body
 *        description: User email
 *        required: true
 *        type: string
 *      - name: password
 *        in: body
 *        description: User password
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Data from logged in user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success of the request.
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   description: JWT token.
 *               example:
 *                 success: true
 *                 data:
 *                   id: 1
 *                   firstName: John
 *                   lastName: Doe
 *                   email: jonh.doe@email.com
 *                   password: $2a$10$aiZBUW8KLZ/luGzj9HHNwukOI4LZgClFN2L0ADgA72srAIzAU9D9q
 *                   createdAt: 2020-01-01T00:00:00.000Z
 *                   updatedAt: 2020-01-01T00:00:00.000Z
 *                 token: eyJhbGciOiJIUzI1NeIsInR5cZI6IkpXVCJ3.eyJ0c2VySWQiOjEyLCJlbWFpbCI6ImpvbmguZG9lQGVtYWlsLmNvbSIsImlhdCI6MTY1MTMyOTA5NSwiZXhwIjoxNjUxMzM2Mjk1fQ.pO41DBMaJXPlB99Y6OHMLLPMOEPQxwKbvfC4bSJEXls
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *
*/
router.post('/login', userController.loginUser)

// User Routes

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     description: Get the User information
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: User id
 *        in: path
 *        required: true
 *        type: integer
 *      - name: x-access-token
 *        in: header
 *        description: token to be passed as a header
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Data from user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success of the request.
 *                 user:
 *                   type: object
 *                   $ref: '#/components/schemas/User'
 *               example:
 *                 success: true
 *                 data:
 *                   id: 1
 *                   firstName: John
 *                   lastName: Doe
 *                   email: jonh.doe@email.com
 *                   password: $2a$10$aiZBUW8KLZ/luGzj9HHNwukOI4LZgClFN2L0ADgA72srAIzAU9D9q
 *                   createdAt: 2020-01-01T00:00:00.000Z
 *                   updatedAt: 2020-01-01T00:00:00.000Z
 *                   tasks: [
 *                    {
 *                     id: 1,
 *                     title: "Task 1 description",
 *                     userId: 1,
 *                     createdAt: 2020-01-01T00:00:00.000Z,
 *                     updatedAt: 2020-01-01T00:00:00.000Z
 *                    }]
 *       404:
 *         description: User does not exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *
*/
router.get('/users/:id', auth, userController.getUserById)


/**
 * @swagger
 * /users/{userId}/tasks:
 *   get:
 *     description: Get the User tasks
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: userId
 *        description: User id
 *        in: path
 *        required: true
 *        type: integer
 *      - name: x-access-token
 *        in: header
 *        description: token to be passed as a header
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: User tasks.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *               example:
 *                 tasks: [
 *                  {
 *                   id: 1,
 *                   title: "Task 1 description",
 *                   userId: 1,
 *                   createdAt: 2020-01-01T00:00:00.000Z,
 *                   updatedAt: 2020-01-01T00:00:00.000Z
 *                  }]
 *
 *
*/
router.get('/users/:userId/tasks', auth, taskController.getAllUserTasks)

// Task Routes

/**
 * @swagger
 * /tasks:
 *   post:
 *     description: Create a new task
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: title
 *        description: Task title
 *        in: formData
 *        required: true
 *        type: string
 *      - name: userId
 *        description: User id
 *        in: formData
 *        required: true
 *        type: string
 *      - name: x-access-token
 *        in: header
 *        description: token to be passed as a header
 *        required: true
 *        type: string*
 *     responses:
 *       201:
 *         description: Data from created task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success of the request.
 *                 message:
 *                   type: string
 *                   description: Message of the request.
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Task'
 *               example:
 *                 success: true
 *                 message: 'Task created successfully'
 *                 data:
 *                   id: 1
 *                   title: Task 1 description
 *                   userId: 1
 *                   createdAt: 2020-01-01T00:00:00.000Z
 *                   updatedAt: 2020-01-01T00:00:00.000Z
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *     schema:
 *      $ref: '#/components/schemas/Task'
*/
router.post('/tasks', auth, taskController.createTask)

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     description: Get the Task information
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: id
 *        description: Task id
 *        in: formData
 *        required: true
 *        type: string
 *      - name: x-access-token
 *        in: header
 *        description: token to be passed as a header
 *        required: true
 *        type: string*
 *     responses:
 *       200:
 *         description: Data from task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 task:
 *                   type: object
 *                   $ref: '#/components/schemas/Task'
 *               example:
 *                 task:
 *                   id: 1
 *                   title: Task 1 description
 *                   userId: 1
 *                   createdAt: 2020-01-01T00:00:00.000Z
 *                   updatedAt: 2020-01-01T00:00:00.000Z
 *       404:
 *         description: Task does not exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *     schema:
 *      $ref: '#/components/schemas/Task'
*/
router.get('/tasks/:id', auth, taskController.getTaskById)

/**
 * @swagger
 * /tasks/{userId}/{id}:
 *   put:
 *     description: Update the Task information
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: userId
 *        description: User id
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: id
 *        description: Task id
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: x-access-token
 *        in: header
 *        description: token to be passed as a header
 *        required: true
 *        type: string*
 *     responses:
 *       200:
 *         description: Data from task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success of the request.
 *                 message:
 *                   type: string
 *                   description: Message of the request.
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Task'
 *               example:
 *                 success: true
 *                 message: 'Task updated successfully'
 *                 data:
 *                   id: 1
 *                   title: Task 1 description
 *                   userId: 1
 *                   createdAt: 2020-01-01T00:00:00.000Z
 *                   updatedAt: 2020-01-01T00:00:00.000Z
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *     schema:
 *      $ref: '#/components/schemas/Task'
*/
router.put('/tasks/:userId/:id', auth, taskController.updateTask)


/**
 * @swagger
 * /tasks/{userId}/{id}:
 *   delete:
 *     description: Delete the Task information
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: userId
 *        description: User id
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: id
 *        description: Task id
 *        in: formData
 *        required: true
 *        type: integer
 *      - name: x-access-token
 *        in: header
 *        description: token to be passed as a header
 *        required: true
 *        type: string*
 *     responses:
 *       204:
 *         description: Data from task.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Success of the request.
 *                 message:
 *                   type: string
 *                   description: Message of the request.
 *               example:
 *                 success: true
 *                 message: 'Task deleted successfully'
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 *     schema:
 *      $ref: '#/components/schemas/Task'
*/
router.delete('/tasks/:userId/:id', auth, taskController.deleteTask)

module.exports = router