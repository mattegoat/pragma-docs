---
id: architecture
title: Architecture
sidebar_position: 2
---

---

The V1 of the Pragma Oracle consists of three smart contracts, that each play a role in making the oracle easy to use and robust.

  <div>
  <img width="100%" height="100%" src="https://i.ibb.co/xgxY55Z/Screenshot-2023-08-24-at-10-49-18.png" />
  </div>

The first is the Publisher Registry, which is the most static. This is designed to be updated extremely infrequently because its state should be permanent (each publisher and their address). This is currently an ownable contract but will become permissionless as Pragma decentralizes.

The second is the Oracle implementation and its proxy, which are also designed to be updated only as frequently as absolutely necessary. This is the contract which protocols use, and the one to which publishers publish. In the background, it coordinates the Publisher Registry and the Oracle contract implementation(s). The implementation contains the logic for storing and aggregating specific key/value data streams.

## Deployed Contracts

On Starknet, the contracts are currently deployed at the following addresses:

| Contract           | Testnet (Cairo 0)                                                                                                           | Testnet (Cairo 1) | Mainnet (Cairo 0)                                                                                                              | Mainnet (Cairo 1) |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| Publisher Registry | [Address testnet](https://goerli.voyager.online/contract/0x5cb0afa98435de7da6da7fad3b40c9d17e747a57bca28feb1c41f05e391f54e) | soon              | [Address mainnet](https://voyager.online/contract/0x04746485fa57b49dc992c35d7f12054b5a7d24b0e187021cd8f40bc2517700bc)          | soon              |
| Oracle (Proxy)     | [Address testnet](https://goerli.voyager.online/contract/0x446812bac98c08190dee8967180f4e3cdcd1db9373ca269904acb17f67f7093) | soon              | [Address mainnet](https://voyager.online/contract/0x0346c57f094d641ad94e43468628d8e9c574dcb2803ec372576ccc60a40be2c4#overview) | soon              |

## Pragma X

Pragma X is the V2 of the oracle, currently live only on testnet. If you want to learn more about its architecture, you can watch [this](https://www.youtube.com/watch?v=-cczPezjbyA&ab_channel=thefett) or [this](https://www.youtube.com/watch?v=MjU2vOElpqA&ab_channel=StarkNetCC), if you prefer to read, take a look at our [Mirror](https://mirror.xyz/pragmagic.eth).
