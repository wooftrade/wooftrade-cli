import { describe, it, expect } from 'vitest';
import { checksumAddress } from '../src/commands/checksum-address';

describe('checksum-address', () => {
  it('should convert a lowercase address to checksum format', () => {
    const result = checksumAddress({
      address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    });
    expect(result.address).toBe('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
  });

  it('should return the same address if already checksummed', () => {
    const result = checksumAddress({
      address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    });
    expect(result.address).toBe('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
  });

  it('should convert an uppercase address to checksum format', () => {
    const result = checksumAddress({
      address: '0xF39FD6E51AAD88F6F4CE6AB8827279CFFFB92266',
    });
    expect(result.address).toBe('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
  });

  it('should throw for an address without 0x prefix', () => {
    expect(() =>
      checksumAddress({ address: 'f39fd6e51aad88f6f4ce6ab8827279cfffb92266' }),
    ).toThrow('Invalid address');
  });

  it('should throw for an empty address', () => {
    expect(() => checksumAddress({ address: '' })).toThrow('Invalid address');
  });

  it('should throw for an invalid hex address', () => {
    expect(() => checksumAddress({ address: '0xinvalid' })).toThrow();
  });
});
