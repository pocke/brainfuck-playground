/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../src/parser.ts" />
/// <reference path="../src/evaluator.ts" />

describe('Evaluator', () => {
  describe('#eval', () => {
    context("hello world", () => {
      /* tslint:disable */
      const program = '+++++++++[>++++++++>+++++++++++>+++++<<<-]>.>++.+++++++..+++.>-.------------.<++++++++.--------.+++.------.--------.>+.';
      /* tslint:enable */
      it('should output hello world', () => {
        const p = new Brainfuck.Parser();
        const prog = p.parse(program);
        const e = new Brainfuck.Evaluator(prog);
        const out = e.eval([]);

        assert(String.fromCharCode(...out) === 'Hello, world!');
      });
    });
  });
});
