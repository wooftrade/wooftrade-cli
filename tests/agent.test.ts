import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getStock,
  getPriceChart,
  getMarketIndexes,
  getMarketStatus,
  getEarnings,
  getCongressMembers,
  getCongressTrades,
  getNews,
  getRwaMarket,
  submitTrade,
  submitMarketAnalysis,
} from '../src/commands/agent';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

function okResponse(body: string) {
  return new Response(body, { status: 200 });
}

function jsonResponse(data: unknown) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

function errorResponse(status: number, body: string) {
  return new Response(body, { status });
}

beforeEach(() => {
  mockFetch.mockReset();
});

describe('getStock', () => {
  it('should fetch stock data for a valid symbol', async () => {
    mockFetch.mockResolvedValueOnce(okResponse('AAPL stock data'));
    const result = await getStock({ symbol: 'AAPL' });
    expect(result).toBe('AAPL stock data');
    expect(mockFetch).toHaveBeenCalledOnce();
    const url = new URL(mockFetch.mock.calls[0][0]);
    expect(url.pathname).toBe('/api/agent/stock');
    expect(url.searchParams.get('symbol')).toBe('AAPL');
  });

  it('should uppercase the symbol', async () => {
    mockFetch.mockResolvedValueOnce(okResponse('data'));
    await getStock({ symbol: 'aapl' });
    const url = new URL(mockFetch.mock.calls[0][0]);
    expect(url.searchParams.get('symbol')).toBe('AAPL');
  });

  it('should throw if symbol is empty', async () => {
    await expect(getStock({ symbol: '' })).rejects.toThrow(
      'Symbol is required',
    );
  });

  it('should throw on API error', async () => {
    mockFetch.mockResolvedValueOnce(errorResponse(500, 'Internal error'));
    await expect(getStock({ symbol: 'AAPL' })).rejects.toThrow('API error 500');
  });
});

describe('getPriceChart', () => {
  it('should fetch price chart with default period', async () => {
    mockFetch.mockResolvedValueOnce(okResponse('chart data'));
    const result = await getPriceChart({ symbol: 'AAPL' });
    expect(result).toBe('chart data');
    const url = new URL(mockFetch.mock.calls[0][0]);
    expect(url.pathname).toBe('/api/agent/price-chart');
    expect(url.searchParams.get('symbol')).toBe('AAPL');
    expect(url.searchParams.has('period')).toBe(false);
  });

  it('should pass period when provided', async () => {
    mockFetch.mockResolvedValueOnce(okResponse('chart data'));
    await getPriceChart({ symbol: 'AAPL', period: '3M' });
    const url = new URL(mockFetch.mock.calls[0][0]);
    expect(url.searchParams.get('period')).toBe('3M');
  });

  it('should throw if symbol is empty', async () => {
    await expect(getPriceChart({ symbol: '' })).rejects.toThrow(
      'Symbol is required',
    );
  });
});

describe('getMarketIndexes', () => {
  it('should fetch market indexes', async () => {
    mockFetch.mockResolvedValueOnce(okResponse('index data'));
    const result = await getMarketIndexes();
    expect(result).toBe('index data');
    const url = new URL(mockFetch.mock.calls[0][0]);
    expect(url.pathname).toBe('/api/agent/market-indexes');
  });

  it('should throw on API error', async () => {
    mockFetch.mockResolvedValueOnce(errorResponse(503, 'unavailable'));
    await expect(getMarketIndexes()).rejects.toThrow('API error 503');
  });
});

describe('getMarketStatus', () => {
  it('should fetch market status', async () => {
    mockFetch.mockResolvedValueOnce(okResponse('market open'));
    const result = await getMarketStatus();
    expect(result).toBe('market open');
    const url = new URL(mockFetch.mock.calls[0][0]);
    expect(url.pathname).toBe('/api/agent/market-status');
  });
});

describe('getEarnings', () => {
  it('should fetch earnings with no days param', async () => {
    mockFetch.mockResolvedValueOnce(okResponse('earnings data'));
    const result = await getEarnings({});
    expect(result).toBe('earnings data');
    const url = new URL(mockFetch.mock.calls[0][0]);
    expect(url.pathname).toBe('/api/agent/earnings');
    expect(url.searchParams.has('days')).toBe(false);
  });

  it('should pass days param when provided', async () => {
    mockFetch.mockResolvedValueOnce(okResponse('earnings data'));
    await getEarnings({ days: '14' });
    const url = new URL(mockFetch.mock.calls[0][0]);
    expect(url.searchParams.get('days')).toBe('14');
  });
});

