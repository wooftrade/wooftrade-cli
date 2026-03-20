const WOOFTRADE_API_BASE = 'http://localhost:5175';

const FETCH_HEADERS = {
  'User-Agent': 'wooftrade/request',
  Accept: 'text/plain',
};

async function agentFetch(
  path: string,
  params?: Record<string, string>,
): Promise<string> {
  const url = new URL(path, WOOFTRADE_API_BASE);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v) url.searchParams.set(k, v);
    }
  }
  const res = await fetch(url.toString(), { headers: FETCH_HEADERS });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API error ${res.status}: ${body}`);
  }
  return res.text();
}

export async function getStock(opts: { symbol: string }) {
  if (!opts.symbol) throw new Error('Symbol is required');
  return agentFetch('/api/agent/stock', { symbol: opts.symbol.toUpperCase() });
}

export async function getPriceChart(opts: { symbol: string; period?: string }) {
  if (!opts.symbol) throw new Error('Symbol is required');
  const params: Record<string, string> = {
    symbol: opts.symbol.toUpperCase(),
  };
  if (opts.period) params.period = opts.period;
  return agentFetch('/api/agent/price-chart', params);
}

export async function getMarketIndexes() {
  return agentFetch('/api/agent/market-indexes');
}

export async function getMarketStatus() {
  return agentFetch('/api/agent/market-status');
}

export async function getEarnings(opts: { days?: string }) {
  const params: Record<string, string> = {};
  if (opts.days) params.days = opts.days;
  return agentFetch('/api/agent/earnings', params);
}

export async function getCongressMembers() {
  return agentFetch('/api/agent/congress-members');
}

export async function getCongressTrades(opts: {
  firstName: string;
  lastName: string;
}) {
  if (!opts.firstName || !opts.lastName)
    throw new Error('Both firstName and lastName are required');
  return agentFetch('/api/agent/congress-trades', {
    firstName: opts.firstName,
    lastName: opts.lastName,
  });
}

export async function getNews() {
  return agentFetch('/api/agent/news');
}

export async function getRwaMarket() {
  return agentFetch('/api/agent/rwa-market');
}

export async function submitTrade(opts: {
  orderHash: string;
  network: string;
  rationale?: string;
  isAgent?: boolean;
}) {
  if (!opts.orderHash) throw new Error('orderHash is required');
  if (!opts.network) throw new Error('network is required');
  const url = new URL('/api/submit-trade', WOOFTRADE_API_BASE);
  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      ...FETCH_HEADERS,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      orderHash: opts.orderHash,
      network: opts.network,
      ...(opts.rationale ? { rationale: opts.rationale } : {}),
      isAgent: opts.isAgent ?? true,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Submit trade API error ${res.status}: ${body}`);
  }
  return res.json();
}

export async function submitMarketAnalysis(opts: {
  payload: string;
  from: string;
  signature: string;
}) {
  const url = new URL('/api/agent/submit-market-analysis', WOOFTRADE_API_BASE);
  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      ...FETCH_HEADERS,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      payload: opts.payload,
      from: opts.from,
      signature: opts.signature,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Submit market analysis API error ${res.status}: ${body}`);
  }
  return res.text();
}
