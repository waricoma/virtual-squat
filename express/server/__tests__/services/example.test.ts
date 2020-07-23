import { exampleFun } from '../../api/services/example';

test('exampleFun will return number', () => {
  expect(exampleFun()).toBeGreaterThan(0);
});
