import { client } from '../src/models/index';

describe('Test', () => {
  test('Test', async () => {
    expect(await client.checkIfIdIsUnique()).not.toBe('71113528129562526812');
  });
});
