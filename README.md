This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install dependencies

```
yarn install
```

Setup ENV vars as recommended below
Sample `.env` file

```
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_SENTRY_DSN=https://1234...
SENTRY_IGNORE_API_RESOLUTION_ERROR=1
DATABASE_URL="postgres://vipulvpatil@localhost/airetreatdb"
SHADOW_DATABASE_URL="postgres://vipulvpatil@localhost/airetreatdb_shadow" // Not used in production.
GOOGLE_CLIENT_ID=1234....
GOOGLE_CLIENT_SECRET=5678....
CA_CERT_BASE64=LS0tLS1CRUdJTiBDRV
CLIENT_CERT_BASE64=LS0tLS1CRUd...
CLIENT_KEY_BASE64=LS0tLS1CRUdJ...
GRPC_SERVER=localhost:9000
```

Run the development server:
```
yarn dev
```

Run the tests:
```
yarn test
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
