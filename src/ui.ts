/// <reference path="../typings/tsd.d.ts" />

import * as la     from './language';
import * as parser from './parser';
import * as qs     from './query_string';
import Evaluator   from './evaluator';
import BytesFilter from './filters/bytes';

import Vue = require('vue');

export class MainVM extends Vue {
  public  output:    number[];
  private evalError: string;
  private timeout:   number;
  private isStep:    boolean;


  constructor(private program: string, private lang: la.Language = la.DEFAULT_LANGUAGE, private input: number[] = []) {
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
        tokens:           this._tokens,
      },
      filters: {
        bytesFilter: BytesFilter,
      }
    });
  }


  // methods

  run(): void {
    this.output = [];
    this.evalError = "";

    const e = new Evaluator(this.tokens, this.input, this.timeout);

    try {
      this.output = e.eval();
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
    const se = qs.Stringify(q).replace(/\./g, '%2E');
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

  private tokens: la.Token[];
  _tokens(): la.Token[] {
    return this.parse();
  }

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


const helloWorld = `This program is hello world
+++++++++[>++++++++>+++++++++++>+++++<<<-]>.>++.+++++++..+++.>-.
------------.<++++++++.--------.+++.------.--------.>+.`;

const q = qs.Parse();
const prog = q.program || helloWorld;

const vm = new MainVM(prog, q.lang, q.input);

console.log(vm);
