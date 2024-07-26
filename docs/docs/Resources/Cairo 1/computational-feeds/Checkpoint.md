---
id: what-are-checkpoints
title: What are checkpoints
sidebar_position: 2
---

---

Many computational feeds depend on historical data for their functionality. To improve access to this data, Pragma has introduced a feature known as checkpoints.

## Understanding Checkpoints

Checkpoints, in computer science, are mechanisms that capture and save the state of a computation so it can be resumed later. Specifically, in Pragma's system, checkpoints are used to store price information at particular timestamps. This stored information is then utilized by computational feeds.

## Implementing Checkpoints in Pragma

Within the oracle contract, there's a function named `set_checkpoints` accessible to anyone. This function focuses on a specific currency pair. Upon activation, it logs the price information of the selected pair at the moment the function is called, saving this data in a designated storage area.

## User Interaction and Autonomy

Pragma routinely uses this function to create checkpoints for frequently used currency pairs. Additionally, users have the freedom to trigger this function on their own, enabling them to gather specific historical price data needed for their computational analyses.

## List of checkpoints currently set by Pragma

| Pair     | Pair Id             | Decimals | Mainnet |
| -------- | ------------------- | -------- | ------- |
| BTC/USD  | 18669995996566340   | 8        | ✅      |
| ETH/USD  | 19514442401534788   | 8        | ✅      |
| USDC/USD | 6148332971638477636 | 8        | ✅      |

Currently, the checkpoints are set every Tuesdays at 00:00 UTC for [Carmine Options](https://carmine.finance/)

## Checkpointer

We provide an easy to run CLI tool to set checkpoints for the assets you need at the frequency you need.
More information on the CLI can be found [here](https://github.com/astraly-labs/pragma-sdk/blob/master/checkpointer/README.md).

On the high-level it's a simple service that given a configuration file and some CLI parameters will do all the heavy lifting for you.
The docker image is hosted [here](https://github.com/astraly-labs/pragma-sdk/pkgs/container/pragma-sdk%2Fcheckpointer).