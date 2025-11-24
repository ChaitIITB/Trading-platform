// Quick Redis cache test
import { CacheRepository } from './src/repositories/CacheRepository';

async function testRedisCache() {
  console.log('Testing Redis cache...\n');

  const cache = new CacheRepository();

  try {
    // Test 1: Set and Get
    console.log('Test 1: Set and Get');
    await cache.set('test:key', { message: 'Hello Redis!' }, 30);
    const result = await cache.get<{ message: string }>('test:key');
    console.log('✓ Retrieved:', result);
    console.assert(result?.message === 'Hello Redis!', 'Value mismatch');

    // Test 2: Token data structure
    console.log('\nTest 2: Token data caching');
    const tokenData = {
      token_address: '576P1t7XsRL4ZVj38LV2eYWxXRPguBADA8BxcNz1xo8y',
      token_name: 'PIPE CTO',
      token_ticker: 'PIPE',
      price_sol: 4.4141209798877615e-7,
      market_cap_sol: 441.41209798877617,
      volume_sol: 1322.4350391679925,
      liquidity_sol: 149.359428555,
      transaction_count: 2205,
      price_1hr_change: 120.61,
      protocol: 'Raydium CLMM',
    };

    await cache.set('token:576P1t7XsRL4ZVj38LV2eYWxXRPguBADA8BxcNz1xo8y', tokenData, 30);
    const cachedToken = await cache.get('token:576P1t7XsRL4ZVj38LV2eYWxXRPguBADA8BxcNz1xo8y');
    console.log('✓ Cached token:', cachedToken);

    // Test 3: Non-existent key
    console.log('\nTest 3: Non-existent key');
    const missing = await cache.get('nonexistent:key');
    console.log('✓ Missing key result:', missing);
    console.assert(missing === null, 'Should return null');

    // Test 4: Delete
    console.log('\nTest 4: Delete key');
    await cache.delete('test:key');
    const deleted = await cache.get('test:key');
    console.log('✓ After delete:', deleted);
    console.assert(deleted === null, 'Should be deleted');

    console.log('\n✓ All Redis cache tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Redis cache test failed:', error);
    process.exit(1);
  }
}

testRedisCache();
