const subject = require('../src/lib').compile;

describe('#compile', () => {
  describe('given a valid ink string', () => {
    it('returns the ink string as ink json', () => {
      const inkScript = 'Hello';
      const expectedStr = String.raw`{"inkVersion":19,"root":[["^Hello","\n",["done",{"#n":"g-0"}],null],"done",null],"listDefs":{}}`;
      const result = subject(inkScript).trim();

      expect(result).toEqual(expectedStr);
    });
  });
});
