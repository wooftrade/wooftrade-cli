# Wallet & Balance Commands

## `gen-wallet`

Generate a new random wallet (private key and address).

```bash
npx wooftrade@0.0.10 gen-wallet
```

**Options**: None.

**Output (stdout)**:

```json
{
  "address": "0x...",
  "privateKey": "0x..."
}
```

Usage instructions are printed to `stderr`.

**After generating a wallet**, save the private key to the skill's `.env` file as `WOOFTRADE_PRIVATE_KEY` so it is available for subsequent commands:

```bash
echo "WOOFTRADE_PRIVATE_KEY=0x..." >> .env
```

Then verify the key is correctly saved by running `who-am-i` without the `-k` flag — it should resolve to the expected address:

```bash
npx wooftrade@0.0.10 who-am-i
```

> **⚠️ OWNER RESPONSIBILITY**: Protecting this private key is **entirely your responsibility**. A leaked key grants full, irrevocable control over all funds in the wallet. Use the most up-to-date agentic private key protection mechanisms available to you (e.g. encrypted secret storage, environment variable vaults, OS keychain integration). **Never** store the key in plain text files committed to version control, chat logs, or shared environments.

---

## `who-am-i`

Return the Ethereum address derived from a private key.

```bash
npx wooftrade@0.0.10 who-am-i -k 0xKEY
# or
WOOFTRADE_PRIVATE_KEY=0xKEY npx wooftrade@0.0.10 who-am-i
```

**Options**:

| Flag                      | Required | Description                                         |
| ------------------------- | -------- | --------------------------------------------------- |
| `-k, --private-key <key>` | No       | Private key. Falls back to `WOOFTRADE_PRIVATE_KEY`. |

**Output (stdout)**:

```json
{
  "address": "0x..."
}
```

---

## `get-balance`

Get native or ERC-20 token balances.

```bash
npx wooftrade@0.0.10 get-balance -a 0xADDRESS
npx wooftrade@0.0.10 get-balance -a 0xADDRESS -n bsc
npx wooftrade@0.0.10 get-balance -a 0xADDRESS -t 0xTOKEN_CONTRACT
npx wooftrade@0.0.10 get-balance -a 0xADDRESS --all
```

**Options**:

| Flag                      | Required | Description                                                                             |
| ------------------------- | -------- | --------------------------------------------------------------------------------------- |
| `-a, --address <address>` | No       | Wallet address. Falls back to address derived from `WOOFTRADE_PRIVATE_KEY`.             |
| `-n, --network <network>` | No       | Network (default: `mainnet`).                                                           |
| `-t, --token <token>`     | No       | Token contract address. Default: `0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee` (native). |
| `--all`                   | No       | Return all token balances (native + ERC-20). `-t` is ignored when set.                  |

**Output (stdout)** — single token:

```json
{
  "address": "0x...",
  "network": "Ethereum",
  "token": "ETH",
  "balance": "1.5",
  "rawBalance": "1500000000000000000",
  "decimals": 18,
  "contract": null
}
```

With `--all`, returns an array of balance objects.
