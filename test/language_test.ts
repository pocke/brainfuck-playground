import * as mocha from "mocha";
import * as assert from "power-assert";

import * as la from "../src/language";


describe('Language', () => {
  describe('#LanguageToArray', () => {
    it('should be eq', () => {
      const lang = la.DEFAULT_LANGUAGE;
      assert.deepEqual(la.LanguageToArray(lang), ['>', '<', '+', '-', '.', ',', '[', ']']);
    });
  });

  describe('#LnaguageValidate', () => {
    it('should not throw error', () => {
      la.LanguageValidate(la.DEFAULT_LANGUAGE);
    });

    it('should throw error', () => {
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
      try {
        la.LanguageValidate(lang);
      } catch (e) { return; }
      throw new Error('Not got error!');
    });

    it('should raise error', () => {
      const lang: la.Language = {
        incPtr: 'a',
        decPtr: 'b',
        incByte: 'c',
        decByte: 'd',
        output: 'e',
        input: 'f',
        jumpForward: 'g',
        jumpBack: 'aaa',
      };
      try {
        la.LanguageValidate(lang);
      } catch (e) { return; }
      throw new Error('Not got error!');
    });
  });

  describe('#LanguageToken', () => {
    it('should be eq', () => {
      assert(la.LanguageToken(la.DEFAULT_LANGUAGE, '>') === la.Token.incPtr);
      assert(la.LanguageToken(la.DEFAULT_LANGUAGE, '<') === la.Token.decPtr);
      assert(la.LanguageToken(la.DEFAULT_LANGUAGE, '+') === la.Token.incByte);
      assert(la.LanguageToken(la.DEFAULT_LANGUAGE, '-') === la.Token.decByte);
      assert(la.LanguageToken(la.DEFAULT_LANGUAGE, '.') === la.Token.output);
      assert(la.LanguageToken(la.DEFAULT_LANGUAGE, ',') === la.Token.input);
      assert(la.LanguageToken(la.DEFAULT_LANGUAGE, '[') === la.Token.jumpForward);
      assert(la.LanguageToken(la.DEFAULT_LANGUAGE, ']') === la.Token.jumpBack);
    });
  });
});
