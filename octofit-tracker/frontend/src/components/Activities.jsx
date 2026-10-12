import { fetchCollection as fetch } from '../api.js'
import ResourceList from './ResourceList.jsx'

const columns = [
  { key: 'type', label: 'Activity' },
  { key: 'user.name', label: 'Athlete' },
  { key: 'duration', label: 'Duration' },
  { key: 'date', label: 'Date' },
]

export default function Activities() {
  return <ResourceList title="Activities" endpoint="/api/activities/" columns={columns} load={fetch} />
}