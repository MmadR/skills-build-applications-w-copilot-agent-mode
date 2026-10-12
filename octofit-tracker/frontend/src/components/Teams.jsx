import { fetchCollection as fetch } from '../api.js'
import ResourceList from './ResourceList.jsx'

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'members.length', label: 'Members' },
  { key: 'points', label: 'Points' },
]

export default function Teams() {
  return <ResourceList title="Teams" endpoint="/api/teams/" columns={columns} load={fetch} />
}