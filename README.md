# Osmosis Frontend 👩‍🔬⚗️🧪

![osmosis-banner-1200w](https://user-images.githubusercontent.com/4606373/167008669-fb3cafa8-e66e-4cdf-8599-3308039cc58c.png)

## Development 💻

Our [frontend](https://app.osmosis.zone) is built with the following tools:

- [TypeScript](https://www.typescriptlang.org/): type checking
- [React](https://reactjs.org/): ui
- [Tailwind CSS](https://tailwindcss.com/): styling, theming
- [Next.js](https://nextjs.org/): scaffolding/SSR/CDN/SEO
  - We deploy on [Vercel](https://vercel.com/solutions/nextjs?utm_source=next-site&utm_medium=banner&utm_campaign=next-website) for optimization (CDN, regions)
- [lerna](https://lerna.js.org/): code organization; mono-repo management and libs release

## Deployment 🚀

Start web server

```bash
yarn && yarn build && yarn start
```

### Contributing 👨‍💻

We welcome and encourage contributions! We recommend looking for [issues labeled with "good-first-issue"](https://github.com/osmosis-labs/osmosis-frontend/contribute).

Make sure [node](https://nodejs.org/en/) >= 16 and [yarn](https://yarnpkg.com/getting-started/install) is installed.

1. Install deps

```bash
yarn
```

2. Build app

```bash
yarn build
```

3.  Run local server at [`localhost:3000`](localhost:3000)

```bash
yarn dev
```

## Testnet

To develop on the canonical public testnet, run:

```bash
yarn build:testnet && yarn start:testnet
```

To develop against a local testnet, such as [localosmosis](https://github.com/osmosis-labs/osmosis/blob/1eb6506297c88dd3acc7d9c0a5f7c4e34ecd1b4e/tests/localosmosis/README.md), modify the .env file:

```bash
# Osmosis Chain Configuration Overwrite
# NEXT_PUBLIC_IS_FRONTIER=false
NEXT_PUBLIC_IS_TESTNET=true
NEXT_PUBLIC_OSMOSIS_RPC_OVERWRITE=http://localhost:26657/
NEXT_PUBLIC_OSMOSIS_REST_OVERWRITE=http://localhost:1317/
NEXT_PUBLIC_OSMOSIS_CHAIN_ID_OVERWRITE=localosmosis
# NEXT_PUBLIC_OSMOSIS_EXPLORER_URL_OVERWRITE=https://testnet.mintscan.io/osmosis-testnet/txs/{txHash}
# NEXT_PUBLIC_OSMOSIS_CHAIN_NAME_OVERWRITE=Osmosis (Testnet v13.X latest)
```

You may need go to the config folder to update the ibc-assets list and currencies in the osmosis chain info to view currencies on your testnet.

## Frontier 🤠

To reduce duplicated effort, `master` branch is used to deploy the frontier app as well. The frontier deployment has `NEXT_PUBLIC_IS_FRONTIER` env var set to `true`. If making
updates to frontier, please target the master branch. Frontier assets are configured in `packages/web/config/ibc-assets.ts`.

### Develop

To develop with frontier configuration, use:

```bash
yarn build:frontier && yarn dev:frontier
```

### Deploy

To deploy frontier (the env var will be set for you):

```bash
yarn build:frontier && yarn start:frontier
```

Otherwise the non-frontier commands can be used with the env var set to true.

### Testnet

Testnet version of the frontend uses `NEXT_PUBLIC_IS_TESTNET=true`.

Dev:

```bash
yarn build:testnet && yarn dev:testnet
```

Deploy:

```bash
yarn build:testnet && yarn start:testnet
```

## Releases

Release tags are for the published [npm packages](https://www.npmjs.com/org/osmosis-labs), which are every package except for the web package. Updates to the app are released incrementally way via deployments from master branch.

## Localization 🌎🗺

Have a change you want to make with our translations? We have a frontend for updating localizations in our app easily, all you need is a GitHub account. Coming soon: creating new language profiles from this frontend.

https://inlang.com/editor/github.com/osmosis-labs/osmosis-frontend

Run `yarn test localizations` in packages/web folder to check validity of translations.
