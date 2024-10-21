---
id: supported-assets
title: Supported Assets
sidebar_position: 2
---

---

## Starkex Asset

The following asset pairs are officially supported by Pragma. More are added every week, so just reach out on [Twitter](https://twitter.com/PragmaOracle) or [Discord](https://discord.com/invite/N7sM7VzfJB) if you have a specific one you need.

The `pair_id` is calculated by utf-8 encoding the uppercased string (e.g. `str_to_felt("BTCUSD")`) and used to refer to specific feeds

### Spot

| Ticker     | Starkex Pair Id    | Decimals | Risk |
| ---------- | ------------------ | -------- | ---- |
| BTC/USD    | 425443555344       | 8        | L    |
| ETH/USD    | 45544855534        | 8        | L    |
| WBTC/USD   | 57425443555344     | 8        | M    |
| WBTC/BTC   | 57425443425443     | 8        | M    |
| BTC/EUR    | 425443455552       | 8        | L    |
| WSTETH/USD | 575354455448555344 | 8        | M    |
| LORDS/USD  | 4c4f524453555344   | 8        | H    |
| UNI/USD    | 554e49555344       | 8        | M    |
| STRK/USD   | 5354524b555344     | 8        | L    |
| ZEND/USD   | 5a454e44555344     | 8        | H    |
| SOL/USD    | 534f4c555344       | 8        | L    |
| MATIC/USD  | 4d4154494355534    | 8        | L    |
| ETH/USDC   | 45544855534443     | 6        | L    |
| DAI/USDC   | 44414955534443     | 6        | M    |
| WBTC/USDC  | 5742544355534443   | 6        | M    |
| ETH/STRK   | 4554485354524b     | 18       | L    |
| STRK/USDT  | 5354524b55534454   | 8        | L    |
| BTC/USDT   | 42544355534454     | 6        | L    |
| BTC/ETH    | 425443455448       | 8        | L    |
| ETH/LORDS  | 4554484c4f524453   | 8        | H    |
| ZEND/USDT  | 5a454e4455534454   | 8        | H    |
| ZEND/USDC  | 5a454e4455534443   | 8        | H    |
| LDO/USDT   | 4c444f55534454     | 8        | M    |
| LDO/USD    | 4c444f555344       | 8        | M    |
| MKR/USD    | 4d4b52555344       | 8        | M    |
| AAVE/USD   | 41415645555344     | 8        | M    |
| SNX/USD    | 534e58555344       | 8        | M    |
| RPL/USD    | 52504c555344       | 8        | M    |
| COMP/USD   | 434f4d50555344     | 8        | M    |
| YFI/USD    | 594649555344       | 8        | M    |
| BAL/USD    | 42414c555344       | 8        | M    |
| ETH/ZEND   | 4554485a454e44     | 8        | H    |
| MC/USD     | 4d43555344         | 8        | M    |
| RNDR/USD   | 524e4452555344     | 8        | M    |
| FET/USD    | 464554555344       | 8        | M    |
| IMX/USD    | 494d58555344       | 8        | M    |
| GALA/USD   | 47414c41555344     | 8        | M    |
| ILV/USD    | 494c56555344       | 8        | M    |
| APE/USD    | 415045555344       | 8        | M    |
| SAND/USD   | 53414e44555344     | 8        | M    |
| AXS/USD    | 415853555344       | 8        | M    |
| MANA/USD   | 4d414e41555344     | 8        | M    |
| ENS/USD    | 454e53555344       | 8        | M    |
| BLUR/USD   | 424c5552555344     | 8        | M    |
| DPI/USD    | 445049555344       | 8        | M    |
| MVI/USD    | 4d5649555344       | 8        | M    |
| DOGE/USD   | 444f4745555344     | 8        | M    |
| BNB/USD    | 424e42555344       | 8        | M    |
| XRP/USD    | 585250555344       | 8        | M    |
| WIF/USD    | 574946555344       | 8        | M    |
| NEAR/USD   | 4e454152555344     | 8        | M    |
| AVAX/USD   | 41564158555344     | 8        | M    |
| LTC/USD    | 4c5443555344       | 8        | M    |
| TRX/USD    | 545258555344       | 8        | M    |
| ADA/USD    | 414441555344       | 8        | M    |
| LINK/USD   | 4c494e4b555344     | 8        | M    |
| BCH/USD    | 424348555344       | 8        | M    |
| ARB/USD    | 415242555344       | 8        | M    |
| WLD/USD    | 574c44555344       | 8        | M    |
| OP/USD     | 4f50555344         | 8        | M    |
| DOT/USD    | 444f54555344       | 8        | M    |
| ONDO/USD   | 4f4e444f555344     | 8        | M    |
| SUI/USD    | 535549555344       | 8        | M    |
| ETC/USD    | 455443555344       | 8        | M    |
| ATOM/USD   | 41544f4d555344     | 8        | M    |
| FIL/USD    | 46494c555344       | 8        | M    |
| FTM/USD    | 46544d555344       | 8        | M    |
| ORDI/USD   | 4f524449555344     | 8        | M    |
| APT/USD    | 41505455534        | 8        | M    |
| JUP/USD    | 4a5550555344       | 8        | M    |
| TIA/USD    | 544941555344       | 8        | M    |
| INJ/USD    | 494e4a555344       | 8        | M    |
| PENDLE/USD | 50454e444c45555344 | 8        | M    |
| SEI/USD    | 534549555344       | 8        | M    |

### Perpetuals

| Ticker        | Starkex Pair Id          | Decimals | Risk |
| ------------- | ------------------------ | -------- | ---- |
| BTC/USD       | 425443555344             | 8        | L    |
| ETH/USD       | 45544855534              | 8        | L    |
| BTC/USDT      | 42544355534454           | 6        | L    |
| ETH/USDT      | 4554485553445            | 6        | L    |
| SOL/USD       | 534f4c555344             | 8        | L    |
| SOL/USDT      | 534f4c55534454           | 6        | L    |
| DOGE/USD      | 444f4745555344           | 8        | M    |
| DOGE/USDT     | 444f474555534454         | 6        | M    |
| BNB/USD       | 424e42555344             | 8        | M    |
| BNB/USDT      | 424e4255534454           | 6        | M    |
| XRP/USD       | 585250555344             | 8        | M    |
| XRP/USDT      | 58525055534454           | 6        | M    |
| 1000PEPE/USD  | 3130303050455045555344   | 8        | M    |
| 1000PEPE/USDT | 313030305045504555534454 | 6        | M    |
| WIF/USD       | 574946555344             | 8        | M    |
| WIF/USDT      | 57494655534454           | 6        | M    |
| NEAR/USD      | 4e454152555344           | 8        | M    |
| NEAR/USDT     | 4e45415255534454         | 6        | M    |
| AVAX/USD      | 41564158555344           | 8        | M    |
| AVAX/USDT     | 4156415855534454         | 6        | M    |
| LTC/USD       | 4c5443555344             | 8        | M    |
| LTC/USDT      | 4c54435553445            | 6        | M    |
| TRX/USD       | 545258555344             | 8        | M    |
| TRX/USDT      | 54525855534454           | 6        | M    |
| ADA/USD       | 414441555344             | 8        | M    |
| ADA/USDT      | 41444155534454           | 6        | M    |
| LINK/USD      | 4c494e4b555344           | 8        | M    |
| LINK/USDT     | 4c494e4b55534454         | 6        | M    |
| BCH/USD       | 424348555344             | 8        | M    |
| BCH/USDT      | 42434855534454           | 6        | M    |
| MATIC/USD     | 4d41544943555344         | 8        | M    |
| MATIC/USDT    | 4d4154494355534454       | 6        | M    |
| ARB/USD       | 415242555344             | 8        | M    |
| ARB/USDT      | 41524255534454           | 6        | M    |
| WLD/USD       | 574c44555344             | 8        | M    |
| WLD/USDT      | 574c4455534454           | 6        | M    |
| OP/USD        | 4f50555344               | 8        | M    |
| OP/USDT       | 4f5055534454             | 6        | M    |
| DOT/USD       | 444f54555344             | 8        | M    |
| DOT/USDT      | 444f5455534454           | 6        | M    |
| ONDO/USD      | 4f4e444f555344           | 8        | M    |
| ONDO/USDT     | 4f4e444f55534454         | 6        | M    |
| SUI/USD       | 535549555344             | 8        | M    |
| SUI/USDT      | 53554955534454           | 6        | M    |
| ETC/USD       | 455443555344             | 8        | M    |
| ETC/USDT      | 45544355534454           | 6        | M    |
| ATOM/USD      | 41544f4d555344           | 8        | M    |
| ATOM/USDT     | 41544f4d55534454         | 6        | M    |
| FIL/USD       | 46494c555344             | 8        | M    |
| FIL/USDT      | 46494c55534454           | 6        | M    |
| FTM/USD       | 46544d555344             | 8        | M    |
| FTM/USDT      | 46544d55534454           | 6        | M    |
| ORDI/USD      | 4f524449555344           | 8        | M    |
| ORDI/USDT     | 4f52444955534454         | 6        | M    |
| UNI/USD       | 554e49555344             | 8        | M    |
| UNI/USDT      | 554e4955534454           | 6        | M    |
| APT/USD       | 415054555344             | 8        | M    |
| APT/USDT      | 41505455534454           | 6        | M    |
| JUP/USD       | 4a5550555344             | 8        | M    |
| JUP/USDT      | 4a555055534454           | 6        | M    |
| TIA/USD       | 544941555344             | 8        | M    |
| TIA/USDT      | 54494155534454           | 6        | M    |
| INJ/USD       | 494e4a555344             | 8        | M    |
| INJ/USDT      | 494e4a55534454           | 6        | M    |
| PENDLE/USD    | 50454e444c45555344       | 8        | M    |
| PENDLE/USDT   | 50454e444c4555534454     | 6        | M    |
| MKR/USD       | 4d4b52555344             | 8        | M    |
| MKR/USDT      | 4d4b5255534454           | 6        | M    |
| SEI/USD       | 534549555344             | 8        | M    |
| SEI/USDT      | 53454955534454           | 6        | M    |

### Stablecoins

| Ticker   | Starkex Pair Id | Decimals | Risk |
| -------- | --------------- | -------- | ---- |
| USDT/USD | 55534454555344  | 6        | L    |
| DAI/USD  | 444149555344    | 8        | M    |
| USDC/USD | 55534443555344  | 6        | L    |
| LUSD/USD | 4c555344555344  | 8        | H    |
