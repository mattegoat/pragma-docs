---
id: realized-volatility
title: Realized Volatility
sidebar_position: 3
---

---

## Realized Volatility

For any price feed, Pragma offers a realized volatility feed. The realized volatility feed uses checkpoints to calculate the annualized volatility of an asset over a period of time.

#### Sample Code

If you are just trying to get started with our realized volatility feed, see this self-contained code snippet here. You can find the full Oracle interface specification is available [here](https://github.com/Astraly-Labs/pragma-oracle/blob/main/src/summary_stats/summary_stats.cairo).

```bash

use starknet::ContractAddress; 
use pragma::summary_stats::summary_stats::{
    ISummaryStatsABIDispatcher, ISummaryStatsABIDispatcherTrait
};
use pragma::entry::structs::{AggregationMode, DataType};

const SUMMARY_STATS_ADDRESS : ContractAddress  = 0x00000000000000000000; 

fn comupute_volatility(data_type : DataType, aggregation_mode : AggregationMode) -> u128 { 
    let start_tick = 1691315416;
    let end_tick = 1691415416;
    let num_samples = 200;
    let summary_dispatcher = ISummaryStatsABIDispatcher { contract_address: SUMMARY_STATS_ADDRESS}
    let (volatility, _) = summary_dispatcher.calculate_volatility(
        data_type,
        start_tick,
        end_tick,
        num_samples,
        aggregation_mode
    );
    return volatility; // will return the volatility multiplied by 10^decimals
}

//USAGE

let pair_id : felt252 = "ETH/USD";

//SPOT
let volatility = compute_volatility(DataType::Spot(pair_id), AggregationMode::Median(()));
//FUTURES
let volatility = compute_volatility(DataType::Future((pair_id, expiration_timestamp)), AggregationMode::Median(()));
```

## How Realized Volatility is Calculated

We calculate realized volatility under the Geometric Brownian Motion assumption using the following equation:

  <div>
  <img width="100%" height="100%" src="https://i.ibb.co/yBPHTFk/Screenshot-2023-02-27-at-16-03-04.png" />
  </div>

Where σ is in units of 1/$\sqrt{T}$. We then multiply σ by $\sqrt{ΔTyear}$ to get the annualized volatility of the underlying asset.

## Technical Specification

### Function: `calculate_volatility`

This function allows you to query realized volatility for any price feed calculated over a requested period of time. The function accesses checkpoints within the requested timeframe, and uses the above equation to calculate realized volatility.
Currently, Pragma sets a checkpoint every 5 minutes. If you need more granular data, you can set more checkpoint via the `set_checkpoint` function.

#### Inputs

- `data_type`: enum of the data type you are requesting (See DataType structure). By providing the enum data type, you also provide the pair id (for spot entries), or the pair id and the expiration timestamp (for futures)
- `start_tick`: timestamp at the beginning of the period over which you want to calculate realized volatility
- `end_tick`: timestamp at the end of the period over which you want to calculate realized volatility. If set to 0, it defaults to the timestamp of the last published block
- `num_samples`: number of samples on which you want to calculate volatility. StarkNet currently limits computation, so there is a max of 200 for this input
- `aggregation_mode`: aggregation mode to use for combining the many data sources available in Pragma. Use the structure AggregationMode defined in Pragma. Option must currently be set to `MEDIAN` or `MEAN`, . Additional options `VWAP`, `EXPONENTIAL_DECAY` are coming soon.

#### Returns

- `volatility`: annualized realized volatility percentage. Volatility is reported with 8 decimals of precision. To convert it to percentage, divide the output by 10^8 (e.g. 7076538586 means annualized volatility is around 70%)
- `decimals` : number of decimals, i.e. , the number of places that value has been shifted to allow for greater accuracy. 
