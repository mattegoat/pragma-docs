---
id: consume-off-data
title: Consuming Data
sidebar_position: 1
---

# Consuming Off-Chain Data

Pragma provides a websocket endpoint for accessing real-time off-chain data, crucial for developing decentralized applications (dApps) that require continuous updates. This off-chain data can be later published to compatible blockchains, such as [StarkEx](https://starkware.co/starkex/), for verification.

For detailed information on supported assets, please refer to our [Supported Assets](./supported-assets) page.

## Authentication

To access our API, you need to request an API key from us. Please contact our support team to obtain your unique API key.

Once you have your API key, include it in the **X-API-KEY** header of your API requests as follows:

```http
X-API-KEY: YOUR_API_KEY
```

Ensure that your API key is kept secure and not shared publicly. If you believe your API key has been compromised, please contact us immediately for a replacement.

## Connection

To start consuming data, connect to the **PragmAPI** websocket endpoint:

```
/node/v1/data/subscribe
```

Sending a request to this endpoint establishes a channel to receive real-time data updates every 500 milliseconds.

## Subscribing

By default, no asset pairs are subscribed. To subscribe to specific pairs, send a message formatted as follows:

```json
{
  "msg_type": "subscribe",
  "pairs": ["BTC/USD", "ETH/USD:MARK"]
}
```

The server will confirm your subscription with a response like this:

```json
{
  "msg_type": "subscribe",
  // the pairs you are currently subscribed to, here we were already
  // subscribed to SOL/USD
  "pairs": ["BTC/USD", "ETH/USD:MARK", "SOL/USD"]
}
```

We currently support two types of subscriptions:

#### Index prices

Median price for spot markets across supported exchanges.

**By default, subscriptions are for index prices**.

It means subscribing to a pair without specifying the type will subscribe to the index price. For example, to subscribe to the index price of BTC/USD, use `BTC/USD`.

#### Perpetual (Mark) Index prices

The perpetual index price is the median perp price across supported exchanges.

To subscribe to a specific mark price, append `:MARK` to the pair name. For example, to subscribe to the perpetual index price of ETH/USD, use `ETH/USD:MARK`.

**For assets quoted in a stablecoin, we compute as follow**:

1. Determine the median perp price of the asset quoted in the stablecoin.
2. Determine the median spot price of the stablecoin in USD.
3. Divide the median perp price by the median spot price of the stablecoin in USD.

**For assets quoted in USD**:

Determine the median perp price of the asset quoted in USD.

## Unsubscribing

To unsubscribe from specific pairs, send a message formatted as follows:

```json
{
  "msg_type": "unsubscribe",
  "pairs": ["BTC/USD"]
}
```

The server will confirm your unsubscription with a response like this:

```json
{
  "msg_type": "unsubscribe",
  // the pairs you are currently subscribed to
  "pairs": ["ETH/USD:MARK"]
}
```

## Response Format

Subscribed data will be provided in the following JSON format for each asset pair:

```json
{
  "global_asset_id": "0x12345",
  "median_price": "10000000000000001",
  "signature": "0x154786876ae878",
  "signed_prices": [
    {
      "oracle_asset_id": "0x12345000000000ABCDEF",
      "oracle_price": "1000000000000000000",
      "signing_key": "0x1234567890ABCDEF",
      "timestamp": "1234567",
      "signature": "0x1234567890ABCDEF"
    },
    {
      "oracle_asset_id": "0x12345000000000FEDCBA",
      "oracle_price": "1000000000000000002",
      "signing_key": "0xFEDCBA0987654321",
      "timestamp": "1234567",
      "signature": "0x1234567890ABCDEF"
    }
  ]
}
```

**Field Descriptions**:

- `global_asset_id`: Unique identifier for the asset encoded using the pair name.
- `median_price`: The median price of the asset.
- `signature`: Signature of the median price by the Pragma oracle.
- `signed_prices`: Array of the prices used to compute the median price:
  - `oracle_asset_id`: Unique identifier encoded using the pair and the publisher names.
  - `oracle_price`: Price provided by the oracle.
  - `signing_key`: Key used by the oracle to sign the price.
  - `timestamp`: Time when the price was recorded.
  - `signature`: Signature of the price by our publisher.

## Example

You can use the following Python code to connect to the Pragma websocket endpoint and subscribe to the TIA/USD index price:

```python
import asyncio
import websockets
import json
from websockets.exceptions import ConnectionClosedError

PRAGMA_API_BASE_URL = "ws.dev.pragma.build"
URI = f"node/v1/data/subscribe"
WS_URL = f"ws://{PRAGMA_API_BASE_URL}/${URI}"

SUBSCRIBE_MESSAGE = {"msg_type": "subscribe", "pairs": ["TIA/USD"]}


async def connect_to_websocket(uri):
    """Establish a connection to the websocket server."""
    try:
        websocket = await websockets.connect(uri)
        return websocket
    except Exception as e:
        print(f"Failed to connect to websocket: {e}")
        return None

async def subscribe_to_data(websocket, subscribe_message):
    """Send subscription message to the websocket."""
    try:
        await websocket.send(json.dumps(subscribe_message))
        print("Subscription message sent")
    except Exception as e:
        print(f"Failed to send subscription message: {e}")

async def handle_messages(websocket):
    """Handle incoming messages from the websocket."""
    try:
        async for message in websocket:
            print(f"Received message: {message}")
    except ConnectionClosedError:
        print("Connection closed")
    except Exception as e:
        print(f"Error receiving message: {e}")

async def consume_data(uri, subscribe_message):
    """Main function to consume data from websocket."""
    websocket = await connect_to_websocket(uri)
    if websocket:
        await subscribe_to_data(websocket, subscribe_message)
        await handle_messages(websocket)
        await websocket.close()

if __name__ == "__main__":
    try:
        asyncio.run(consume_data(URI, SUBSCRIBE_MESSAGE))
    except KeyboardInterrupt:
        print("Program interrupted")
    except Exception as e:
        print(f"An error occurred: {e}")
```

Replace `PRAGMA_API_BASE_URL` with the base URL of the Pragma API.

You can also use `curl` or any other websocket client to subscribe to the Pragma websocket endpoint.
