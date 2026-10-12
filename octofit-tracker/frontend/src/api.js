const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function collectionFrom(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  const candidates = [payload.results, payload.items, payload.data]
  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate
    if (candidate && typeof candidate === 'object') {
      const nested = candidate.results ?? candidate.items
      if (Array.isArray(nested)) return nested
    }
  }

  return []
}

export async function fetchCollection(endpoint, options = {}) {
  const response = await fetch(`${apiBase}${endpoint}`, options)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return collectionFrom(await response.json())
}