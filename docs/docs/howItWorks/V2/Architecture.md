---
id: architecture
title: Architecture
sidebar_position: 2
---

---

The v2 is taking a layered-approach in order to provide the modularity necessary to anyone's needs. Here is a broad overview of the cake:

  <div>
  <img width="100%" height="100%" src="https://i.ibb.co/B49Bcc2/Flowchart-3.png" alt="flowchart contracts" />
  </div>

## Data Layer

The data layer is the base layer of the infrastructure, and is responsible for storing and broadcasting the data to the participants. This layer is both very decentralized and low latency, in order to provide the most up-to-data data, and have perfect liveness and censorship-resistance. It is a very light piece of software, as it only has a minimal consensus to verify signatures, and only broadcast data to the network.

  <div>
  <img width="100%" height="100%" src="https://i.ibb.co/JQ66Kh9/Flowchart-4.png" alt="flowchart contracts" />
  </div>

## Non-deterministic trust layer

This layer is the core of the oracle, and reduces the trust associated with consuming non-deterministic data. To achieve this goal, the non-deterministic data layer is a modular, non-opinionated layer, that enables to build arbitrary slashing rules and reputation mechanisms. In details it enables to create slashing rules, and enforce them on data providers that opted into those rules. Staking and slashing rules are defined on Ethereum L1, and enforced through validity proofs using a co-processor.

  <div>
  <img width="100%" height="100%" src="https://i.ibb.co/HTvR3qB/Flowchart-5.png" alt="flowchart contracts" />
  </div>

## Deterministic trust layer

Finally the deterministic layer, which is responsible for two main things: computation and bridging. To perform computation atop the oracle data, there’s two main path possible: zk-computation (TEEs maybe at some point?), or economically secure computation. The zk part is the path we chose to take for the first version of the protocol, but it is totally possible to leverage an AVS with some economic security. The idea is that a protocol, when integrating Pragma, will be able to use their token to secure the deterministic part of their oracle use (computation + bridging through Hyperlane) thanks to Symbiotic. Think about Ethena, having ENA securing their oracle.

It’s very straightforward, as it’s a blockchain-like design, a few operators run a very light node (because most of the time stateless) in charge of doing a VWAP, a median, or any other computation, and re-stakers can provide the economic security for this module. The data is then bridged using Hyperlane, on a regular basis if needed, or on a pull model.

  <div>
  <img width="100%" height="100%" src="https://i.ibb.co/dBqrvk0/Flowchart-6.png" alt="flowchart contracts" />
  </div>
