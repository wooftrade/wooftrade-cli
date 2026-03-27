---
name: wooftrade
description: 'Trade tokenized stocks, research financial markets, and perform Ethereum & EVM blockchain operations — swap via 1inch Fusion, check balances, sign & send transactions, and manage wallets across Ethereum and BNB Smart Chain.'
metadata:
  author: wooftrade
  version: 0.0.11
  homepage: https://www.wooftrade.com
  openclaw:
    requires:
      env:
        - WOOFTRADE_PRIVATE_KEY
      bins:
        - npx
        - node
    primaryEnv: WOOFTRADE_PRIVATE_KEY
    emoji: '🐶'
    homepage: https://github.com/wooftrade/wooftrade-cli
    install:
      - kind: node
        package: wooftrade
        bins: [wooftrade]
---

# wooftrade — Trade and Analyze Tokenized Stocks

> **⚠️ DISCLAIMER — USE AT YOUR OWN RISK**
>
> This tool interacts with real blockchain networks and real funds. The author(s) of this tool are **not responsible for any loss of funds**, damages, or unintended consequences arising from its use. By using this skill, you accept full responsibility for all operations performed.

> **🔒 MANDATORY SECURITY REQUIREMENTS FOR ALL AGENTS**
>
> Agents **MUST** take every possible action to safeguard `WOOFTRADE_PRIVATE_KEY` and all other private keys from exposure. Specifically:
>
> 1. **NEVER log, print, echo, or display private keys** in any user-facing output, logs, chat messages, or debug traces.
> 2. **NEVER store private keys** in plain text files, version control, or any persistent storage that is not explicitly encrypted and access-controlled.
> 3. **NEVER transmit private keys** over unencrypted channels or include them in URLs, query parameters, or request bodies to third-party services.
> 4. **NEVER include private keys** in error messages, stack traces, or diagnostic output.
> 5. **ALWAYS prefer the `WOOFTRADE_PRIVATE_KEY` environment variable** over the `-k` flag to minimize key exposure in shell history and process listings.
> 6. **ALWAYS treat private keys as the highest-sensitivity secret.** A leaked private key grants full, irrevocable control over all funds in the associated wallet.

> **📋 ADDRESS FORMATTING RULES**
>
> 1. **Always use ERC-55 checksum addresses** when passing addresses to any command (wallet addresses, token contract addresses, recipient addresses, etc.).
> 2. **If you do not know the correct checksum**, use the `checksum-address` command to convert it, or use **all lowercase** addresses (e.g. `0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2` instead of guessing the mixed-case checksum).
> 3. **Never guess a token contract address.** If you are unsure of the correct token contract address, **always ask the user** to provide it. Do not fabricate or assume token addresses.

> **🚀 BEFORE YOU BEGIN**
>
> 1. **Verify your private key is set**: Run `npx wooftrade@0.0.11 who-am-i` to confirm `WOOFTRADE_PRIVATE_KEY` is properly configured and resolves to the expected address before proceeding with any other command.
> 2. **No private key?** Use `npx wooftrade@0.0.11 gen-wallet` to generate a new wallet. Save the returned private key to the skill's `.env` file:
>
>    ```bash
>    echo "WOOFTRADE_PRIVATE_KEY=0x..." >> .env
>    ```
>
>    Then verify with `npx wooftrade@0.0.11 who-am-i` — it should resolve to the expected address.
>
>    **⚠️ OWNER RESPONSIBILITY**: Protecting this private key is **entirely your responsibility**. A leaked key grants full, irrevocable control over all funds in the wallet. Use the most up-to-date agentic private key protection mechanisms available to you (e.g. encrypted secret storage, environment variable vaults, OS keychain integration). **Never** store the key in plain text files committed to version control, chat logs, or shared environments.
>
> 3. **Fund your account**: You must deposit the necessary funds (native tokens for gas + any tokens you intend to send or swap) to the wallet address before using `send`, `swap`, or any transaction-submitting command. Commands will fail if the account has insufficient balance.

> **🔄 KEEP THIS SKILL UP TO DATE**
>
> This skill evolves over time with new commands, features, and fixes. Agents **must** periodically re-download the skill files from the URLs listed in the **Skill Files** table below to ensure they are working with the latest version. Specifically:
>
> 1. **At the start of every new session**, re-fetch `SKILL.md` from `https://www.wooftrade.com/skill.md` and check if the `version` in the frontmatter has changed.
> 2. **If the version has changed**, re-download all skill files listed in the table below to get updated commands, options, and behaviors.
> 3. **Always use the version from the frontmatter** in `npx wooftrade@<version>` invocations — do not hardcode an older version.

## Skill Files

