# A node.js Veramo agent example

An example implementation of a [Veramo agent](https://veramo.io/docs/veramo_agent/introduction) for managing DIDs and VCs using node.js.

## 1. Installation

You can easily create a new agent in directory `veramo-agent` in your current directory with:

```sh
git clone https://github.com/juanelas/nodejs-veramo-agent.git veramo-agent
cd veramo-agent
npm i
```

Copy `template.env` to `.env` and fill the required variables (how to connect to the blockchain). You will need to get a project ID from infura <https://www.infura.io>. If testing use `sepolia` for `NETWORK_NAME`.

If you need to create another agent just clone to a different directory. Each agent databse is stored in its root directory. You can use the same `.env` variables for all the agents.

## 2. Scripts for Distributed Identifiers (did:ethr method)

- `npm run identifiers:list`  List owned/stored identifiers
- `npm run identifiers:create <alias>` Creates a new DID (did:ethr method) with alias `<myAlias>`
- `npm run identifiers:add-service <didOrAlias> <serviceType> <serviceEndpoint>` Add a service to one of the owned identifiers. Example:

    ```sh
    npm run identifiers:add-service myAlias Telegram @MyTelegramAccount
    ```

    > The Ethereum account owning the DID must have funds to add the service
- `npm run identifiers:remove-service <didOrAlias> <serviceType> <serviceEndpoint>` Remove a service for one of the owned identifiers. Example:

    ```sh
    npm run identifiers:add-service myAlias Telegram @MyTelegramAccount
    ```

    > Once again, the Ethereum account owning the DID must have funds to add the service

## 3. Scripts for W3C Verifiable Credentials

- `npm run credentials:create <issuerDidOrAlias> <SubjectDid> <claimName> <claimValue>` Creates a new verifiable credentials issued by one of the owned identifiers (`<issuerDidOrAlias>`) to a DID (`<SubjectDid>`) holding claim `<claimName>` set to `<claimValue>`
- `npm run credentials:verify <verifiableCredential>` verifies a W3C verifiable credential. Example:

    ```sh
    npm run credential:verify '{"credentialSubject":{"blockchainExpertise":"high","id":"did:ethr:sepolia:0x021e5d2b9d2413fa825af5564a2cce7e53ab5343cf388c1a7647dfcc5bf84d049b"},"issuer":{"id":"did:ethr:sepolia:0x03f1b06b1357ccc995a27a9ce2fc418d69c0f80fe5b01614e281cad0dc7b024313"},"type":["VerifiableCredential"],"@context":["https://www.w3.org/2018/credentials/v1"],"issuanceDate":"2024-11-07T16:54:11.000Z","proof":{"type":"JwtProof2020","jwt":"eyJhbGciOiJFUzI1NksiLCJ0eXAiOiJKV1QifQ.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIl0sImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImJsb2NrY2hhaW5FeHBlcnRpc2UiOiJoaWdoIn19LCJzdWIiOiJkaWQ6ZXRocjpzZXBvbGlhOjB4MDIxZTVkMmI5ZDI0MTNmYTgyNWFmNTU2NGEyY2NlN2U1M2FiNTM0M2NmMzg4YzFhNzY0N2RmY2M1YmY4NGQwNDliIiwibmJmIjoxNzMwOTk4NDUxLCJpc3MiOiJkaWQ6ZXRocjpzZXBvbGlhOjB4MDNmMWIwNmIxMzU3Y2NjOTk1YTI3YTljZTJmYzQxOGQ2OWMwZjgwZmU1YjAxNjE0ZTI4MWNhZDBkYzdiMDI0MzEzIn0.8-MNdWhefY5-VPIPalAa9laHvJ7y3_Bfd40Pb1Xu6n5r30514ftUfwxDKWFvwNnu5hRjs7yHsZhsOScvpFjReQ"}}'
    ```
