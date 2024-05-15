/**
 * Veramo services internal representation of id and description does not sync with the did:ethr stored one. Therefore we need to use ids that we can recreate.
 */
import { createHash } from 'node:crypto'

function digest (input: string): string {
  const hash = createHash('sha256')
  hash.update(input)
  return hash.digest('base64url')
}

export function internalServiceId (type: string, endpoint: string): string {
  return digest(`${type}:${endpoint}`)
}
