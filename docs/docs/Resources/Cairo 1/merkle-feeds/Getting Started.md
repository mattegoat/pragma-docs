---
id: getting-started
title: Getting Started
sidebar_position: 2
---

## Key Features

* Easy-to-use Rust SDK
* Supports both mainnet and testnet environments
* Flexible block selection for data retrieval

## Usage

To start using the Pragma Consumer SDK in your Rust project:

### 1. Add the SDK to your Cargo.toml:

```toml
[dependencies]
pragma-consumer = "0.1.0"
```


### 2. Initialize the Consumer in your code:

```rust
let api_config = ApiConfig {
    base_url: PragmaBaseUrl::Prod,
    api_key: "your_api_key".into(),
};

let consumer = PragmaConsumerBuilder::new()
    .on_mainnet()
    .with_http(api_config)
    .await?;
```

### 3. Fetch Merkle Feed data

```rust
let instrument = instrument!("BTC-16AUG24-52000-P");
let merkle_feed_calldata = consumer
    .get_merkle_feed_calldata(&instrument, None)
    .await?;
```

### 4. Use the result to update the data on-chain

If you are just trying to get started with our Options Data Feed, see this self-contained code snippet here. You can find the full Oracle interface specification is available [here](https://github.com/Astraly-Labs/pragma-oracle/blob/main/src/compute_engines/summary_stats/summary_stats.cairo).

```rust
let provider = JsonRpcClient::new(HttpTransport::new(
    Url::parse("https://starknet-sepolia.public.blastapi.io/rpc/v0_7").unwrap(),
));

let signer = LocalWallet::from(SigningKey::from_secret_scalar(
    Felt::from_hex("YOUR_PRIVATE_KEY_IN_HEX_HERE").unwrap(),
));
let address = Felt::from_hex("YOUR_ACCOUNT_CONTRACT_ADDRESS_IN_HEX_HERE").unwrap();
let summary_stats_address =
        Felt::from_hex("0x0379afb83d2f8e38ab08252750233665a812a24278aacdde52475618edbf879c").unwrap();

let mut account = SingleOwnerAccount::new(
        provider,
        signer,
        address,
        chain_id::SEPOLIA,
        ExecutionEncoding::New,
    );

let result = account
        .execute_v1(vec![Call {
            to: summary_stats_address,
            selector: get_selector_from_name("update_options_data").unwrap(),
            calldata: merkle_feed_calldata.as_calldata(),
        }])
        .send()
        .await
        .unwrap();

println!("Transaction hash: {:#064x}", result.transaction_hash);
```

## Next steps

Check out our [examples](https://github.com/astraly-labs/pragma-node/tree/main/pragma-consumer/examples) to see the SDK in action and learn more about integrating Pragma's Merkle Feeds into your project.

For more detailed technical information, please refer to our full documentationon [github](https://github.com/astraly-labs/pragma-node/tree/main/pragma-consumer) or on [docs.rs](https://docs.rs/pragma-consumer/0.1.0/pragma_consumer/#).
