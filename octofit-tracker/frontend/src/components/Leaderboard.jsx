import { fetchCollection as fetch } from '../api.js'
import ResourceList from './ResourceList.jsx'

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'user.name', label: 'Athlete' },
  { key: 'team.name', label: 'Team' },
  { key: 'points', label: 'Points' },
]

export default function Leaderboard() {
  return <ResourceList title="Leaderboard" endpoint="/api/leaderboard/" columns={columns} load={fetch} />
}