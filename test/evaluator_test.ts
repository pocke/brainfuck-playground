import * as mocha from "mocha";
import * as assert from "power-assert";

import Evaluator from "../src/evaluator";
import * as parser from "../src/parser";

describe('Evaluator', () => {
  describe('#eval', () => {
    context("hello world", () => {
      /* tslint:disable */
      const program = '+++++++++[>++++++++>+++++++++++>+++++<<<-]>.>++.+++++++..+++.>-.------------.<++++++++.--------.+++.------.--------.>+.';
      /* tslint:enable */
      it('should output hello world', () => {
        const p = new parser.Parser();
        const prog = p.parse(program);
        const e = new Evaluator(prog);
        const out = e.eval([]);

        assert(String.fromCharCode(...out) === 'Hello, world!');
      });
    });
  });
});
