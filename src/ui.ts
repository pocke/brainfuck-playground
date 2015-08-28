/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../query-string.d.ts" />

import * as la from './language';
import * as parser from './parser';
import Evaluator from './evaluator';

import Vue = require('vue');
import * as qs from 'query-string';

export class MainVM extends Vue {
  public  output:    string;
  private evalError: string;
  private timeout:   number;
  private isStep:    boolean;


  constructor(private program: string, private lang: la.Language = la.DEFAULT_LANGUAGE, private input: string = "") {
    super();
    this.evalError = "";
    this.timeout = 10000;

    this._init({
      el: '#vue-main',
      data: {
        program:   this.program,
        input:     this.input,
        output:    this.output,
        lang:      this.lang,
        evalError: this.evalError,
        isStep:    this.isStep,
      },
      methods: {
        run: this.run,
        updatePermalink: this.updatePermalink,
      },
      computed: {
        parseError:       this._parseError,
        invalidLangError: this._invalidLangError,
        hasError:         this._hasError,
      }
    });
  }


  // methods

  run(): void {
    this.output = "";
    this.evalError = "";

    const tok = this.parse();
    const e = new Evaluator(tok, this.timeout);

    const bytes: number[] = [];
    for (let i = 0; i < this.input.length; ++i) {
      bytes.push(this.input.charCodeAt(i));
    }

    try {
      const out = e.eval(bytes);
      this.output = String.fromCharCode(...out);
    } catch (e) {
      this.evalError = (<Error>e).message;
    }
  }

  updatePermalink(): void {
    const q = {
      program: this.program,
      lang:    this.lang,
      input:   this.input,
    };
    const se = StringifyQueryString(q).replace(/\./g, '%2E');
    const url = `${location.protocol}//${location.host}${location.pathname}?${se}`;
    history.pushState(null, null, url);
  }

  tweet(): void {
    this.updatePermalink();
    const lo = encodeURIComponent(location.href);
    const url = `https://twitter.com/intent/tweet?hashtags=BrainfuckPlayground&original_referer=&tw_p=tweetbutton&url=${lo}`;
    window.open(url);
  }


  // computeds

  private parseError: string;
  _parseError(): string {
    try {
      this.parse();
    } catch (e) {
      if (e instanceof parser.ParseError) {
        return e.message;
      }
    }
    return "";
  }

  private invalidLangError: string;
  _invalidLangError(): string {
    try {
      la.LanguageValidate(this.lang);
    } catch (e) {
      if (e instanceof la.InvalidLanguage) {
        return e.message;
      }
    }
    return "";
  }

  private hasError: boolean;
  _hasError(): boolean {
    return this.parseError !== "" || this.invalidLangError !== "";
  }



  private parse(): la.Token[] {
    const c = new parser.Parser(this.lang);
    return c.parse(this.program);
  }
}

export interface QueryString {
  program?: string;
  lang?:    la.Language;
  input?:   string;
}

export function ParseQueryString(): QueryString {
  const obj = qs.parse(location.search);
  let lang: la.Language;
  if (obj.lang) {
    lang = <la.Language>JSON.parse(obj.lang);
  }

  return {
    program: obj.program,
    lang:    lang,
    input:   obj.input,
  };
}

export function StringifyQueryString(q: QueryString): string {
  const obj: any = {};
  obj.program = q.program;
  obj.input   = q.input;
  obj.lang = JSON.stringify(q.lang);
  return qs.stringify(obj);
}

const helloWorld = `This program is hello world
+++++++++[>++++++++>+++++++++++>+++++<<<-]>.>++.+++++++..+++.>-.
------------.<++++++++.--------.+++.------.--------.>+.`;

const q = ParseQueryString();
const prog = q.program || helloWorld;

const vm = new MainVM(prog, q.lang, q.input);

console.log(vm);
