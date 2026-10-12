import { useEffect, useState } from 'react'

function valueAtPath(item, path) {
  return path.split('.').reduce((value, key) => value?.[key], item)
}

function displayValue(value) {
  if (value === null || value === undefined || value === '') return '—'
  if (Array.isArray(value)) return value.map(displayValue).join(', ')
  if (typeof value === 'object') return value.name ?? value.username ?? JSON.stringify(value)
  return String(value)
}

export default function ResourceList({ title, endpoint, columns, load }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    load(endpoint, { signal: controller.signal })
      .then((records) => {
        setItems(records)
        setStatus('ready')
      })
      .catch((requestError) => {
        if (requestError.name === 'AbortError') return
        setError(requestError.message)
        setStatus('error')
      })

    return () => controller.abort()
  }, [endpoint, load])

  return (
    <section className="resource-view">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OCTOFIT / TRACKER</p>
          <h1>{title}</h1>
        </div>
        {status === 'ready' && (
          <span className="record-count"><strong>{items.length}</strong> records</span>
        )}
      </div>

      <div className="data-surface">
        {status === 'loading' && <p className="feedback" role="status">Loading {title.toLowerCase()}…</p>}
        {status === 'error' && (
          <p className="feedback error" role="alert">
            Could not load {title.toLowerCase()}: {error}
          </p>
        )}
        {status === 'ready' && items.length === 0 && (
          <p className="feedback">No {title.toLowerCase()} to show yet.</p>
        )}
        {status === 'ready' && items.length > 0 && (
          <div className="table-responsive">
            <table className="table resource-table mb-0">
              <thead>
                <tr>
                  <th scope="col" className="row-number">#</th>
                  {columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item._id ?? item.id ?? `${endpoint}-${index}`}>
                    <td className="row-number">{String(index + 1).padStart(2, '0')}</td>
                    {columns.map((column, columnIndex) => (
                      <td className={columnIndex === 0 ? 'primary-cell' : ''} key={column.key}>
                        {displayValue(valueAtPath(item, column.key))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}