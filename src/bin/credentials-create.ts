import type { CredentialSubject } from '@veramo/core'
import { agent } from '../veramo/setup.js'

async function main (): Promise<void> {
  if (process.argv[2] === undefined || process.argv[3] === undefined || process.argv[4] === undefined || process.argv[5] === undefined) {
    console.log('Usage: npm run credential:create <issuerDidOrAlias> <SubjectDid> <claimName> <claimValue>')
    return
  }

  const identifier = (process.argv[2].startsWith('did:')) ? await agent.didManagerGet({ did: process.argv[2] }) : await agent.didManagerGetByAlias({ alias: process.argv[2] })

  const credentialSubject: CredentialSubject = {
    id: process.argv[3]
  }
  credentialSubject[process.argv[4]] = process.argv[5]

  const verifiableCredential = await agent.createVerifiableCredential({
    credential: {
      issuer: { id: identifier.did },
      credentialSubject
    },
    proofFormat: 'jwt'
  })
  console.log('New credential created')
  console.log(JSON.stringify(verifiableCredential, null, 2))
  console.log('----- ONE-LINE EXPORT -----')
  console.log(JSON.stringify(verifiableCredential))
}

main().catch(console.log)
