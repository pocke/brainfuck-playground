/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../query-string.d.ts" />

import * as la from './language';

import * as qs from 'query-string';


export interface QueryString {
  program?: string;
  lang?:    la.Language;
  input?:   number[];
}

export function Parse(): QueryString {
  const obj = qs.parse(location.search);
  let lang: la.Language;
  let input: number[];
  if (obj.lang) {
    lang = <la.Language>JSON.parse(obj.lang);
  }
  if (obj.input) {
    input = <number[]>JSON.parse(obj.input);
  }

  return {
    program: obj.program,
    lang:    lang,
    input:   input,
  };
}

export function Stringify(q: QueryString): string {
  const obj: any = {};
  obj.program = q.program;
  obj.input   = JSON.stringify(q.input);
  obj.lang    = JSON.stringify(q.lang);
  return qs.stringify(obj);
}
