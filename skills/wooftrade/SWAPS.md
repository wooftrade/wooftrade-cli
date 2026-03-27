# Swap Commands (1inch Fusion)

## `swap`

Swap tokens via 1inch Fusion. Gets a quote first, then optionally submits the order. Use `-y` to skip confirmation and submit immediately.

> **⛽ GAS & FEES**
>
> 1inch Fusion orders are **gasless** — the swap itself does not require gas from the user. However, if the source token has not been previously approved, an **approval transaction** will be sent first, which **does require gas** (native token for fees).
>
> **Be mindful of Fusion fees.** The estimated return already accounts for resolver fees and slippage. If you swap \$10 worth of tokens, you will receive **less than \$10** in the destination token (i.e. \$10 minus fees). Factor this into your trading thesis — small swaps may lose a disproportionate percentage to fees.

```bash
npx wooftrade@0.0.11 swap -k 0xKEY --from-token 0xFROM --to-token 0xTO --amount 1.5
npx wooftrade@0.0.11 swap -k 0xKEY --from-token 0xFROM --to-token 0xTO --amount 1.5 -y
npx wooftrade@0.0.11 swap -k 0xKEY --from-token 0xFROM --to-token 0xTO --amount 0.5 -n bsc
```

Use `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee` for native tokens.

> **RWA Tokens**: When swapping tokenized real-world assets (RWA), use `npx wooftrade@0.0.11 rwa-market` first to look up the correct token contract address and verify the token is currently tradable before passing it to `--from-token` or `--to-token`.

**Options**:

| Flag                      | Required | Description                                                        |
| ------------------------- | -------- | ------------------------------------------------------------------ |
| `-k, --private-key <key>` | No       | Private key. Falls back to `WOOFTRADE_PRIVATE_KEY`.                |
| `--from-token <address>`  | Yes      | Source token contract address.                                     |
| `--to-token <address>`    | Yes      | Destination token contract address.                                |
| `--amount <amount>`       | Yes      | Amount in human-readable units (e.g. `"1.5"`).                     |
| `-n, --network <network>` | No       | Network (default: `mainnet`).                                      |
| `-y, --yes`               | No       | Skip confirmation prompt and submit immediately.                   |
| `--rationale <text>`      | No       | Trading rationale (100-1000 chars, highly recommended for agents). |

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
```

> **Note**: `orderHash` is **not** a transaction hash — it is a 1inch Fusion order identifier. It cannot be used with `tx-status` or looked up on a block explorer. Use it exclusively with the `swap-order-status` command to track the order's progress.

`approvalTxHash` is non-null only when an ERC-20 token approval was required. For native token swaps or already-approved tokens, it is `null`.

---

## `swap-order-status`

Get the status of a 1inch Fusion swap order by its order hash.

```bash
npx wooftrade@0.0.11 swap-order-status -k 0xKEY --order-hash 0xORDER_HASH
npx wooftrade@0.0.11 swap-order-status -k 0xKEY --order-hash 0xORDER_HASH -n bsc
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
