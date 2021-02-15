const subject = require('../src/lib').compile;

describe('#compile', () => {
  describe('given a valid ink string', () => {
    it('converts the ink to to ink json', () => {
      const inkScript = `Hello`;
      const expectedJson = `{"inkVersion":19,"root":[["^Hello","\n",["done",{"#n":"g-0"}],null],"done",null],"listDefs":{}}`;

      expect(subject(inkScript)).toEqual(expectedJson);
    })
  })
});
