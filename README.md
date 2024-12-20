# Dapps garden

A collection of dapps that help us to learn how to create decentralized applications on Ethereum

## NFT market

An app that lets users purchase and transfer NFTs.
You'll learn how to use HardHat to compile and deploy your first smart contracts, how to use ipfs upload and download data.
Then, you'll build a React app full of important Ethereum components and hooks.
![dapps-garden-staking2](https://3bcaf57.webp.li/myblog/dapps-garden4.png)

## Decentralized Staking App

Create a decentralized application where project teams can initiate fundraising at specific times, and any user can participate in the presale by paying ETH
![dapps-garden-staking2](https://3bcaf57.webp.li/myblog/dapps-garden-staking3.png)

- After the presale ends, if the fundraising target is not reached, users can claim refunds
- If the presale is successful, users can claim reward Tokens and the project team can withdraw the raised ETH
  ![dapps-garden-staking1](https://3bcaf57.webp.li/myblog/dapps-garden-staking1.png)

## Build

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

Then download the challenge to your computer and install dependencies by running:

```sh
git clone https://github.com/EgoSay/dapps-garden
cd dapps-garden
yarn install
```

> in the same terminal, start your local network (a local instance of a blockchain):

```sh
yarn chain
```

> in a second terminal window, 🛰 deploy your contract (locally):

```sh
cd dapps-garden
yarn deploy
```

> in a third terminal window, start your 📱 frontend:

```sh
cd dapps-garden
yarn start
```

📱 Open [http://localhost:3000](http://localhost:3000) to see the app.
