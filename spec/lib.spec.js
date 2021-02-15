const subject = require('../src/lib').compile;

describe('#compile', () => {
  describe('given a valid ink string', () => {
    it('converts the ink to to ink json', () => {
      const inkScript = '';

      expect(subject(inkScript)).toEqual('{}');
    })
  })
});
