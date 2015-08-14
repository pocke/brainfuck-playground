/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../src/parser.ts" />


describe('Parser', () => {
  describe('new', () => {
    context('when recieved invalid language', () => {
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

      it('should throw error', () => {
        try {
          const __ = new Brainfuck.Parser(lang);
        } catch (e){return; }
        throw new Error("Not throw error!");
      });
    });

    context('when received valid language', () => {
      it('should not throw error', () => {
        const __ = new Brainfuck.Parser(Brainfuck.DEFAULT_LANGUAGE);
      });
    });
  });

  describe('#parse', () => {
    const c = new Brainfuck.Parser(Brainfuck.DEFAULT_LANGUAGE);

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
          const tok = Brainfuck.Token.incPtr;
          assert.deepEqual(c.parse(">>>>>"), [tok, tok, tok, tok, tok]);
        });
      });

      context('a>b<c+d-e.f,g[h]i', () => {
        it('should eq', () => {
          assert.deepEqual(c.parse('a>b<c+d-e.f,g[h]i'), [
          Brainfuck.Token.incPtr, Brainfuck.Token.decPtr, Brainfuck.Token.incByte, Brainfuck.Token.decByte,
          Brainfuck.Token.output, Brainfuck.Token.input, Brainfuck.Token.jumpForward, Brainfuck.Token.jumpBack]);
        });
      });
    });
  });
});
