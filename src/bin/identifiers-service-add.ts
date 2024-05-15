import { internalServiceId } from '../veramo/internal-service-utils.js'
import { agent } from '../veramo/setup.js'
import 'dotenv/config'

async function main (): Promise<void> {
  if (process.argv[2] === undefined || process.argv[3] === undefined || process.argv[4] === undefined) {
    console.log('Usage: npm run identifier:add-service <didOrAlias> <serviceType> <serviceEndpoint>')
    return
  }

  const identifier = (process.argv[2].startsWith('did:')) ? await agent.didManagerGet({ did: process.argv[2] }) : await agent.didManagerGetByAlias({ alias: process.argv[2] })
  const type = process.argv[3]
  const serviceEndpoint = process.argv[4]

  const response = await agent.didManagerAddService({
    did: identifier.did,
    service: {
      id: internalServiceId(type, serviceEndpoint),
      type,
      serviceEndpoint
    }
  }) as string

  console.log('Service added')
  console.log(`https://${process.env.NETWORK_NAME ?? ''}.etherscan.io/tx/${response}`)
}

main().catch(console.log)
