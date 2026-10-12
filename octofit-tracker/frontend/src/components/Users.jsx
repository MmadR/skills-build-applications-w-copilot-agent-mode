import { fetchCollection as fetch } from '../api.js'
import ResourceList from './ResourceList.jsx'

const columns = [
  { key: 'name', label: 'Athlete' },
  { key: 'email', label: 'Email' },
  { key: 'team.name', label: 'Team' },
]

export default function Users() {
  return <ResourceList title="Users" endpoint="/api/users/" columns={columns} load={fetch} />
}