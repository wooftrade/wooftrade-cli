import { getAddress } from 'viem';

export interface ChecksumAddressInput {
  address: string;
}

export interface ChecksumAddressResult {
  address: string;
}

/**
 * Converts an Ethereum address to its ERC-55 checksum format.
 */
export function checksumAddress(
  input: ChecksumAddressInput,
): ChecksumAddressResult {
  if (!input.address || !input.address.startsWith('0x')) {
    throw new Error(
      'Invalid address. Must be a 0x-prefixed hex string (42 characters).',
    );
  }
  const checksummed = getAddress(input.address);
  return {
    address: checksummed,
  };
}
