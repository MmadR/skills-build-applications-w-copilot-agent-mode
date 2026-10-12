import { Router } from 'express'
import Activity from '../models/Activity.js'

const router = Router()

router.get('/', async (_request, response) => {
  response.json(await Activity.find().populate('user').sort({ completedAt: -1 }))
})

router.post('/', async (request, response) => {
  const activity = await Activity.create(request.body)
  response.status(201).json(await activity.populate('user'))
})

export default router
