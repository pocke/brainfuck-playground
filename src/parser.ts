/// <reference path="../typings/tsd.d.ts" />

import * as la from './language';

import * as _ from 'lodash';

export class ParseError implements Error {
  public name: string;

  constructor(public message: string) {
    this.name = 'ParseError';
  }
}

export class Parser {
  constructor(private lang: la.Language = la.DEFAULT_LANGUAGE) {
    la.LanguageValidate(this.lang);
  }

  parse(programStr: string): la.Token[] {
    let program: la.Token[] = [];
    let lang = la.LanguageToArray(this.lang);
    let tok = "";

    for (let i = 0; i < programStr.length; ++i) {
      tok += programStr.charAt(i);
      /* tslint:disable */
      var flagFinded = false;
      /* tslint:enable */
      lang.forEach((w) => {
        if (w === tok) {
          program.push(la.LanguageToken(this.lang, w));
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

  private checkParen(program: la.Token[]): void {
    let level = 0;
    program.forEach((tok) => {
      switch (tok) {
        case la.Token.jumpForward: level++; break;
        case la.Token.jumpBack:
          if (level === 0) {
            throw new ParseError("paren failed!!!"); // TODO: msg
          }
          level--;
          break;
      }
    });
    if (level !== 0) { throw new ParseError("paren failed"); }
  }
}
