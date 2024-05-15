---
id: what-are-computational-feeds
title: What are computational feeds
sidebar_position: 1
---

---

Pragma is an oracle fully on-chain. All the data that you consume through Pragma smart-contracts was aggregated from data that was pushed on-chain by reputable exchanges and market makers. This makes Pragma oracle transparent, and auditable, but also programmable. You can compose and program data with Cairo, in order to get the right computed data for your protocol.

Pragma has designed compute engines that use the same raw market data underlying our price feeds, but calculate different metrics to produce feeds of processed data. We call these new feeds computational feeds. Since computational feeds operate entirely on-chain, they don't introduce any new security assumptions.

You can find contract addresses below:

### Mainnet

| Feed                      | Address                                                           | Explorer                                                                                                                                                                                                                                                            |
| ------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Realized Volatility/ TWAP | 0x49eefafae944d07744d07cc72a5bf14728a6fb463c3eae5bca13552f5d455fd | [Starkscan](https://starkscan.co/contract/0x49eefafae944d07744d07cc72a5bf14728a6fb463c3eae5bca13552f5d455fd#read-contract) [Voyager](https://voyager.online/contract/0x49eefafae944d07744d07cc72a5bf14728a6fb463c3eae5bca13552f5d455fd#readContract) |
| Yield Curve               | ❌                                                                 | [Starkscan](https://sepolia.starkscan.co/contract/x#read-contract) [Voyager](https://sepolia.voyager.online/contract/x#readContract)                                                                                                                                 |

### Testnet

| Feed                      | Address                                                           | Explorer                                                                                                                                                                                                                                                            |
| ------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Realized Volatility/ TWAP | 0x54563a0537b3ae0ba91032d674a6d468f30a59dc4deb8f0dce4e642b94be15c | [Starkscan](https://testnet.starkscan.co/contract/0x54563a0537b3ae0ba91032d674a6d468f30a59dc4deb8f0dce4e642b94be15c#read-contract) [Voyager](https://sepolia.voyager.online/contract/0x54563a0537b3ae0ba91032d674a6d468f30a59dc4deb8f0dce4e642b94be15c#readContract) |
| Yield Curve               | ❌                                                                 | [Starkscan](https://testnet.starkscan.co/contract/x#read-contract) [Voyager](https://sepolia.voyager.online/contract/x#readContract)                                                                                                                                 |
