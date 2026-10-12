import { Router } from 'express'
import Team from '../models/Team.js'

const router = Router()

router.get('/', async (_request, response) => {
  response.json(await Team.find().populate('members').sort({ name: 1 }))
})

router.post('/', async (request, response) => {
  const team = await Team.create(request.body)
  response.status(201).json(await team.populate('members'))
})

export default router
