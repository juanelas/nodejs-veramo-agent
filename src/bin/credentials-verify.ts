import { agent } from '../veramo/setup.js'

async function main (): Promise<void> {
  if (process.argv[2] === undefined) {
    console.log('Usage: npm run credential:verify <verifiableCredential>\nExample:  npm run credential:verify \'{"credentialSubject":{"claim":"student","id":"did:ethr:goerli:0x0369134c7f5fb6c994f0292afca9c8bb402e159bdc5d83cebc2d9283001a136095"},"issuer":{"id":"did:ethr:goerli:0x0259cd008d2f9f77dcfa1d1d2aee8843e306f35112246e9abae6d71b18dda0dbd3"},"type":["VerifiableCredential"],"@context":["https://www.w3.org/2018/credentials/v1"],"issuanceDate":"2023-10-11T10:24:52.000Z","proof":{"type":"JwtProof2020","jwt":"eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImNsYWltIjoic3R1ZGVudCJ9fSwic3ViIjoiZGlkOmV0aHI6Z29lcmxpOjB4MDM2OTEzNGM3ZjVmYjZjOTk0ZjAyOTJhZmNhOWM4YmI0MDJlMTU5YmRjNWQ4M2NlYmMyZDkyODMwMDFhMTM2MDk1IiwibmJmIjoxNjk3MDE5ODkyLCJpc3MiOiJkaWQ6ZXRocjpnb2VybGk6MHgwMjU5Y2QwMDhkMmY5Zjc3ZGNmYTFkMWQyYWVlODg0M2UzMDZmMzUxMTIyNDZlOWFiYWU2ZDcxYjE4ZGRhMGRiZDMifQ.Gc48upfl3Tzn_uOUMDzdfQrfQTutuXc3hCPPL1S75Ht36aOuHBh7nfk7fQN9CXwSrXBW2rxRi5061VsVUsqkIQ"}}\'')
    return
  }

  const credential = JSON.parse(process.argv[2])
  const result = await agent.verifyCredential({
    credential
  })
  console.log('Credential verified', result.verified)
}

main().catch(console.log)
