---
id: TWAP
title: Time weighted average price (TWAP)
sidebar_position: 4
---

## Time weighted average price (TWAP)

For any price feed, Pragma offers a TWAP feed. The TWAP feed uses checkpoints in order to compute the time weighted average prices. The TWAP feed is useful for protocols that need to calculate the average price of an asset over a period of time. TWAP will be available for both Spot and Futures feeds, for now. 

#### Sample Code

If you are just trying to get started with our TWAP feed, see this self-contained code snippet here. You can find the full Oracle interface specification is available [here](https://github.com/Astraly-Labs/pragma-oracle/blob/main/src/compute_engines/summary_stats/summary_stats.cairo).

```rust

use starknet::ContractAddress;
use pragma::summary_stats::summary_stats::{
    ISummaryStatsABIDispatcher, ISummaryStatsABIDispatcherTrait
};
use pragma::entry::structs::{AggregationMode, DataType};

const SUMMARY_STATS_ADDRESS : ContractAddress  = 0x00000000000000000000;

fn comupute_twap(data_type : DataType, aggregation_mode : AggregationMode) -> u128 { 
    let start_tick = 1691315416;
    let end_tick = 1691415416;
    let num_samples = 200;
    let summary_dispatcher = ISummaryStatsABIDispatcher { contract_address: SUMMARY_STATS_ADDRESS}
    let (twap, _) = summary_dispatcher.compute_twap(
        data_type,
        aggregation_mode,
        time,
        start_time,
    );
    return twap; // will return the volatility multiplied by 10^decimals
}

//USAGE

let pair_id : felt252 = "ETH/USD";
let expiration_timestamp = 1691515416;

//SPOT
let twap = compute_twap(DataType::Spot(pair_id), AggregationMode::Median(()));
//FUTURES
let twap = compute_twap(DataType::Future((pair_id, expiration_timestamp)), AggregationMode::Median(()));

```

## How TWAP is Calculated

We calculate the Time wighted average price using the following formula: 

INSERT FORMULA 

## Technical Specification

### Function: `calculate_twap`

This function allows you to query the TWAP for any price feed calculated over a requested period of time. The function accesses checkpoints within the requested timeframe, and uses the above equation to calculate the TWAP.
Currently, Pragma sets a checkpoint every 5 minutes. If you need more granular data, you can set more checkpoint via the `set_checkpoint` function.


#### Inputs 

- `data_type` : enum of the data type you are requesting (See DataType structure). By providing the enum data type, you also provide the pair id (for spot entries), or the pair id and the expiration timestamp (for futures)
- `aggregation_mode`: aggregation mode to use for combining the many data sources available in Pragma. Use the structure AggregationMode defined in Pragma. Option must currently be set to `MEDIAN` or `MEAN`, . Additional options `VWAP`, `EXPONENTIAL_DECAY` are coming soon.
- `time` : The duration (in seconds ) over which you want to calculate the TWAP. The TWAP will be calculated between `start_time` and `start_time`+ `time`.
- `start_time` : The start time (in seconds) from which you want to calculate the TWAP. The TWAP will be calculated between `start_time` and `start_time`+ `time`.

#### Returns

- `twap` : The TWAP for the requested data type, aggregation mode, time and start time. The TWAP is multiplied by 10^decimals.
- `decimals` : number of decimals, i.e. , the number of places that value has been shifted to allow for greater accuracy. 
