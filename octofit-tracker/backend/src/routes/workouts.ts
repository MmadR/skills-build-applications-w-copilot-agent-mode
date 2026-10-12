import { Router } from 'express'
import Workout from '../models/Workout.js'

const router = Router()

router.get('/', async (_request, response) => {
  response.json(await Workout.find().sort({ name: 1 }))
})

router.post('/', async (request, response) => {
  response.status(201).json(await Workout.create(request.body))
})

export default router
