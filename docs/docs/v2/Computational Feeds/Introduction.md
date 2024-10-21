---
id: introduction
title: Introduction
sidebar_position: 1
---

---

Pragma is an oracle fully on-chain. All the data that you consume through Pragma smart-contracts was aggregated from data that was pushed on-chain by reputable exchanges and market makers. This makes Pragma oracle transparent, and auditable, but also programmable. You can compose and program data with Cairo, in order to get the right computed data for your protocol.

Pragma has designed compute engines that use the same raw market data underlying our price feeds, but calculate different metrics to produce feeds of processed data. We call these new feeds computational feeds. Since computational feeds operate entirely on-chain, they don't introduce any new security assumptions.

On the v2, you can directly deploy your computational feeds as smart-contracts to build your own feed. If you want to build your own computational feed, get started [here](/v2/Computational%20Feeds/How%20to/create-computational-feed). Here is a list of deployed computational feeds:

## Deployed Feeds

| ⛓️‍💥 Chain      | Feed Name   | Address                                                           |
| ------------- | ----------- | ----------------------------------------------------------------- |
| Pragma Devnet | Spot Median | 0x114031f5f89eb6cf76e5e2ac5aaa46363d4da1fa6d289ae0f11edb9d6196172 |
| Pragma Devnet | Perp Median | 0x3d721e9526b3319b59c679cff730ac2e514d44f96d26eabfb3cdfbae2359581 |
| Pragma Devnet | Spot Mean   | 0x5a22834c6f2341c13a19ddbdbc4df89954e4e31bd910f936aaf678799186eec |