describe('getCongressMembers', () => {
  it('should fetch congress members', async () => {
    mockFetch.mockResolvedValueOnce(okResponse('members list'));
    const result = await getCongressMembers();
    expect(result).toBe('members list');
    const url = new URL(mockFetch.mock.calls[0][0]);
    expect(url.pathname).toBe('/api/agent/congress-members');
  });
});

describe('getCongressTrades', () => {
  it('should fetch trades for a congress member', async () => {
    mockFetch.mockResolvedValueOnce(okResponse('trades data'));
    const result = await getCongressTrades({
      firstName: 'Nancy',
      lastName: 'Pelosi',
    });
    expect(result).toBe('trades data');
    const url = new URL(mockFetch.mock.calls[0][0]);
    expect(url.pathname).toBe('/api/agent/congress-trades');
    expect(url.searchParams.get('firstName')).toBe('Nancy');
    expect(url.searchParams.get('lastName')).toBe('Pelosi');
  });

  it('should throw if firstName is missing', async () => {
    await expect(
      getCongressTrades({ firstName: '', lastName: 'Pelosi' }),
    ).rejects.toThrow('Both firstName and lastName are required');
  });

  it('should throw if lastName is missing', async () => {
    await expect(
      getCongressTrades({ firstName: 'Nancy', lastName: '' }),
    ).rejects.toThrow('Both firstName and lastName are required');
  });
});

describe('getNews', () => {
  it('should fetch news', async () => {
    mockFetch.mockResolvedValueOnce(okResponse('news headlines'));
    const result = await getNews();
    expect(result).toBe('news headlines');
    const url = new URL(mockFetch.mock.calls[0][0]);
    expect(url.pathname).toBe('/api/agent/news');
  });
});

describe('getRwaMarket', () => {
  it('should fetch RWA market data', async () => {
    mockFetch.mockResolvedValueOnce(okResponse('rwa data'));
    const result = await getRwaMarket();
    expect(result).toBe('rwa data');
    const url = new URL(mockFetch.mock.calls[0][0]);
    expect(url.pathname).toBe('/api/agent/rwa-market');
  });
});

describe('submitTrade', () => {
  it('should submit a trade', async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ success: true }));
    const result = await submitTrade({
      orderHash: '0xabc',
      network: 'eth',
    });
    expect(result).toEqual({ success: true });
    expect(mockFetch).toHaveBeenCalledOnce();
    const [url, init] = mockFetch.mock.calls[0];
    expect(new URL(url).pathname).toBe('/api/submit-trade');
    expect(init.method).toBe('POST');
    const body = JSON.parse(init.body);
    expect(body.orderHash).toBe('0xabc');
    expect(body.network).toBe('eth');
    expect(body.isAgent).toBe(true);
  });

  it('should include rationale when provided', async () => {
    mockFetch.mockResolvedValueOnce(jsonResponse({ success: true }));
    await submitTrade({
      orderHash: '0xabc',
      network: 'eth',
      rationale: 'bullish on ETH',
    });
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.rationale).toBe('bullish on ETH');
  });

  it('should throw if orderHash is missing', async () => {
    await expect(
      submitTrade({ orderHash: '', network: 'eth' }),
    ).rejects.toThrow('orderHash is required');
  });

  it('should throw if network is missing', async () => {
    await expect(
      submitTrade({ orderHash: '0xabc', network: '' }),
    ).rejects.toThrow('network is required');
  });

  it('should throw on API error', async () => {
    mockFetch.mockResolvedValueOnce(errorResponse(400, 'bad request'));
    await expect(
      submitTrade({ orderHash: '0xabc', network: 'eth' }),
    ).rejects.toThrow('Submit trade API error 400');
  });
});

describe('submitMarketAnalysis', () => {
  it('should submit a market analysis', async () => {
    mockFetch.mockResolvedValueOnce(okResponse('analysis submitted'));
    const result = await submitMarketAnalysis({
      payload: '{"ticker":"AAPL","analysis":"test","sentiment":"bullish"}',
      from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      signature: '0xsig',
    });
    expect(result).toBe('analysis submitted');
    const [url, init] = mockFetch.mock.calls[0];
    expect(new URL(url).pathname).toBe('/api/agent/submit-market-analysis');
    expect(init.method).toBe('POST');
    const body = JSON.parse(init.body);
    expect(body.from).toBe('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
    expect(body.signature).toBe('0xsig');
  });

  it('should throw on API error', async () => {
    mockFetch.mockResolvedValueOnce(errorResponse(422, 'invalid'));
    await expect(
      submitMarketAnalysis({
        payload: '{}',
        from: '0x123',
        signature: '0xsig',
      }),
    ).rejects.toThrow('Submit market analysis API error 422');
  });
});
