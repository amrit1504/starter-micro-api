jest.mock('dns');

import { getMxRecords, isValidEmail } from './index';

describe('getMxRecords', () => {
  it('should return MX records when given email has a valid domain', async () => {
    const mxRecords = await getMxRecords('user@gmail.com');

    expect(Array.isArray(mxRecords)).toBe(true);
    expect(mxRecords.length).toBeGreaterThan(0);
  });

  it('should throw an error when MX records cannot be found for a given email domain', async () => {
    let error;

    try {
      await getMxRecords('user@example.com');
    } catch (err) {
      error = err;
    } finally {
      expect(error).toBeDefined();
    }
  });
});

describe('isValidEmail', () => {
  it(
    'should return true for email with a valid domain',
    async () => expect(await isValidEmail('user@gmail.com')).toBe(true)
  );

  it(
    'should return false for email with an invalid domain',
    async () => expect(await isValidEmail('user@example.com')).toBe(false)
  );
});
