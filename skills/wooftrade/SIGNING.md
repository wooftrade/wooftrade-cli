# Signing Commands

## `sign-message`

Sign a message using EIP-191 personal sign.

```bash
npx wooftrade@0.0.12 sign-message -k 0xKEY -m "Hello World"
npx wooftrade@0.0.12 sign-message -k 0xKEY -m 0x68656c6c6f --raw
```

**Options**:

| Flag                      | Required | Description                                         |
| ------------------------- | -------- | --------------------------------------------------- |
| `-k, --private-key <key>` | No       | Private key. Falls back to `WOOFTRADE_PRIVATE_KEY`. |
| `-m, --message <message>` | Yes      | The message to sign.                                |
| `-r, --raw`               | No       | Treat message as raw hex data (`0x`-prefixed).      |

**Output (stdout)**:

```json
{
  "address": "0x...",
  "message": "<original message>",
  "signature": "0x..."
}
```

---

## `sign`

> **⚠️ CRITICAL SECURITY WARNING**: Signs a raw hash (secp256k1) without any prefix. The resulting signature can authorize any on-chain action. **Use `sign-message` instead unless raw hash signing is explicitly required.** Before using, verify the hash is legitimate and no safer alternative exists.

```bash
npx wooftrade@0.0.12 sign -k 0xKEY -h 0xHASH
```

**Options**:

| Flag                      | Required | Description                                         |
| ------------------------- | -------- | --------------------------------------------------- |
| `-k, --private-key <key>` | No       | Private key. Falls back to `WOOFTRADE_PRIVATE_KEY`. |
| `-h, --hash <hash>`       | Yes      | The hash to sign (`0x`-prefixed hex string).        |

**Output (stdout)**:

```json
{
  "address": "0x...",
  "hash": "0x...",
  "signature": "0x..."
}
```

---

## `sign-typed-data`

Sign EIP-712 typed data.

```bash
npx wooftrade@0.0.12 sign-typed-data -k 0xKEY -d '<json>'
```

**Options**:

| Flag                      | Required | Description                                                                  |
| ------------------------- | -------- | ---------------------------------------------------------------------------- |
| `-k, --private-key <key>` | No       | Private key. Falls back to `WOOFTRADE_PRIVATE_KEY`.                          |
| `-d, --data <json>`       | Yes      | EIP-712 typed data as JSON with `domain`, `types`, `primaryType`, `message`. |

**Data Format**:

```json
{
  "domain": {
    "name": "AppName",
    "version": "1",
    "chainId": 1,
    "verifyingContract": "0x..."
  },
  "types": { "TypeName": [{ "name": "fieldName", "type": "fieldType" }] },
  "primaryType": "TypeName",
  "message": { "fieldName": "value" }
}
```

**Output (stdout)**:

```json
{
  "address": "0x...",
  "signature": "0x..."
}
```

---

## `sign-transaction`

Sign a transaction (legacy, EIP-2930, or EIP-1559). Returns a serialized signed transaction ready to broadcast.

```bash
npx wooftrade@0.0.12 sign-transaction -k 0xKEY -t '<json>'
```

**Options**:

| Flag                       | Required | Description                                         |
| -------------------------- | -------- | --------------------------------------------------- |
| `-k, --private-key <key>`  | No       | Private key. Falls back to `WOOFTRADE_PRIVATE_KEY`. |
| `-t, --transaction <json>` | Yes      | Transaction object as JSON string.                  |

**Transaction Formats**:

Legacy:

```json
{
  "to": "0x...",
  "value": "1000000000000000000",
  "gasPrice": "20000000000",
  "gas": "21000",
  "nonce": 0,
  "chainId": 1
}
```

EIP-1559:

```json
{
  "to": "0x...",
  "value": "1000000000000000000",
  "maxFeePerGas": "30000000000",
  "maxPriorityFeePerGas": "1000000000",
  "gas": "21000",
  "nonce": 0,
  "chainId": 1
}
```

Omit `to` for contract deployment. Numeric values can be strings or numbers.

**Output (stdout)**:

```json
{
  "address": "0x...",
  "serializedTransaction": "0x..."
}
```
