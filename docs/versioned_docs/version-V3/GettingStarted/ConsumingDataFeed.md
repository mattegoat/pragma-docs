---
id: Consuming Data Feed
title: Consuming Data Feed
sidebar_position: 1
---

---

You can get started with Pragma in just a few minutes. This guide will walk you through the process of consuming data from Pragma's oracle network. 
Here is a simple contract allowing a user to retrieve the price of an asset, using the Pragma Oracle.


## Overview of the contract 

```rust
use starknet::ContractAddress;

#[starknet::interface]
trait HackTemplateABI<TContractState> {
    fn get_asset_price(self: @TContractState, asset_id: felt252) -> u128;
}



#[starknet::contract]
mod HackTemplate {
    use super::{ContractAddress, HackTemplateABI};
    use array::{ArrayTrait, SpanTrait};
    use traits::{Into, TryInto};
    use pragma_oracle::IOracle::{
            IPragmaABIDispatcher, IPragmaABIDispatcherTrait, ISummaryStatsABIDispatcher,
            ISummaryStatsABIDispatcherTrait, DataType, AggregationMode, PragmaPricesResponse
    };
    use alexandria_math::math::fpow;
    use starknet::get_block_timestamp;
    use option::OptionTrait;
    const ETH_USD: felt252 = 19514442401534788;  //ETH/USD to felt252, can be used as asset_id
    const BTC_USD: felt252 = 18669995996566340;  //BTC/USD


    #[storage]
    struct Storage {
        pragma_contract: ContractAddress,
        summary_stats: ContractAddress,
    }

    #[constructor]
    fn constructor(ref self: ContractState, pragma_address: ContractAddress, summary_stats_address : ContractAddress) 
    {
        self.pragma_contract.write(pragma_address);
        self.summary_stats.write(summary_stats_address);
    }
    #[external(v0)]
    impl HackTemplateABIImpl of HackTemplateABI<ContractState> {
        

        fn get_asset_price(self: @ContractState, asset_id: felt252) -> u128 {
            // Retrieve the oracle dispatcher
            let oracle_dispatcher = IPragmaABIDispatcher {
                contract_address: self.pragma_contract.read()
            };

            // Call the Oracle contract, for a spot entry
            let output: PragmaPricesResponse = oracle_dispatcher
                .get_data_median(DataType::SpotEntry(asset_id));

            return output.price;
        }

    }
}


```

Let's break down the code above:

```rust
#[starknet::interface]
trait HackTemplateABI<TContractState> {
    fn get_asset_price(self: @TContractState, asset_id: felt252) -> u128;
}
```

Firstly, we defined the interface of our contract. The interface is a set of functions that can be called by other contracts. In this case, we have only one function, `get_asset_price`, which takes as input the asset id of the asset we want to retrieve the price of, and returns the price of the asset. The asset id is a felt252, and can be converted from a string using the `felt252` conversion. The asset id is used to identify the data feed we want to retrieve (for example BTC/USD). 

Then comes the contract itself:

```rust
#[starknet::contract]
mod HackTemplate {
    use super::{ContractAddress, HackTemplateABI};
    use array::{ArrayTrait, SpanTrait};
    use traits::{Into, TryInto};
    use pragma_oracle::IOracle::{
            IPragmaABIDispatcher, IPragmaABIDispatcherTrait, ISummaryStatsABIDispatcher,
            ISummaryStatsABIDispatcherTrait, DataType, AggregationMode, PragmaPricesResponse
    };
    use alexandria_math::math::fpow;
    use starknet::get_block_timestamp;
    use option::OptionTrait;
    const ETH_USD: felt252 = 19514442401534788;  //ETH/USD to felt252, can be used as asset_id
    const BTC_USD: felt252 = 18669995996566340;  //BTC/USD


    #[storage]
    struct Storage {
        pragma_contract: ContractAddress,
        summary_stats: ContractAddress,
    }

    #[constructor]
    fn constructor(ref self: ContractState, pragma_address: ContractAddress, summary_stats_address : ContractAddress) 
    {
        self.pragma_contract.write(pragma_address);
        self.summary_stats.write(summary_stats_address);
    }
    #[external(v0)]
    impl HackTemplateABIImpl of HackTemplateABI<ContractState> {
        

        fn get_asset_price(self: @ContractState, asset_id: felt252) -> u128 {
            // Retrieve the oracle dispatcher
            let oracle_dispatcher = IPragmaABIDispatcher {
                contract_address: self.pragma_contract.read()
            };

            // Call the Oracle contract, for a spot entry
            let output: PragmaPricesResponse = oracle_dispatcher
                .get_data_median(DataType::SpotEntry(asset_id));

            return output.price;
        }

    }
}
```

