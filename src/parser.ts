/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./language.ts" />

namespace Brainfuck {
  export class Parser {
    constructor(private lang: Language = DEFAULT_LANGUAGE) {
      LanguageValidate(lang);
    }

    parse(programStr: string): Token[] {
      let program: Token[] = [];
      let lang = LanguageToArray(this.lang);
      let tok = "";

      for (let i = 0; i < programStr.length; ++i) {
        tok += programStr.charAt(i);
        /* tslint:disable */
        var flagFinded = false;
        /* tslint:enable */
        lang.forEach((w) => {
          if (w === tok) {
            program.push(LanguageToken(this.lang, w));
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

      this.checkParen(program);
      return program;
    }

    private checkParen(program: Token[]): void {
      let level = 0;
      program.forEach((tok) => {
        switch (tok) {
          case Token.jumpForward: level++; break;
          case Token.jumpBack:
            if (level === 0) {
              throw new Error("paren failed!!!"); // TODO: msg
            }
            level--;
            break;
        }
      });
      if (level !== 0) { throw new Error("paren failed"); }
    }
  }
}

