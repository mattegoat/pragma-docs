---
id: setting-up-checkpoints
title: Setting up checkpoints
sidebar_position: 1
---

---

Checkpointer is a service designed to automatically create checkpoints periodically for a set of asset pairs. It provides an easy-to-use CLI tool that handles the heavy lifting of setting checkpoints for your assets at your desired frequency.

### Installation

The Checkpointer is available as a Docker image hosted [here](https://github.com/astraly-labs/pragma-sdk/pkgs/container/pragma-sdk%2Fcheckpointer).

### Configuration

To specify which assets you want to set checkpoints for, you need to provide a YAML configuration file. Here's an example of how to format this file:
```yaml
# config/config.example.yaml
spot:
  - pair: BTC/USD
  - pair: ETH/USD
future:
  - pair: BTC/USD
    expiry: 102425525524
  - pair: BTC/USD
    expiry: 0
  - pair: ETH/USD
    expiry: 234204249042
  - pair: SOL/USD
    expiry: 0
```

For spot pairs, simply list them under the spot section.
For future pairs, list them under the future section and include the expiry timestamp for each pair.

### Usage
The service is run through the CLI. Here's the basic syntax:
```sh
$ python checkpointer/main.py [OPTIONS]


Options
    -c, --config-file PATH: Path to YAML configuration file. (Required)

    --log-level [DEBUG|INFO|WARNING|ERROR|CRITICAL]: Logging level.
    
    -n, --network [sepolia|mainnet|pragma_devnet]: Network on which the checkpoints will be set. Defaults to SEPOLIA. (Required)

    --rpc-url TEXT: RPC URL used by the onchain client.

    --oracle-address TEXT: Address of the Pragma Oracle. (Required)

    --admin-address TEXT: Address of the Admin contract for the Oracle. (Required)

    -p, --private-key TEXT: Secret key of the signer. Format: aws:secret_name, plain:secret_key, or env:ENV_VAR_NAME (Required)

    -t, --set-checkpoint-interval: Delay in minutes between each new checkpoint. Defaults to 60 minutes. (Must be >= 0)
```

### Example Usage

```bash
poetry run checkpointer -c config/config.example.yaml --oracle-address $PRAGMA_ORACLE_ADDRESS --admin-address $PRAGMA_ADMIN_ACCOUNT -p plain:$MY_PRIVATE_KEY
```

### Getting Help
For more information on how to run the CLI, you can use the --help command:
```bash
python checkpointer/main.py --help
```

This will display a detailed list of all available options and their descriptions.

### Additional Information
For more detailed information about the CLI, please refer to the README in the GitHub repository.