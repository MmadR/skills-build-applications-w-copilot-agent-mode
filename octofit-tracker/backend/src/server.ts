import express from 'express'
import mongoose from 'mongoose'
import database from './config/database.js'
import { connectDatabase } from './config/database.js'
import activitiesRouter from './routes/activities.js'
import leaderboardRouter from './routes/leaderboard.js'
import teamsRouter from './routes/teams.js'
import usersRouter from './routes/users.js'
import workoutsRouter from './routes/workouts.js'

const app = express()
const port = Number(process.env.PORT || 8000)
const apiBaseUrl = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : 'http://localhost:8000'

app.use(express.json())

app.get('/api/health/', (_request, response) => {
  const connected = database.readyState === 1
  const status = connected ? 200 : 503
  response.status(status).json({
    status: connected ? 'ok' : 'unavailable',
    database: connected ? 'connected' : 'disconnected',
  })
})

app.use('/api/users/', usersRouter)
app.use('/api/teams/', teamsRouter)
app.use('/api/activities/', activitiesRouter)
app.use('/api/leaderboard/', leaderboardRouter)
app.use('/api/workouts/', workoutsRouter)

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error('API request failed:', error)
  const status =
    error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError
      ? 400
      : isDuplicateKeyError(error)
        ? 409
        : getClientErrorStatus(error) ?? 500
  const message = status === 500 ? 'An unexpected error occurred' : error instanceof Error ? error.message : 'Invalid request'
  response.status(status).json({ error: message })
})

function isDuplicateKeyError(error: unknown): error is Error & { code: number } {
  return typeof error === 'object' && error !== null && 'code' in error && error.code === 11000
}

function getClientErrorStatus(error: unknown): number | undefined {
  if (typeof error !== 'object' || error === null || !('status' in error)) {
    return undefined
  }

  const { status } = error
  return typeof status === 'number' && status >= 400 && status < 500 ? status : undefined
}

async function startServer() {
  await connectDatabase()
  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit API listening at ${apiBaseUrl}`)
  })
}

startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit API:', error)
  process.exitCode = 1
})