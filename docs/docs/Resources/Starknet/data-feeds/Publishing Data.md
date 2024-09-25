---
id: publishing-data
title: Publishing Data
sidebar_position: 3
---

---

Pragma makes publishing data easy because there is no off-chain infrastructure, so publishing only requires signing and timestamping data before sending it on-chain. All of this can be done with a simple, stateless node that costs a few dollars a month to run.

_Estimated Time_: A few hours to a day depending on your underlying data infrastructure.

_SDK Version_: This walkthrough is only valid for the SDK versions `>=2.0.0`.

Here is the step-by-step breakdown:

### 1. Account Setup

We highly recommend using keystores instead of plain private keys for security.

```bash
starkli signer keystore new /path/to/key.json
```

```bash
export STARKNET_KEYSTORE="/path/to/key.json"
```

```bash
starkli account oz init /path/to/account.json
```

```bash
starkli account deploy /path/to/account.json
```

For more info you can look up here [starkli](https://book.starkli.rs/tutorials/starkli-101#starkli-101).

### 2. Register your account contract address with Pragma

Currently, publisher registration is permissioned while we create a robust ecosystem of publishers that will enable the transition to being a completely open network. During that initial phase, publishers send their publisher ID (the felt-encoded uppercased string, e.g. `FLOWDESK`) and account contract address to the Pragma team. Publishers should also publish their account contract address/public key online so that third parties can verify their identity with them directly.

### 3. Set up the data fetching logic

To simplify the process of setting up a publisher, we provide an optional Docker base image and a Python SDK which can make it easier to get started. The process to integrate usually takes an hour to half a day.

The initial publishing frequency for the oracle is every 3 minutes on Starknet Sepolia testnet, we expect to move to single-digit seconds as the network matures and value secured grows.

#### 3.1. Using the Pragma Python SDK

Install the SDK in your virtual environment

```bash
pip install pragma-sdk
```

Full installation instructions can be found here

See a full sample script [here](https://github.com/astraly-labs/pragma-sdk/blob/master/pragma-sdk/tests/docs/publish.py), or copy paste the code below to get started.

Note that you need to set environment variables `PUBLISHER`, `PUBLISHER_ADDRESS`, and `PUBLISHER_KEYSTORE_PASSWORD` before running the code. You can use the sample .env file here to set them (the file does not include `PUBLISHER_KEYSTORE_PASSWORD` for obvious reasons).

To make fetching data simple, implement your own fetching function using whatever libraries you want, as long as it returns a `List[Entry]`.

A few notes on expected parameters:

- If you are a Market Maker/Hedge Fund, the `source` and `publisher` fields will be the same.
- The `volume` field refers to a 24h cumulative volume in the `quote` asset. Our SDK automatically rebases it to be denominated
  by the `base` asset given its `price`.
- In order to run the `publish` job, you will need to setup a `PragmaOnChainClient` that will use
  the Starknet account you have deployed in step 1 and which you manage with `starkli`.
- It's highly recommended you use your own RPC if possible, providers such as [Nethermind](https://data.voyager.online/) are recommended.

```python
import asyncio
import logging
import os
import time
from typing import List

from pragma_sdk.common.types.pair import Pair
from pragma_sdk.common.types.entry import Entry, SpotEntry, FutureEntry
from pragma_sdk.onchain.client import PragmaOnChainClient


logger = logging.getLogger(__name__)

# You can fetch your data using any strategy or libraries you want
def fetch_entries(pairs: List[Pair], *args, **kwargs) -> List[Entry]:
    entries: List[Entry] = []

    for pair in pairs:
        entries.append(
            SpotEntry(
                timestamp=int(time.time()),
                source="MY_SOURCE",
                publisher="MY_PUBLISHER",
                pair_id=pair.id,
                price=10 * 10 ** pair.decimals(),  # shifted 10 ** decimals
                volume=0,
            )
        )
        entries.append(
            FutureEntry(
                timestamp=int(time.time()),
                source="MY_SOURCE",
                publisher="MY_PUBLISHER",
                pair_id=pair.id,
                price=10 * 10 ** pair.decimals(),  # shifted 10 ** decimals
                expiry_timestamp=1693275381,  # Set to 0 for perpetual contracts
                volume=0,
            )
        )

    return entries


async def publish_all(pairs: List[Pair]):
    # We get the keystore password and address of the account deployed in step 1.
    keystore_password = int(os.environ.get("PUBLISHER_KEYSTORE_PASSWORD"), 0)
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"), 0)

    publisher_client = PragmaOnChainClient(
        account_private_key=("/path/to/keystore", keystore_password),
        account_contract_address=publisher_address,
        network=os.environ["NETWORK"],  # ENV var set to `sepolia | mainnet`
    )

    # Use your own custom logic
    _entries = fetch_entries(pairs)
    await publisher_client.publish_many(_entries)

    logger.info("Publishing the following entries:")
    for entry in _entries:
        logger.info(entry, logger=logger)


PAIRS_TO_PUBLISH = [
    Pair.from_tickers("ETH", "USD"),
    Pair.from_tickers("BTC", "USD"),
    Pair.from_tickers("WBTC", "USD"),
    ... # more pairs
]

if __name__ == "__main__":
    asyncio.run(publish_all(PAIRS_TO_PUBLISH))

```

:::tip

To use a custom RPC, you will need to set the `network` constructor argument to your rpc url. In that case it is **mandatory** that you set the `chain_name` argument.

:::

```python
    publisher_client = PragmaOnChainClient(
        account_private_key=("/path/to/keystore", keystore_password),
        account_contract_address=publisher_address,
        network="https://my.custom.mainnet.rpc.url",
        chain_name="mainnet"
    )
```

#### 3.2. Publish on API

If you're willing to publish on the [Pragma API](https://blog.pragma.build/pragma-empowers-starknet-sequencer-with-the-launch-of-the-api/) aswell, there are 2 simple changes to make :

You will have to specify an `API_KEY` and an `API_URL`.
Currently the only way to get an API key is for us to give it to you, so please let us know if you need it!

There are 2 environments :

- dev: `https://api.dev.pragma.build/node` (default)
- prod: `https://api.prod.pragma.build/node`

Then you just need to use the `PragmaAPIClient` instead of the `PragmaOnChainClient`.

```python
    publisher_client = PragmaAPIClient(
            account_private_key=("path/to/keystore", keystore_password),
            account_contract_address=PUBLISHER_ADDRESS,
            api_url=API_URL, // dev or prod url
            api_key=API_KEY, // the api key that you received
        )

    // ... everything else stays the same
    await publisher_client.publish_entries(_entries)
```

:::warning

To publish on the API, same as onchain you will need to be whitelisted.
We have a secure system where you will have a master key and an active publishing key that lets you rotate the active key in case it's compromised.

:::

### 4. Docker Image

In this setup, a Python script would fetch data (your custom logic) and then use the Pragma SDK to publish that data, similar to the script above. In order to deploy you can use the pragma-publisher Docker base image. The base image is available on [ghcr](https://github.com/astraly-labs/pragma-sdk/pkgs/container/pragma-sdk%2Fpragma-sdk) and comes with the Python and all requirements (including the pragma Python package) installed.

Again, note the .env file in that same which is passed to Docker at run time via the `--env-file` arg, with `PUBLISHER` and `PUBLISHER_ADDRESS` variables set, as well as a `PUBLISHER_KEYSTORE_PASSWORD` variable (which is not in the repository for obvious reasons).

Alternatively, you can find an example of how to use the SDK in a serverless deployment (e.g. AWS Lambda).

```bash
FROM astraly-labs/pragma-sdk/pragma-sdk:2.0.1:latest

COPY fetch-and-publish.py ./fetch-and-publish.py
CMD python fetch-and-publish.py
```

Then you can build the docker image `docker build . -t pragma-publisher`.
Finally just run it with the provided env file `docker run --env-file .env pragma-publisher`

## Price Pusher

If you don't have any data but still want to push data onto the network to increase resiliency of the system.
You can simply run the `price-pusher` [image](https://github.com/astraly-labs/pragma-sdk/pkgs/container/pragma-sdk%2Fprice-pusher).
More instructions on this service can be found [here](https://github.com/astraly-labs/pragma-sdk/tree/master/price-pusher)
