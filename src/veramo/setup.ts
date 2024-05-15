// Core interfaces
import {
  createAgent,
  IDIDManager,
  IResolver,
  IDataStore,
  IDataStoreORM,
  IKeyManager,
  ICredentialPlugin
} from '@veramo/core'

// Core identity manager plugin
import { AbstractIdentifierProvider, DIDManager } from '@veramo/did-manager'

// Ethr did identity provider
import { EthrDIDProvider } from '@veramo/did-provider-ethr'

// Core key manager plugin
import { KeyManager } from '@veramo/key-manager'

// Custom key management system for RN
import { KeyManagementSystem, SecretBox } from '@veramo/kms-local'

// W3C Verifiable Credential plugin
import { CredentialPlugin } from '@veramo/credential-w3c'

// Custom resolvers
import { DIDResolverPlugin } from '@veramo/did-resolver'
import { Resolver } from 'did-resolver'
import { getResolver as ethrDidResolver } from 'ethr-did-resolver'
import { getResolver as webDidResolver } from 'web-did-resolver'

// Storage plugin using TypeOrm
import { Entities, KeyStore, DIDStore, PrivateKeyStore, DataStoreORM, migrations } from '@veramo/data-store'

// TypeORM is installed with `@veramo/data-store`
import { DataSource } from 'typeorm'

import 'dotenv/config'

import { EthrNetworkConfiguration } from '@veramo/did-provider-ethr/build/ethr-did-provider'

// This will be the name for the local sqlite database for demo purposes
const DATABASE_FILE = 'database.sqlite'

// This will be the secret key for the KMS
const KMS_SECRET_KEY = process.env.KMS_SECRET_KEY ?? ''
if (KMS_SECRET_KEY === '') throw new Error('KMS_SECRET_KEY not found in .env file.\n\tHINT:Please copy template.env to .env anf fill the required variables')

const dbConnection = new DataSource({
  type: 'sqlite',
  database: DATABASE_FILE,
  synchronize: false,
  migrations,
  migrationsRun: true,
  logging: ['error', 'info', 'warn'],
  entities: Entities
}).initialize()

// You will need to get a project ID from infura https://www.infura.io
const infuraProjectId = process.env.INFURA_PROJECT_ID ?? ''
if (infuraProjectId === '') throw new Error('INFURA_PROJECT_ID not found in .env file.\n\tHINT:Please copy template.env to .env anf fill the required variables')

const networkName = process.env.NETWORK_NAME ?? ''
if (networkName === '') throw new Error('NETWORK_NAME not found in .env file.\n\tHINT:Please copy template.env to .env anf fill the required variables')

const rpcUrl = `https://${networkName}.infura.io/v3/${infuraProjectId}`
const registry = networkName === 'mainnet' ? '0xdca7ef03e98e0dc2b855be647c39abe984fcf21b' : '0x03d5003bf0e79c5f5223588f347eba39afbc3818'

const defaultProvider = 'did:ethr:' + networkName
const providers: Record<string, AbstractIdentifierProvider> = {}
providers[defaultProvider] = new EthrDIDProvider({
  defaultKms: 'local',
  network: networkName,
  rpcUrl,
  registry
})

const network: EthrNetworkConfiguration = {
  name: networkName,
  registry,
  rpcUrl
}

export const agent = createAgent<
IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialPlugin
>({
  plugins: [
    new DataStoreORM(dbConnection),
    new KeyManager({
      store: new KeyStore(dbConnection),
      kms: {
        local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(KMS_SECRET_KEY)))
      }
    }),
    new DIDManager({
      store: new DIDStore(dbConnection),
      defaultProvider: 'did:ethr:sepolia',
      providers
    }),
    new DIDResolverPlugin({
      resolver: new Resolver({
        ...ethrDidResolver({
          networks: [
            network
          ]
        }),
        ...webDidResolver()
      })
    }),
    new CredentialPlugin()
  ]
})
