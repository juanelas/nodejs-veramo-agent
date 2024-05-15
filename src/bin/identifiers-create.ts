import { agent } from '../veramo/setup.js'

async function main (): Promise<void> {
  if (process.argv[2] === undefined) {
    console.log('Usage: npm run identifier:create <alias>\nExample:  npm run identifier:create MyDidAlias')
    return
  }
  const identifier = await agent.didManagerCreate({ alias: process.argv[2] })
  console.log('New identifier created')
  console.log(JSON.stringify(identifier, null, 2))
}

main().catch(console.log)
