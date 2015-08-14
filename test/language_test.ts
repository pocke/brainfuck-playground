/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../src/language.ts" />

describe('Language', () => {
  describe('#LanguageToArray', () => {
    it('should be eq', () => {
      const lang = Brainfuck.DEFAULT_LANGUAGE;
      assert.deepEqual(Brainfuck.LanguageToArray(lang), ['>', '<', '+', '-', '.', ',', '[', ']']);
    });
  });

  describe('#LnaguageValidate', () => {
    it('should not throw error', () => {
      Brainfuck.LanguageValidate(Brainfuck.DEFAULT_LANGUAGE);
    });

    it('should throw error', () => {
      const lang: Brainfuck.Language = {
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
        Brainfuck.LanguageValidate(lang);
      } catch (e) { return; }
      throw new Error('Not got error!');
    });

    it('should raise error', () => {
      const lang: Brainfuck.Language = {
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
        Brainfuck.LanguageValidate(lang);
      } catch (e) { return; }
      throw new Error('Not got error!');
    });
  });

  describe('#LanguageToken', () => {
    it('should be eq', () => {
      assert(Brainfuck.LanguageToken(Brainfuck.DEFAULT_LANGUAGE, '>') === Brainfuck.Token.incPtr);
      assert(Brainfuck.LanguageToken(Brainfuck.DEFAULT_LANGUAGE, '<') === Brainfuck.Token.decPtr);
      assert(Brainfuck.LanguageToken(Brainfuck.DEFAULT_LANGUAGE, '+') === Brainfuck.Token.incByte);
      assert(Brainfuck.LanguageToken(Brainfuck.DEFAULT_LANGUAGE, '-') === Brainfuck.Token.decByte);
      assert(Brainfuck.LanguageToken(Brainfuck.DEFAULT_LANGUAGE, '.') === Brainfuck.Token.output);
      assert(Brainfuck.LanguageToken(Brainfuck.DEFAULT_LANGUAGE, ',') === Brainfuck.Token.input);
      assert(Brainfuck.LanguageToken(Brainfuck.DEFAULT_LANGUAGE, '[') === Brainfuck.Token.jumpForward);
      assert(Brainfuck.LanguageToken(Brainfuck.DEFAULT_LANGUAGE, ']') === Brainfuck.Token.jumpBack);
    });
  });
});
