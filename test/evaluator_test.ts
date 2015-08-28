import * as mocha from "mocha";
import * as assert from "power-assert";

import Evaluator from "../src/evaluator";
import * as parser from "../src/parser";

describe('Evaluator', () => {
  describe('#eval', () => {
    context("hello world", () => {
      const program = '+++++++++[>++++++++>+++++++++++>+++++<<<-]>.>++.+++++++..+++.>-.------------.<++++++++.--------.+++.------.--------.>+.';

      it('should output hello world', () => {
        const p = new parser.Parser();
        const prog = p.parse(program);
        const e = new Evaluator(prog, []);
        const out = e.eval();

        assert(String.fromCharCode(...out) === 'Hello, world!');
      });
    });

    context('input and output', () => {
      const program = ',+.';

      it('should work', () => {
        const p = new parser.Parser();
        const prog = p.parse(program);
        const e = new Evaluator(prog, [65]);
        assert.deepEqual(e.eval(), [66]);
      });
    });

    context('when timeout', () => {
      const program = '+[.]'; // infinite loop

      it('should throw an error', () => {
        const p = new parser.Parser();
        const prog = p.parse(program);
        const e = new Evaluator(prog, []);
        assert.throws(() => { e.eval(); });
      });
    });
  });
});