This is the general form of a starknet contract, you can learn more about the way to build a Starknet contract [here](https://book.cairo-lang.org/ch99-01-02-a-simple-contract.html). 
The notable point here is among the imports: 

```rust 
use pragma_oracle::IOracle::{
            IPragmaABIDispatcher, IPragmaABIDispatcherTrait, ISummaryStatsABIDispatcher,
            ISummaryStatsABIDispatcherTrait, DataType, AggregationMode, PragmaPricesResponse
    };
```

This line imports the dispatcher corresponding to the oracle contract interface and its associated trait. The dispatcher enables the invocation of interface-defined functions. For deeper insights into the dispatcher and its trait, consult the [cairo book](https://book.cairo-lang.org/ch99-02-02-contract-dispatcher-library-dispatcher-and-system-calls.html).

Allows the imports of the required structures/enums for executing the function call. These three are the main structures/enums used in most functions of the Pragma oracle contract. The `AggregationMode` enum is used to specify the aggregation mode of the data, the `DataType` enum is used to specify the type of data to be retrieved, and the `PragmaPricesResponse` structure is used to store the response to the function call.

```rust
enum DataType {
    SpotEntry: felt252,
    FutureEntry: (felt252, u64),
    GenericEntry: felt252,
}

struct PragmaPricesResponse {
    price: u128,
    decimals: u32,
    last_updated_timestamp: u64,
    num_sources_aggregated: u32,
    expiration_timestamp: Option<u64>,
}

#[derive(Serde, Drop, Copy)]
enum AggregationMode {
    Median: (),
    Mean: (),
}
```

We deploying the contract, you will have to specify the oracle contract address and the summary stats contract address. The summary stats is a contract providing computational feeds (TWAP, Yield Curve, Realized Volatility, ...). In the provided example we will not use the summary stats contract. 
The oracle address can be found [here](../Resources/Cairo%201/data-feeds/Consuming%20Data.md).
The previous contract is a simple contract, allowing a user to retrieve the price of an asset. You can play with a more complete example and deploy using Remix. It   


<div >
<a href="https://remix.ethereum.org/#version=soljson-v0.8.18+commit.87f61d96.js&optimize=false&runs=200&gist=
" target='_blank' class="button">Open in Remix</a>
</div>


## Working with Remix 

Since everything is already done, you will just have to compile the code and deploy the contract. 



To begin with, you will have to activate the starknet plugin: 
 
  <div>
  <a href="https://ibb.co/p4j19SQ"><img src="https://i.ibb.co/P1GrfdM/starknet-plugin.png" alt="starknet-plugin"/></a>
  </div>

Once activate, the starknet icon should appear on the left side of the screen.
Then, you will have to compile the code. 

  <div>
  <a href="https://ibb.co/m56xRMg"><img src="https://i.ibb.co/XxSwWvM/compile.png" alt="compile"/></a>
  </div>

Once compiled, you will have to create and deploy an account, and used the button to get testnet ETH. 

<div>
<a href="https://ibb.co/vhZ6nnc"><img src="https://i.ibb.co/7Q2dmmS/deploy-account.png" alt="deploy-account" /></a>
  </div>

You can finally deploy the contract. The addresses used for the constructor are the oracle contract address and the summary stats contract address. You can find the oracle address [here](../Resources/Cairo%201/data-feeds/Consuming%20Data.md). You can find the summary stats address [here](../Resources/Cairo%201/computational-feeds/Overview.md).
<div>
<a href="https://ibb.co/rppfH6B"><img src="https://i.ibb.co/bvvRXB4/deploy.png" alt="deploy"/></a>
</div>

Once deployed, you can interact with the contract.
<div>
<a href="https://ibb.co/648RS8b"><img src="https://i.ibb.co/SKcXgc0/interact.png" alt="interact"/></a>
</div>

And that's it ! You have used Pragma !