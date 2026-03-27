# Swap Commands (1inch Fusion)

## `swap`

Swap tokens via 1inch Fusion. Gets a quote first, then optionally submits the order. Use `-y` to skip confirmation and submit immediately.

```bash
npx wooftrade@0.0.10 swap -k 0xKEY --from-token 0xFROM --to-token 0xTO --amount 1.5
npx wooftrade@0.0.10 swap -k 0xKEY --from-token 0xFROM --to-token 0xTO --amount 1.5 -y
npx wooftrade@0.0.10 swap -k 0xKEY --from-token 0xFROM --to-token 0xTO --amount 0.5 -n bsc
```

Use `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee` for native tokens.

> **RWA Tokens**: When swapping tokenized real-world assets (RWA), use `npx wooftrade@0.0.10 rwa-market` first to look up the correct token contract address and verify the token is currently tradable before passing it to `--from-token` or `--to-token`.

**Options**:

| Flag                      | Required | Description                                         |
| ------------------------- | -------- | --------------------------------------------------- |
| `-k, --private-key <key>` | No       | Private key. Falls back to `WOOFTRADE_PRIVATE_KEY`. |
| `--from-token <address>`  | Yes      | Source token contract address.                      |
| `--to-token <address>`    | Yes      | Destination token contract address.                 |
| `--amount <amount>`       | Yes      | Amount in human-readable units (e.g. `"1.5"`).      |
| `-n, --network <network>` | No       | Network (default: `mainnet`).                       |
| `-y, --yes`               | No       | Skip confirmation prompt and submit immediately.    |

**Output (stdout)** — quote:

```json
{
  "from": "0x...",
  "fromToken": "0x...",
  "toToken": "0x...",
  "amount": "1.5",
  "estimatedReturn": "1500",
  "estimatedReturnMin": "1400",
  "estimatedReturnAvg": "1450",
  "network": "Ethereum"
}
```

**Output (stdout)** — order submission:

```json
{
  "from": "0x...",
  "fromToken": "0x...",
  "toToken": "0x...",
  "amount": "1.5",
  "estimatedReturn": "1500",
  "estimatedReturnMin": "1400",
  "estimatedReturnAvg": "1450",
  "network": "Ethereum",
  "orderHash": "0x...",
  "approvalTxHash": "0x..."
}
```

`approvalTxHash` is non-null only when an ERC-20 token approval was required. For native token swaps or already-approved tokens, it is `null`.

---

## `swap-order-status`

Get the status of a 1inch Fusion swap order by its order hash.

```bash
npx wooftrade@0.0.10 swap-order-status -k 0xKEY --order-hash 0xORDER_HASH
npx wooftrade@0.0.10 swap-order-status -k 0xKEY --order-hash 0xORDER_HASH -n bsc
```

**Options**:

| Flag                      | Required | Description                                         |
| ------------------------- | -------- | --------------------------------------------------- |
| `-k, --private-key <key>` | No       | Private key. Falls back to `WOOFTRADE_PRIVATE_KEY`. |
| `--order-hash <hash>`     | Yes      | Order hash returned from the `swap` command.        |
| `-n, --network <network>` | No       | Network (default: `mainnet`).                       |

**Output (stdout)**:

```json
{
  "orderHash": "0x...",
  "status": "filled",
  "network": "Ethereum",
  "createdAt": 1700000000,
  "duration": 180,
  "fills": [{ "txHash": "0x..." }],
  "cancelTx": null,
  "finalToAmount": "1500000000"
}
```

Possible `status` values: `"pending"`, `"filled"`, `"expired"`, `"cancelled"`. For pending/cancelled orders, `finalToAmount` is `null` and `fills` is empty.
