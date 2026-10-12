import { model, Schema } from 'mongoose'

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    points: { type: Number, required: true, default: 0, min: 0 },
    period: { type: String, required: true, default: 'all-time', trim: true },
  },
  { timestamps: true },
)

export default model('Leaderboard', leaderboardSchema)
