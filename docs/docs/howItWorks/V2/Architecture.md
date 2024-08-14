---
id: architecture
title: Architecture
sidebar_position: 2
---

---

The v2 adopts a layered approach to provide the modularity necessary for any needs. Here's a broad overview of the structure:

  <div>
  <img width="100%" height="100%" src="https://i.ibb.co/B49Bcc2/Flowchart-3.png" alt="flowchart contracts" />
  </div>

## Data Layer

The data layer is the foundation of the infrastructure, responsible for storing and broadcasting data to network participants. This layer is highly decentralized and low-latency, ensuring the most up-to-date data with perfect liveness and censorship-resistance. It's a lightweight piece of software with minimal consensus to verify signatures and broadcast data to the network.

  <div>
  <img width="100%" height="100%" src="https://i.ibb.co/JQ66Kh9/Flowchart-4.png" alt="flowchart contracts" />
  </div>

## Non-deterministic Trust Layer

This layer is the core of the oracle, reducing the trust associated with consuming non-deterministic data. It's a modular, non-opinionated layer that enables the creation of arbitrary slashing rules and reputation mechanisms. Specifically, it allows for the creation and enforcement of slashing rules on data providers who opt into these rules. Staking and slashing rules are defined on Ethereum L1 and enforced through validity proofs using a co-processor.

  <div>
  <img width="100%" height="100%" src="https://i.ibb.co/HTvR3qB/Flowchart-5.png" alt="flowchart contracts" />
  </div>

## Deterministic Trust Layer

The deterministic layer is responsible for two main functions: computation and bridging. For computation atop oracle data, two main paths are possible: zk-computation (with potential for TEEs in the future) or economically secure computation. While we chose zk-computation for the first version of the protocol, it's entirely possible to leverage an AVS with economic security. The idea is that when integrating Pragma, a protocol can use their token to secure the deterministic part of their oracle use (computation + bridging through Hyperlane) thanks to Symbiotic.

The design is straightforward, similar to a blockchain. A few operators run a lightweight node (often stateless) responsible for performing operations like VWAP, median, or other computations. Re-stakers can provide economic security for this module. The data is then bridged using Hyperlane, either regularly or on a pull model as needed.

  <div>
  <img width="100%" height="100%" src="https://i.ibb.co/dBqrvk0/Flowchart-6.png" alt="flowchart contracts" />
  </div>
