const { Task } = require('../models')

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        return res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: task,
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getAllUserTasks = async (req, res) => {
    try {
        const { userId } = req.params
        const tasks = await Task.findAll({
            where: { userId: userId }
        })
        return res.status(200).json({ tasks })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const getTaskById = async (req, res) => {
  try {
      const { id } = req.params
      const task = await Task.findByPk(id)
      if (task) {
          return res.status(200).json({ task })
      }
      return res.status(404).json({ error: 'Task with the specified id does not exists' })
  } catch (error) {
      return res.status(500).json({ error: error.message })
  }
}

const updateTask = async (req, res) => {
    try {
        const { id, userId } = req.params
        const [updated] = await Task.update(req.body, {
            where: { id: id, userId: userId }
        })
        if (updated) {
            const updatedTask = await Task.findOne({ where: { id: id } })
            return res.status(200).json({
                success: true,
                message: 'Task updated successfully',
                data: updatedTask })
        }
        throw new Error('Task not found')
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id, userId } = req.params
        const deleted = await Task.destroy({
            where: { id: id, userId: userId }
        })
        if (deleted) {
            return res.status(204).json({
                success: true,
                message: 'Task deleted successfully'
            })
        }
        throw new Error('Task not found')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    createTask,
    getAllUserTasks,
    getTaskById,
    updateTask,
    deleteTask
}