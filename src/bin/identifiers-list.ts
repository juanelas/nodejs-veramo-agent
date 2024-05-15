import { agent } from '../veramo/setup.js'

async function main (): Promise<void> {
  const identifiers = await agent.didManagerFind()
  if (identifiers.length === 1) {
    console.log('1 identifier in storage. Showing associated DID Document\n')
  } else {
    console.log(`${identifiers.length} identifiers in storage. Showing associated DID Documents\n`)
  }

  if (identifiers.length > 0) {
    for (const id of identifiers) {
      const doc = await agent.resolveDid({ didUrl: id.did, options: { } })
      if (doc.didDocument === null) {
        throw new Error('Cannot connect to blockchain')
      }
      console.log('................................................................................')
      console.log('----- DID Document for ' + (id.alias as string) + '-----')
      console.log(doc.didDocument)
      console.log('----- ONE-LINE VERSION -----')
      console.log(JSON.stringify(doc.didDocument))
      console.log('................................................................................')
    }
  }
}

main().catch(console.log)
