---
id: Build a prediction market
title: Build a Prediction Market
sidebar_position: 3
---


:::caution Under Development

This feature is currently under development. Content may be incomplete or subject to change.

:::

As a use case for Pragma's Optimistic Oracle, we've built a [binary prediction market](https://github.com/astraly-labs/Optimistic-Oracle/blob/main/optimistic_oracle/src/examples/prediction_market.cairo) that can serve as an example. Let's detail the different functions implemented in this contract.

## General Presentation

A prediction market smart contract enables individuals to make predictions and place bets on the outcomes of future events, such as sports games, cryptocurrency prices, product launches, and political decisions. This contract allows for the creation of prediction markets for any off-chain event with two possible outcomes.

Participants can create outcome tokens (shares) and trade them based on their assessment of each outcome's likelihood. The market sets share prices according to supply and demand, allowing individuals to profit from accurate predictions. However, this contract only covers the creation of outcome tokens, not their sale.

## Contract Implementation

### Constructor

The constructor initializes the storage variables within the contract.

#### Inputs

- `finder`: The address of the finder contract, a library gathering all the contracts used within the prediction market.
- `currency`: The currency used for trading in the markets.
- `oo`: The optimistic oracle contract address.

### Create the Market

#### `initialize_market`

Two ERC20 tokens with minting/burning rights are created. The prediction market has the minter and burner roles for both ERC20 tokens.

#### Inputs

- `outcome_1`: First outcome (e.g., "yes").
- `outcome_2`: Second outcome (e.g., "no").
- `description`: A ByteArray description of the market and the event being predicted.
- `reward`: The amount of currency available as a reward for the user that creates the assertion. Must be approved.
- `required_bond`: The amount of currency that users must bond to assert the outcome of the event.

#### Returns

- `market_id`: The market ID associated with the newly created market.

#### `assert_market`

Function used to assert a market with three outcomes: outcome1, outcome2, or unresolvable. It first checks if the market exists by verifying the outcome1 token address is not null. Then it ensures that the asserted outcome ID is null (the assertion is not active or resolved if the asserted outcome ID is null). Using a Poseidon hash, it sets the asserted_outcome_id and fetches the required bond to make the assertion. If the market bond is higher than the minimum bond, this one is used instead. Finally, it creates the claim, transfers the bond from the caller's address to the prediction market, approves this bond for the optimistic oracle, and initiates the `assert_truth_with_defaults` function.

#### Inputs

- `market_id`: Unique identifier for the market.
- `asserted_outcome`: ByteArray representing the asserted outcome.

#### Returns

- `assertion_id`: The assertion ID associated with the assertion.

### `create_outcome_tokens`

Function used to mint a pair of tokens representing the value of outcome1 and outcome2 for a given market. This allows participants to trade on the market outcome by exchanging these tokens outside the scope of the Prediction Market contract. The function first checks if the market exists. If so, it transfers the specified amount of currency tokens from the caller to the contract using the ERC20 `transfer_from` function. Then, it mints the specified amount of both outcome1 and outcome2 tokens to the caller using the mint function of the respective FullERC20 token instances. Before calling this function, the caller must approve the contract to spend the required amount of currency tokens by calling the approve function on the currency contract instance.

#### Inputs

- `tokens_to_create`: Number of tokens to be created for each outcome (the total number of tokens created will be twice this value).
- `market_id`: Felt252 value representing the unique identifier of the market for which the outcome tokens are being created.

### `redeem_outcome_tokens`

Function used to burn an equal amount of `outcome1_token` and `outcome2_token` for a given market and transfer the corresponding settlement currency tokens to the caller's account. First, it retrieves the Market data using the provided market_id. It then verifies the market exists by checking if the `outcome1_token` address is not null. The function proceeds to burn the specified number of tokens for both `outcome1_token` and `outcome2_token` using their respective `burn()` functions, decreasing the caller's balance. Finally, it transfers the specified number of settlement currency tokens from the contract's account to the caller's account.

#### Inputs

- `market_id`: Unique identifier for the market.
- `tokens_to_redeem`: Number of tokens of each outcome to be redeemed (the total number of tokens redeemed will be twice this value).

### `settle_outcome_tokens`

Function used to settle outcome tokens for a given market and receive a payout in the settlement currency. The payout depends on the resolved market outcome and the number of tokens burned for each outcome. The function first retrieves the Market data and checks if the market has been resolved. It then determines the caller's balance of `outcome1_token` and `outcome2_token`. The payout is calculated based on the resolved market outcome and the number of tokens burned for each outcome. Finally, it burns the caller's outcome tokens and transfers the calculated payout to the caller's account.

- If resolved to outcome1: payout = outcome1_token_balance
- If resolved to outcome2: payout = outcome2_token_balance
- If unresolved: payout = (outcome1_token_balance + outcome2_token_balance) / 2

#### Inputs

- `market_id`: Unique identifier for the market.

#### Returns

- `payout`: Amount of settlement currency transferred to the caller.