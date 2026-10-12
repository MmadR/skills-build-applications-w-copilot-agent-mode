import { fetchCollection as fetch } from '../api.js'
import ResourceList from './ResourceList.jsx'

const columns = [
  { key: 'name', label: 'Workout' },
  { key: 'type', label: 'Type' },
  { key: 'duration', label: 'Duration' },
  { key: 'difficulty', label: 'Difficulty' },
]

export default function Workouts() {
  return <ResourceList title="Workouts" endpoint="/api/workouts/" columns={columns} load={fetch} />
}