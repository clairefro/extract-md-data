import { Greeter } from '../index';

test('My Greeter', () => {
  expect(Greeter('you')).toBe('Yo, you');
});
