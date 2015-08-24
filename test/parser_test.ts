import * as mocha from "mocha";
import * as assert from "power-assert";

import * as la from "../src/language";
import * as parser from "../src/parser";


describe('Parser', () => {
  describe('new', () => {
    context('when recieved invalid language', () => {
      const lang: la.Language = {
        incPtr: 'a',
        decPtr: 'b',
        incByte: 'c',
        decByte: 'd',
        output: 'e',
        input: 'f',
        jumpForward: 'g',
        jumpBack: 'a',
      };

      it('should throw error', () => {
        try {
          const __ = new parser.Parser(lang);
        } catch (e){return; }
        throw new Error("Not throw error!");
      });
    });

    context('when received valid language', () => {
      it('should not throw error', () => {
        const __ = new parser.Parser(la.DEFAULT_LANGUAGE);
      });
    });
  });

  describe('#parse', () => {
    const c = new parser.Parser(la.DEFAULT_LANGUAGE);

    context('when received invalid program', () => {
      it('should raise error', () => {
        try {
          c.parse('[[]]]');
        } catch (e){return; }
        throw new Error("Not throw error!");
      });
    });

    context('when received valid program', () => {
      context('>>>>>', () => {
        it('should eq', () => {
          const tok = la.Token.incPtr;
          assert.deepEqual(c.parse(">>>>>"), [tok, tok, tok, tok, tok]);
        });
      });

      context('a>b<c+d-e.f,g[h]i', () => {
        it('should eq', () => {
          assert.deepEqual(c.parse('a>b<c+d-e.f,g[h]i'), [
          la.Token.incPtr, la.Token.decPtr, la.Token.incByte, la.Token.decByte,
          la.Token.output, la.Token.input, la.Token.jumpForward, la.Token.jumpBack]);
        });
      });
    });
  });
});
