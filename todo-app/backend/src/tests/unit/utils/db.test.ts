import connectDB from '../../../utils/db';

describe('Database Connection', () => {
  it('should export a connectDB function', () => {
    expect(connectDB).toBeDefined();
    expect(typeof connectDB).toBe('function');
  });
}); 