import type { VerifiableCredential } from '@veramo/core'
import { agent } from '../veramo/setup.js'

async function main (): Promise<void> {
  if (process.argv[2] === undefined) {
    console.log('Usage: npm run credentials:import <verifiableCredential>')
    return
  }
  const verifiableCredential = JSON.parse(process.argv[2]) as VerifiableCredential
  const result = await agent.verifyCredential({
    credential: verifiableCredential
  })
  if (result.verified) {
    await agent.dataStoreSaveVerifiableCredential({ verifiableCredential })
    console.log('New credential stored', verifiableCredential)
  } else {
    console.log(verifiableCredential, 'ERROR: credential not verified', result.error)
  }
}

main().catch(console.log)
