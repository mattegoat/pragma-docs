---
id: publishing-data
title: Publishing Data
sidebar_position: 3
---

---

Pragma makes publishing data easy because there is no off-chain infrastructure, so publishing only requires signing and timestamping data before sending it on-chain. All of this can be done with a simple, stateless node that costs a few dollars a month to run.

*Estimated Time*: A few hours to a day depending on your underlying data infrastructure.

Here is the step-by-step breakdown:

### 1. Account Setup

```bash
starkli signer gen-keypair
```
Store the given private key somewhere safe you can then use it in the next commands.

```bash
starkli account oz init /path/to/account.json --private-key <0x..>

starkli account deploy /path/to/account.json --private-key <0x..>
```

For more info you can look up here [starkli](https://book.starkli.rs/tutorials/starkli-101#starkli-101).

### 2. Register your account contract address with Pragma

Currently, publisher registration is permissioned while we create a robust ecosystem of publishers that will enable the transition to being a completely open network. During that initial phase, publishers send their publisher ID (the felt-encoded uppercased string, e.g. `str_to_felt("GEMINI")=78362974965321`) and account contract address to the Pragma team. Publishers should also publish their account contract address/public key online so that third parties can verify their identity with them directly.

### 3. Set up the data fetching logic

To simplify the process of setting up a publisher, we provide an optional Docker base image and a Python SDK which can make it easier to get started. The process to integrate usually takes an hour to half a day.

The initial publishing frequency for the oracle is every 3 minutes on Starknet Sepolia testnet, we expect to move to single-digit seconds as the network matures and value secured grows.

#### 3.1. Using the Pragma Python SDK

Install the SDK in your virtual environment

```bash
pip install pragma-sdk
```

See a full sample script [here](https://github.com/Astraly-Labs/pragma-sdk/blob/master/stagecoach/jobs/publishers/starknet-publisher/app.py), or copy paste the code below to get started. Note that you need to set environment variables `PUBLISHER`, `PUBLISHER_ADDRESS`, and `PUBLISHER_PRIVATE_KEY` before running the code. You can use the sample .env file here to set them (the file does not include `PUBLISHER_PRIVATE_KEY` for obvious reasons).
To make fetching data simple, implement your own fetching function using whatever libraries you want, as long as it returns a `List[Entry]`.

A few notes on expected parameters:
- If you are a Market Maker/Hedge Fund, the `source` and `publisher` fields will be the same.
- The `volume` field refers to a 24h cumulative volume in the `quote` asset. Our SDK automatically rebases it to be denominated
by the `base` asset given its `price`.
- In order to run the `publish` job, you will need to setup a `PragmaPublisherClient` that will use
the Starknet account you have deployed in step 1 and which you manage with `starkli`.
- You will also need an `RPC_KEY` corresponding to an [Infura](https://www.infura.io/) API Key.
⚠️ Soon the SDK will give you access to Pragma's own RPC providers by default and let you the option to add your own RPC url directly.

⚠️ Troubleshoting ⚠️
- Make sure you have `cmake` installed if you run into `ERROR: Could not build wheels for crypto-cpp-py, which is required to install pyproject.toml-based projects`
- `starknet_py.net.client_errors.ClientError: Client failed with code 401: invalid project id`. This means you probably have not set your `RPC_KEY` env variable correctly.

```python
import asyncio
import logging
import os
import time
from typing import List

from pragma.core.entry import SpotEntry, FutureEntry
from pragma.core.utils import currency_pair_to_pair_id, log_entry
from pragma.core.assets import PRAGMA_ALL_ASSETS, PragmaAsset
from pragma.publisher.client import PragmaPublisherClient

logger = logging.getLogger(__name__)

# You can fetch your data using any strategy or libraries you want

def fetch_entries(assets: List[PragmaAsset], *args, **kwargs) -> List[SpotEntry]:
    entries = []
    
    for asset in assets:
        if asset["type"] == 'ONCHAIN':
          continue
        
        entries.append(
            SpotEntry(
                timestamp=int(time.time()),
                source="MY_SOURCE",
                publisher="MY_PUBLISHER",
                pair_id=currency_pair_to_pair_id(*asset["pair"]),
                price=10 * 10 ** asset["decimals"], # shifted 10 ** decimals
                volume=0,
                autoscale_volume=False
            )
        )
        entries.append(
            FutureEntry(
                timestamp=int(time.time()),
                source="MY_SOURCE",
                publisher="MY_PUBLISHER",
                pair_id=currency_pair_to_pair_id(*asset["pair"]),
                price=10 * 10 ** asset["decimals"], # shifted 10 ** decimals
                expiry_timestamp=1693275381, # Set to 0 for perpetual contracts
                volume=0,
                autoscale_volume=False
            )
        )

    return entries

async def publish_all(assets):
    # We get the private key and address of the account deployed in step 1.
    publisher_private_key = int(os.environ.get("PUBLISHER_PRIVATE_KEY"), 0)
    publisher_address = int(os.environ.get("PUBLISHER_ADDRESS"), 0)

    publisher_client = PragmaPublisherClient(
        account_private_key=publisher_private_key,
        account_contract_address=publisher_address,
        network=os.environ['NETWORK'] # ENV var set to `testnet | mainnet`
    )

    # Use your own custom logic
    _entries = fetch_entries(assets)
    await publisher_client.publish_many(_entries)

    logger.info("Publishing the following entries:")
    for entry in _entries:
        log_entry(entry, logger=logger)

if __name__ == "__main__":
    asyncio.run(publish_all(PRAGMA_ALL_ASSETS))
```

#### Docker Image

In this setup, a Python script would fetch data (your custom logic) and then use the Pragma SDK to publish that data, similar to the script above. In order to deploy you can use the pragma-publisher Docker base image. The base image is available on [Dockerhub](https://hub.docker.com/r/astralylabs/pragma-client) and comes with the Python and all requirements (including the pragma Python package) installed.

Again, note the .env file in that same [folder](https://github.com/Astraly-Labs/pragma-sdk/tree/master/stagecoach/jobs/publishers/custom/) which is passed to Docker at run time via the `--env-file` arg, with `PUBLISHER` and `PUBLISHER_ADDRESS` variables set, as well as a `PUBLISHER_PRIVATE_KEY` variable (which is not in the repository for obvious reasons).

Alternatively, you can find an example of how to use the SDK in a serverless deployment (e.g. AWS Lambda).

```bash
FROM astralylabs/pragma-client:latest

COPY fetch-and-publish.py ./fetch-and-publish.py
CMD python fetch-and-publish.py
```

Then you can build the docker image `docker build . -t pragma-publisher`.
Finally just run it with the provided env file `docker run --env-file .env pragma-publisher`
