const { addItem } = require('../add.js');

test('link', () => {
    expect(addItem()).toBe(true);
  });