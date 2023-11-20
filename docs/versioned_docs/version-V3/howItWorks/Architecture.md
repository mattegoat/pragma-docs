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

## Aggregation


<div><img width="100%" height="100%" src="https://i.ibb.co/pnQpW67/Capture-d-e-cran-2023-11-16-a-18-08-21.png" alt="Capture-d-e-cran-2023-11-16-a-18-08-21" border="0"/></div>

Our system incorporates multiple publishers, each responsible for providing data from various sources. To determine the price for a given source, we consider the prices submitted by all these publishers. Our approach involves conducting an initial on-chain aggregation based on the median of these prices. This median value then becomes the established price for that particular source.

This aggregation process is triggered when one of the aggregation functions, as outlined in the 'Consuming Data' section, is called. During this process, users have the flexibility to choose their preferred method of aggregation for the sources. This choice allows them to tailor the final price calculation according to their specific needs or criteria. By utilizing this method of aggregation, we enhance the security of the final price determination, making it less vulnerable to manipulation, as it incorporates a broad and balanced range of data from multiple publishers.

## Security

Our contracts have thoroughly been peer-reviewed by multiple actors in the starknet ecosystem.
They have also undergone a full audit by Nethermind which you can find the report [here](https://github.com/NethermindEth/PublicAuditReports/blob/2b073f2c136cc4e8afe2e135c1be03699b2a7515/NM0147-FINAL_PRAGMA.pdf).

In case you find bugs in our contracts, we have a bug bounty program in place with ImmuneFi, or you can contact us directly at <matthias@pragma.build>

## Deployed Contracts

On Starknet, the contracts are currently deployed at the following addresses:

| Contract           | Testnet (Cairo 0)                                                                                                   | Testnet (Cairo 1)                                                                                                    | Mainnet (Cairo 0)                                                                                                      | Mainnet (Cairo 1)                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Publisher Registry | [Testnet](https://goerli.voyager.online/contract/0x5cb0afa98435de7da6da7fad3b40c9d17e747a57bca28feb1c41f05e391f54e) | [Testnet](https://goerli.voyager.online/contract/0x0552e96b3a9078a453ab7012ed76325bedef7b0cc5647a8fafe985e658e31d86) | [Mainnet](https://voyager.online/contract/0x04746485fa57b49dc992c35d7f12054b5a7d24b0e187021cd8f40bc2517700bc)          | [Mainnet](https://voyager.online/contract/0x24a55b928496ef83468fdb9a5430fe031ac386b8f62f5c2eb7dd20ef7237415)          |
| Oracle             | [Testnet](https://goerli.voyager.online/contract/0x446812bac98c08190dee8967180f4e3cdcd1db9373ca269904acb17f67f7093) | [Testnet](https://goerli.voyager.online/contract/0x06df335982dddce41008e4c03f2546fa27276567b5274c7d0c1262f3c2b5d167) | [Mainnet](https://voyager.online/contract/0x0346c57f094d641ad94e43468628d8e9c574dcb2803ec372576ccc60a40be2c4#overview) | [Mainnet](https://voyager.online/contract/0x2a85bd616f912537c50a49a4076db02c00b29b2cdc8a197ce92ed1837fa875b#overview) |

## Pragma X

Pragma X is the V2 of the oracle, currently live only on testnet. If you want to learn more about its architecture, you can watch [this](https://www.youtube.com/watch?v=-cczPezjbyA&ab_channel=thefett) or [this](https://www.youtube.com/watch?v=MjU2vOElpqA&ab_channel=StarkNetCC), if you prefer to read, take a look at our [Mirror](https://mirror.xyz/pragmagic.eth).
