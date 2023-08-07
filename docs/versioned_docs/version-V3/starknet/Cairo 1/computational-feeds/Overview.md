---
id: what-are-computational-feeds
title: What are computational feeds
sidebar_position: 1
---

---

Pragma is an oracle fully on-chain. All the data that you consume through Pragma smart-contracts was aggregated from data that was pushed on-chain by reputable exchanges and market makers. This makes Pragma oracle transparent, and auditable, but also programmable. You can compose and program data with Cairo, in order to get the right computed data for your protocol.

Pragma has designed compute engines that use the same raw market data underlying our price feeds, but calculate different metrics to produce feeds of processed data. We call these new feeds computational feeds. Since computational feeds operate entirely on-chain, they don't introduce any new security assumptions.

The current Pragma Network proxy addresses are on Testnet:

| Feed                | Address                                                             | Explorer                                                                                                                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Realized Volatility/ TWAP | 0x000000000000 0000000 | [Starkscan](https://testnet.starkscan.co/contract/0x00000000000300#read-contract) [Voyager](https://goerli.voyager.online/contract/0x00b60000000#readContract) |
| Yield Curve         | 0x00000| [Starkscan](https://testnet.starkscan.co/contract/0x00000000#read-contract) [Voyager](https://goerli.voyager.online/contract/0x0000000000#readContract) |
