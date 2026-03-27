# Transaction Commands

## `send`

Build and sign a transaction to send native tokens or ERC-20 tokens. Automatically fetches nonce, gas, and fee data from the network.

```bash
npx wooftrade@0.0.11 send -k 0xKEY --to 0xRECIPIENT --amount 1.5 -t 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
npx wooftrade@0.0.11 send -k 0xKEY --to 0xRECIPIENT --amount 100 -t 0xTOKEN_CONTRACT -n bsc
```

**Options**:

| Flag                      | Required | Description                                                                          |
| ------------------------- | -------- | ------------------------------------------------------------------------------------ |
| `-k, --private-key <key>` | No       | Private key. Falls back to `WOOFTRADE_PRIVATE_KEY`.                                  |
| `--to <address>`          | Yes      | Recipient address.                                                                   |
| `-t, --token <token>`     | Yes      | Token contract address. Use `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee` for native. |
| `--amount <amount>`       | Yes      | Amount in human-readable units (e.g. `"1.5"`).                                       |
| `-n, --network <network>` | No       | Network (default: `mainnet`).                                                        |
| `-b, --broadcast`         | No       | Automatically broadcast after signing.                                               |

**Output (stdout)**:

```json
{
  "from": "0x...",
  "to": "0x...",
  "token": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  "amount": "1.5",
  "network": "Ethereum",
  "serializedTransaction": "0x..."
}
```

---

## `broadcast`

Broadcast a serialized signed transaction to the network.

```bash
npx wooftrade@0.0.11 broadcast -s 0xSERIALIZED_TX
npx wooftrade@0.0.11 broadcast -s 0xSERIALIZED_TX -n bsc
```

**Options**:

| Flag                                 | Required | Description                                    |
| ------------------------------------ | -------- | ---------------------------------------------- |
| `-s, --serialized-transaction <hex>` | Yes      | Serialized signed transaction (`0x`-prefixed). |
| `-n, --network <network>`            | No       | Network (default: `mainnet`).                  |

**Output (stdout)**:

```json
{
  "transactionHash": "0x...",
  "network": "Ethereum",
  "explorerUrl": "https://etherscan.io/tx/0x..."
}
```

---

## `tx-status`

Get the status of a transaction by hash.

```bash
npx wooftrade@0.0.11 tx-status -h 0xTX_HASH
npx wooftrade@0.0.11 tx-status -h 0xTX_HASH -n bsc
```

**Options**:

| Flag                      | Required | Description                                 |
| ------------------------- | -------- | ------------------------------------------- |
| `-h, --hash <hash>`       | Yes      | Transaction hash (`0x`-prefixed, 32 bytes). |
| `-n, --network <network>` | No       | Network (default: `mainnet`).               |

**Output (stdout)**:

```json
{
  "transactionHash": "0x...",
  "status": "success",
  "network": "Ethereum",
  "blockNumber": "12345678",
  "from": "0x...",
  "to": "0x...",
  "gasUsed": "21000",
  "effectiveGasPrice": "30000000000",
  "explorerUrl": "https://etherscan.io/tx/0x..."
}
```

For pending transactions, `status` is `"pending"` and `blockNumber`, `from`, `to`, `gasUsed`, `effectiveGasPrice` will be `null`.
