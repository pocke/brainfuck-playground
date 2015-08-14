/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./language.ts" />

namespace Brainfuck {
  class Compiler {
    private program: Token[];

    constructor(program: string, private lang: Language = DEFAULT_LANGUAGE) {
      LanguageValidate(lang);
      this.program = [];
    }

    execute(input: number[]): number[] {
      const res: number[] = [];

      return res;
    }

    private compile(program: string) {
      let lang = LanguageToArray(this.lang);
      let tok = "";

      for (let i = 0; i < program.length; ++i) {
        tok += program.charAt(i);
        /* tslint:disable */
        var flagFinded = false;
        /* tslint:enable */
        lang.forEach((w) => {
          if (w === tok) {
            this.program.push(LanguageToken(this.lang, w));
            tok = "";
            flagFinded = true;
            return false;
          }
        });
        if (flagFinded) { continue; }

        if (_.every(lang, l => !_.startsWith(l, tok))) {
          tok = "";
        }
      }

      this.checkParen();
    }

    private checkParen(): void {
      let level = 0;
      this.program.forEach((tok) => {
        switch (tok) {
          case Token.jumpForward: level++; break;
          case Token.jumpBack:
            if (level === 0) {
              throw new Error("paren failed"); // TODO: msg
            }
            tok--;
            break;
        }
      });
      if (level !== 0) { throw new Error("paren failed"); }
    }
  }
}

