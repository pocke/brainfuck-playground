/// <reference path="../typings/tsd.d.ts" />

import * as _ from 'lodash';

export interface Language {
  incPtr:      string; // >
  decPtr:      string; // <
  incByte:     string; // +
  decByte:     string; // -
  output:      string; // .
  input:       string; // ,
  jumpForward: string; // [
  jumpBack:    string; // ]
}

export class InvalidLanguage implements Error {
  public name: string;

  constructor(public message: string) {
    this.name = 'InvalidLanguage';
  }
}

export function LanguageToArray(lang: Language): string[] {
  const res: string[] = [];
  _.forEach(lang, (v: string) => {
    res.push(v);
  });
  return res;
}

export function LanguageValidate(lang: Language): void {
  const values = LanguageToArray(lang);

  values.forEach((x, i) => {
    values.forEach((y, j) => {
      if (i === j) { return; }

      if (_.startsWith(x, y)) {
        throw new InvalidLanguage(`${x} starts with ${y}`);
      }
    });
  });
}

export function LanguageToken(lang: Language, str: string): Token {
  const l = <{[key: string]: string}>(<any>lang);
  let res: Token = undefined;

  _.forEach(l, (v, key) => {
    if (v === str) {
      switch (key) {
        case "incPtr":      res = Token.incPtr;      break;
        case "decPtr":      res = Token.decPtr;      break;
        case "incByte":     res = Token.incByte;     break;
        case "decByte":     res = Token.decByte;     break;
        case "output":      res = Token.output;      break;
        case "input":       res = Token.input;       break;
        case "jumpForward": res = Token.jumpForward; break;
        case "jumpBack":    res = Token.jumpBack;    break;
      }
      return false;
    }
  });

  if (!res) { throw new Error(`Cannot find ${str}`); }
  return res;
}

export const DEFAULT_LANGUAGE = {
  incPtr:      '>',
  decPtr:      '<',
  incByte:     '+',
  decByte:     '-',
  output:      '.',
  input:       ',',
  jumpForward: '[',
  jumpBack:    ']',
};

export const enum Token {
  incPtr = 1,
  decPtr,
  incByte,
  decByte,
  output,
  input,
  jumpForward,
  jumpBack,
}
