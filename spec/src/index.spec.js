/* eslint-disable operator-linebreak */
const { compile: subject } = require('../../src');

describe('#compile', () => {
  describe('given a single-line ink string', () => {
    it('returns the ink string as ink json', () => {
      const inkScript = 'Hello';
      const expectedStr = String.raw`{"inkVersion":19,"root":[["^Hello","\n",["done",{"#n":"g-0"}],null],"done",null],"listDefs":{}}`;
      const result = subject(inkScript).trim();

      expect(result).toEqual(expectedStr);
    });
  });

  describe('given a multi-line ink string', () => {
    it('returns the ink string as ink json', () => {
      const inkScript =
`Hello, this is a test.
-> test_menu

== test_menu

BOT: What's the plan?

+ [Test gadgets] -> test_gadgets

== test_gadgets

BOT: OK, testing gadgets

->END`;
      const expectedStr = String.raw`{"inkVersion":19,"root":[["^Hello, this is a test.","\n",{"->":"test_menu"},["done",{"#n":"g-0"}],null],"done",{"test_menu":[["^BOT: What's the plan?","\n","ev","str","^Test gadgets","/str","/ev",{"*":".^.c-0","flg":4},{"c-0":["^ ",{"->":"test_gadgets"},"\n",null]}],null],"test_gadgets":["^BOT: OK, testing gadgets","\n","end",null]}],"listDefs":{}}`;
      const result = subject(inkScript).trim();

      expect(result).toEqual(expectedStr);
    });
  });
});
