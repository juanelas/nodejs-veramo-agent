import { internalServiceId } from '../veramo/internal-service-utils.js'
import { agent } from '../veramo/setup.js'

async function main (): Promise<void> {
  if (process.argv[2] === undefined || process.argv[3] === undefined || process.argv[4] === undefined) {
    console.log('Usage: npm run identifier:remove-service <didOrAlias> <serviceType> <serviceEndpoint>')
    return
  }

  const identifier = (process.argv[2].startsWith('did:')) ? await agent.didManagerGet({ did: process.argv[2] }) : await agent.didManagerGetByAlias({ alias: process.argv[2] })
  const id = internalServiceId(process.argv[3], process.argv[4])

  const response = await agent.didManagerRemoveService({
    did: identifier.did,
    id
  }) as string

  console.log(`Service removed from ${identifier.did}`)
  console.log(`https://${process.env.NETWORK_NAME ?? ''}.etherscan.io/tx/${response}`)
}

main().catch(console.log)
