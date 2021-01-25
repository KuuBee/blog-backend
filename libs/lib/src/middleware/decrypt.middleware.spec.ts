import { DecryptMiddleware } from './decrypt.middleware';

describe('DecryptMiddleware', () => {
  it('should be defined', () => {
    expect(new DecryptMiddleware()).toBeDefined();
  });
});
