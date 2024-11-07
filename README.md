# A node.js Veramo agent example

An example implementation of a [Veramo agent](https://veramo.io/docs/veramo_agent/introduction) for managing DIDs and VCs using node.js.

## Installation

You can easily create a new agent in direcotry `veramo-agent` in your current directory with:

```sh
git clone https://github.com/juanelas/nodejs-veramo-agent.git veramo-agent
cd veramo-agent
npm i
```

Copy `template.env` to `.env` and fill the required variables (how to connect to the blockchain). You will need to get a project ID from infura <https://www.infura.io>. If testing use `sepolia` for `NETWORK_NAME`.

If you need to create another agent just clone to a different directory. Each agent databse is stored in its root directory. You can use the same `.env` variables for all the agents.

## Scripts for Distributed Identifiers (did:ethr method)

- `npm run identifier:list`  List owned/stored identifiers
- `npm run identifier:create <alias>` Creates a new DID (did:ethr method) with alias `<myAlias>`
- `npm run identifier:add-service <didOrAlias> <serviceType> <serviceEndpoint>` Add a service to one of the owned identifiers. Example `npm run identifier:add-service myAlias Telegram @MyTelegramAccount`. The Ethereum account owning the DID must have funds to add the service
- `npm run identifier:remove-service <didOrAlias> <serviceType> <serviceEndpoint>` Remove a service for one of the owned identifiers. Example `npm run identifier:remove-service myAlias Telegram @MyTelegramAccount`. The Ethereum account owning the DID must have funds to add the service

## Scripts for W3C Verifiable Credentials

- `npm run credential:create <issuerDidOrAlias> <SubjectDid> <claimName> <claimValue>` Creates a new verifiable credentials issued by one of the owned identifiers (`<issuerDidOrAlias>`) to a DID (`<SubjectDid>`) holding claim `<claimName>` set to `<claimValue>`
- `npm run credential:verify <verifiableCredential>` verifies a W3C verifiable credential. Example `npm run credential:verify \'{"credentialSubject":{"claim":"student","id":"did:ethr:goerli:0x0369134c7f5fb6c994f0292afca9c8bb402e159bdc5d83cebc2d9283001a136095"},"issuer":{"id":"did:ethr:goerli:0x0259cd008d2f9f77dcfa1d1d2aee8843e306f35112246e9abae6d71b18dda0dbd3"},"type":["VerifiableCredential"],"@context":["https://www.w3.org/2018/credentials/v1"],"issuanceDate":"2023-10-11T10:24:52.000Z","proof":{"type":"JwtProof2020","jwt":"eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImNsYWltIjoic3R1ZGVudCJ9fSwic3ViIjoiZGlkOmV0aHI6Z29lcmxpOjB4MDM2OTEzNGM3ZjVmYjZjOTk0ZjAyOTJhZmNhOWM4YmI0MDJlMTU5YmRjNWQ4M2NlYmMyZDkyODMwMDFhMTM2MDk1IiwibmJmIjoxNjk3MDE5ODkyLCJpc3MiOiJkaWQ6ZXRocjpnb2VybGk6MHgwMjU5Y2QwMDhkMmY5Zjc3ZGNmYTFkMWQyYWVlODg0M2UzMDZmMzUxMTIyNDZlOWFiYWU2ZDcxYjE4ZGRhMGRiZDMifQ.Gc48upfl3Tzn_uOUMDzdfQrfQTutuXc3hCPPL1S75Ht36aOuHBh7nfk7fQN9CXwSrXBW2rxRi5061VsVUsqkIQ"}}\'`
- `npm run credentials:import <verifiableCredential>` Imports `<verifiableCredential>` to storage.
- `npm run credentials:list` Lists stored verifiable credentials
