import { agent } from '../veramo/setup.js'

async function main (): Promise<void> {
  const credentials = await agent.dataStoreORMGetVerifiableCredentials()
  if (credentials.length === 1) {
    console.log('1 verifiable credential in storage\n')
  } else {
    console.log(`${credentials.length} verifiable credentials in storage\n`)
  }

  if (credentials.length > 0) {
    for (const credential of credentials) {
      console.log('................................................................................')
      console.log(credential)
      console.log('----- ONE-LINE VERSION -----')
      console.log(JSON.stringify(credential))
      console.log('................................................................................')
    }
  }
}

main().catch(console.log)