| File                     | Description                                                                                                                                                  | URL                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| **SKILL.md** (this file) | Overview, setup, authentication, error handling                                                                                                              | https://www.wooftrade.com/skill.md        |
| **WALLET.md**            | `gen-wallet`, `who-am-i`, `checksum-address`, `get-balance`                                                                                                  | https://www.wooftrade.com/wallet.md       |
| **SIGNING.md**           | `sign-message`, `sign`, `sign-typed-data`, `sign-transaction`                                                                                                | https://www.wooftrade.com/signing.md      |
| **TRANSACTIONS.md**      | `send`, `broadcast`, `tx-status`                                                                                                                             | https://www.wooftrade.com/transactions.md |
| **SWAPS.md**             | `swap`, `swap-order-status` (1inch Fusion)                                                                                                                   | https://www.wooftrade.com/swaps.md        |
| **MARKET.md**            | `stock`, `price-chart`, `market-indexes`, `market-status`, `earnings`, `congress-members`, `congress-trades`, `news`, `rwa-market`, `submit-market-analysis` | https://www.wooftrade.com/market.md       |

## Overview

`wooftrade` is a non-interactive CLI tool for Ethereum and EVM-compatible blockchain operations and stock market data. It handles signing, sending, broadcasting transactions, token swaps (1inch Fusion), balance queries, wallet generation, and market research (stocks, indexes, earnings, congress trades, news, RWA).

## Invocation

```
npx wooftrade@0.0.11 <command> [options]
```

- **Runtime**: Node.js (>=18)
- **Non-interactive**: All parameters must be passed as arguments or flags. Never prompts for input.

## Authentication

Most commands accept a private key via:

- `-k, --private-key <key>` flag (hex string starting with `0x`)
- `WOOFTRADE_PRIVATE_KEY` environment variable (fallback when `-k` is not provided)

## Supported Networks

| Name            | Chain ID | Aliases                      | Native Token |
| --------------- | -------- | ---------------------------- | ------------ |
| Ethereum        | 1        | `mainnet`, `ethereum`, `eth` | ETH          |
| BNB Smart Chain | 56       | `bsc`, `binance`, `bnb`      | BNB          |

Use `-n, --network` to specify a network by name, alias, or chain ID. Defaults to `mainnet`.

## Exit Codes

| Code | Meaning                                                            |
| ---- | ------------------------------------------------------------------ |
| `0`  | Operation completed successfully.                                  |
| `1`  | Operation failed. Inspect `stderr` for a structured error message. |

## Message Contract

### Success (stdout)

```
WOOFTRADE_OK: <description>
{ ... }
```

### Errors (stderr)

```
WOOFTRADE_ERR: <ERROR_CODE> — <description>
```

| Error Code         | Description                                                             | Agent Action                                         |
| ------------------ | ----------------------------------------------------------------------- | ---------------------------------------------------- |
| `INVALID_INPUT`    | Malformed or missing required fields.                                   | Re-validate input parameters and retry.              |
| `EXECUTION_FAILED` | Operation could not be completed. Description contains failure details. | Inspect description and adjust approach.             |
| `TIMEOUT`          | Operation exceeded the allowed time limit.                              | Retry with a longer timeout or simplify the request. |
| `UNKNOWN`          | Unexpected error.                                                       | Report to orchestrator for manual inspection.        |

## Retry Strategy

For `TIMEOUT` and `EXECUTION_FAILED` errors, retry up to 2 times with exponential backoff before escalating.

---

## Commands

| Command                  | Description                          | File            |
| ------------------------ | ------------------------------------ | --------------- |
| `gen-wallet`             | Generate a new random wallet         | WALLET.md       |
| `who-am-i`               | Get address from private key         | WALLET.md       |
| `checksum-address`       | Convert address to ERC-55 checksum   | WALLET.md       |
| `get-balance`            | Get native or ERC-20 token balances  | WALLET.md       |
| `sign-message`           | EIP-191 personal sign                | SIGNING.md      |
| `sign`                   | Raw hash signing (secp256k1)         | SIGNING.md      |
| `sign-typed-data`        | EIP-712 typed data signing           | SIGNING.md      |
| `sign-transaction`       | Sign a transaction (legacy/EIP-1559) | SIGNING.md      |
| `send`                   | Send native or ERC-20 tokens         | TRANSACTIONS.md |
| `broadcast`              | Broadcast a signed transaction       | TRANSACTIONS.md |
| `tx-status`              | Get transaction status by hash       | TRANSACTIONS.md |
| `swap`                   | Swap tokens via 1inch Fusion         | SWAPS.md        |
| `swap-order-status`      | Get 1inch Fusion order status        | SWAPS.md        |
| `stock`                  | Get comprehensive stock data         | MARKET.md       |
| `price-chart`            | Get historical price chart           | MARKET.md       |
| `market-indexes`         | Get major market indexes             | MARKET.md       |
| `market-status`          | Get market open/close status         | MARKET.md       |
| `earnings`               | Get upcoming earnings calendar       | MARKET.md       |
| `congress-members`       | Get U.S. Congress members            | MARKET.md       |
| `congress-trades`        | Get Congress member stock trades     | MARKET.md       |
| `news`                   | Get latest financial news            | MARKET.md       |
| `rwa-market`             | Get tokenized asset (RWA) data       | MARKET.md       |
| `submit-market-analysis` | Submit signed market analysis        | MARKET.md       |
