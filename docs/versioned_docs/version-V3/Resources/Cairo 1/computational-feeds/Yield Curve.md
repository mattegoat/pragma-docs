---
id: yield-curve
title: Yield Curve
sidebar_position: 2
---

---

## Yield Curve

Pragma offers a feed that calculates the zero-coupon interest-rate curve fully on-chain. The interest rate values are derived from BTC spot and futures price difference, and Aave overnight rate. You can find more informations regarding the implementation [here](https://github.com/Astraly-Labs/pragma-oracle/blob/main/src/compute_engines/yield_curve/yield_curve.cairo)

## Sample Code

```rust
use starknet::ContractAddress;
use pragma::compute_engines::yield_curve::yield_curve::{
    IYieldCurveABIDispatcher, IYieldCurveABIDispatcherTrait, YieldPoint
};
use pragma::entry::structs::{AggregationMode, DataType};
use starknet::get_block_timestamp;
use starknet::contract_address::contract_address_const;


fn get_yield_curve_points(number_of_decimals : u32) -> Span<YieldPoint> {
    let YIELD_CURVE_ADDRESS: ContractAddress =
        contract_address_const::<0x000000000000000000000>();

    let yield_curve_dispatcher = IYieldCurveABIDispatcher { contract_address: YIELD_CURVE_ADDRESS };
    let yield_curve_points = yield_curve_dispatcher
        .get_yield_points(number_of_decimals);
        
    return yield_curve_points; // will return the yield curve points multiiplied by 10^number_of_decimals
}

//USAGE

let number_of_decimals = 8;
let yield_points = get_yield_curve_points(number_of_decimals);

```

### How the Yield Curve is Calculated

Aave overnight rates are used to estimate short-term rates. BTC spot and futures prices are pulled at the exact same time to calculate the rates for different maturities. The interest rate for each maturity is calculated according to the following equation:

  <div >
  <a href="https://ibb.co/5MSMY8k"><img height='100%' width='100%'src="https://i.ibb.co/p0M0WzQ/yield-curve-formula.png" alt="yield-curve-formula"/></a>
  </div>

​We floor the values with 0 to account for case where spot > future (backwardation).

## Technical Specification

### Struct: `YieldPoint`

This struct represents a point on the yield curve. Each point contains the calculated rate, the timestamp at which it was calculated and what maturity it represents. It also shows the sources we have used to calculate it (e.g. Aave overnight rate, Deribit future/sport rate).

#### Members

- `capture_timestamp`: timestamp of data capture
- `expiry_timestamp`: timestamp of expiry of the instrument (1 day for overnight rates and expiration date for futures)
- `rate`: the calculated yield rate or overnight rate
- `source`: an indicator for the source (`str_to_felt` encoded lowercase of "on" for Aave overnight rate, "future/spot" for Deribit future/sport rate, and "other" for future additional data sources)

### Function: `get_yield_points`

This function calculates what the yield curve is at any point in time, and returns the computed yields in form of an array.

#### Inputs

- `decimals`: the precision at which the rates are calculated

#### Returns

- `yield_curve`: an array of `YieldPoint` structs each representing a different maturity on the curve. Rates are reported up to the requested decimal.
