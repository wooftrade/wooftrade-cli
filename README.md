# wooftrade

A non-interactive CLI tool for Ethereum and EVM-compatible blockchain operations and financial market data, designed for AI agent consumption. Supports signing, sending, broadcasting transactions, token swaps via 1inch Fusion, balance queries, wallet generation, and market research (stocks, indexes, earnings, congress trades, news, RWA).

## Installation

```bash
npx wooftrade@latest <command> [options]
```

Requires Node.js >= 18.

> **🚫 Trading (swap) functionality is NOT available to U.S. persons.**

## Authentication

All commands that require a private key accept it via:

1. **`-k` flag**: `-k 0xYOUR_PRIVATE_KEY`
2. **Environment variable**: `export WOOFTRADE_PRIVATE_KEY=0xYOUR_PRIVATE_KEY`

## Supported Networks

| Network         | Chain ID | Aliases                      |
| --------------- | -------- | ---------------------------- |
| Ethereum        | 1        | `mainnet`, `ethereum`, `eth` |
| BNB Smart Chain | 56       | `bsc`, `binance`, `bnb`      |

## Commands

### `gen-wallet`

Generate a new random wallet.

```bash
npx wooftrade@latest gen-wallet
```

### `who-am-i`

Get the address derived from a private key.

```bash
npx wooftrade@latest who-am-i -k 0xYOUR_PRIVATE_KEY
```

### `checksum-address`

Convert an Ethereum address to its ERC-55 checksum format.

```bash
npx wooftrade@latest checksum-address -a 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
```

### `sign-message`

Sign a message (EIP-191 personal sign).

```bash
npx wooftrade@latest sign-message -k 0xKEY -m "Hello World"
npx wooftrade@latest sign-message -k 0xKEY -m 0x68656c6c6f --raw   # raw hex
```

### `sign`

Sign a raw hash (secp256k1, no prefix). **Use with caution** — prefer `sign-message` in most cases.

```bash
npx wooftrade@latest sign -k 0xKEY -h 0xHASH
```

### `sign-typed-data`

Sign EIP-712 typed data.

```bash
npx wooftrade@latest sign-typed-data -k 0xKEY -d '{"domain":{...},"types":{...},"primaryType":"...","message":{...}}'
```

### `sign-transaction`

Sign a transaction (legacy, EIP-2930, or EIP-1559). Returns a serialized signed transaction.

```bash
npx wooftrade@latest sign-transaction -k 0xKEY -t '{"to":"0x...","value":"1000000000000000000","gasPrice":"20000000000","gas":"21000","nonce":0,"chainId":1}'
```

### `get-balance`

Get native or ERC-20 token balances.

```bash
npx wooftrade@latest get-balance -a 0xADDRESS                          # ETH balance
npx wooftrade@latest get-balance -a 0xADDRESS -n bsc                   # BNB balance
npx wooftrade@latest get-balance -a 0xADDRESS -t 0xTOKEN_CONTRACT      # ERC-20 balance
npx wooftrade@latest get-balance -a 0xADDRESS --all                    # all token balances
```

### `send`

Build and sign a transaction to send native tokens or ERC-20 tokens. Automatically fetches nonce, gas, and fee data.

```bash
npx wooftrade@latest send -k 0xKEY --to 0xRECIPIENT --amount 1.5 -t 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee        # send ETH
npx wooftrade@latest send -k 0xKEY --to 0xRECIPIENT --amount 100 -t 0xTOKEN_CONTRACT                                  # send ERC-20
npx wooftrade@latest send -k 0xKEY --to 0xRECIPIENT --amount 0.5 -t 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee -n bsc # send BNB
```

### `broadcast`

Broadcast a serialized signed transaction to the network.

```bash
npx wooftrade@latest broadcast -s 0xSERIALIZED_TX
npx wooftrade@latest broadcast -s 0xSERIALIZED_TX -n bsc
```

### `tx-status`

Check the status of a transaction by hash.

```bash
npx wooftrade@latest tx-status -h 0xTX_HASH
npx wooftrade@latest tx-status -h 0xTX_HASH -n bsc
```

### `swap`

Swap tokens via 1inch Fusion. Fusion orders are gasless, but token approval transactions require gas. Use `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee` for native tokens.

```bash
npx wooftrade@latest swap -k 0xKEY --from-token 0xFROM --to-token 0xTO --amount 1.5         # get quote
npx wooftrade@latest swap -k 0xKEY --from-token 0xFROM --to-token 0xTO --amount 1.5 -y      # auto-confirm
npx wooftrade@latest swap -k 0xKEY --from-token 0xFROM --to-token 0xTO --amount 0.5 -n bsc  # swap on BSC
```

### `swap-order-status`

Check the status of a 1inch Fusion swap order.

```bash
npx wooftrade@latest swap-order-status -k 0xKEY --order-hash 0xORDER_HASH
```

### `stock`

Get comprehensive stock data (profile, price, metrics, ratings, news, congress trades).

```bash
npx wooftrade@latest stock -s AAPL
```

### `price-chart`

Get historical price chart data for a stock.

```bash
npx wooftrade@latest price-chart -s AAPL
npx wooftrade@latest price-chart -s AAPL -p 3M    # 1W, 1M, 3M, 6M, YTD, 1YR, 5YR, All
```

### `market-indexes`

Get major market indexes (S&P 500, Dow, NASDAQ, VIX, etc.).

```bash
npx wooftrade@latest market-indexes
```

### `market-status`

Get RWA market open/close status.

```bash
npx wooftrade@latest market-status
```

### `earnings`

Get upcoming earnings calendar.

```bash
npx wooftrade@latest earnings
npx wooftrade@latest earnings -d 14    # look ahead 14 days
```

### `congress-members`

Get all current U.S. Congress members.

```bash
npx wooftrade@latest congress-members
```

### `congress-trades`

Get stock trades by a specific Congress member.

```bash
npx wooftrade@latest congress-trades --first-name Nancy --last-name Pelosi
```

### `news`

Get latest financial news headlines.

```bash
npx wooftrade@latest news
```

### `rwa-market`

Get Ondo Finance tokenized asset (RWA) market data.

```bash
npx wooftrade@latest rwa-market
npx wooftrade@latest rwa-market -s NVDA    # filter by symbol
```

### `submit-market-analysis`

Submit a signed market analysis for a stock.

```bash
npx wooftrade@latest submit-market-analysis -s AAPL -a "Detailed analysis text here..." --sentiment bullish
```

## Output Format

**Success** messages are written to `stdout`:

```
WOOFTRADE_OK: <description>
{ ... }
```

**Error** messages are written to `stderr`:

```
WOOFTRADE_ERR: <ERROR_CODE> — <description>
```

Error codes: `INVALID_INPUT`, `EXECUTION_FAILED`, `TIMEOUT`, `UNKNOWN`.

## Development

```bash
yarn build              # compile to dist/
yarn dev                # run from source
yarn test               # run tests
yarn format             # format with prettier
yarn format:check       # check formatting
yarn clean              # remove dist/
yarn version:update     # update version across all files
```

## Agent Integration

See [agents.md](agents.md) for the complete agent skill reference, including detailed option tables, output schemas, and integration guidelines.

## License

MIT
