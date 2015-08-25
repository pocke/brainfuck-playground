/// <reference path="../typings/tsd.d.ts" />

import * as la from './language';
import * as parser from './parser';
import Evaluator from './evaluator';

import Vue = require('vue');

export class MainVM extends Vue {
  public output:  string;


  constructor(private program: string, private lang: la.Language = la.DEFAULT_LANGUAGE, private input: string = "") {
    super();
    this._init({
      el: '#vue-main',
      data: {
        program: this.program,
        input:   this.input,
        output:  this.output,
        lang:    this.lang,
      },
      methods: {
        run: this.run,
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
    const tok = this.parse();
    const e = new Evaluator(tok);
    let bytes: number[] = [];
    for (let i = 0; i < this.input.length; ++i) {
      bytes.push(this.input.charCodeAt(i));
    }
    const out = e.eval(bytes);
    this.output = String.fromCharCode(...out);
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


const helloWorld = `This program is hello world
+++++++++[>++++++++>+++++++++++>+++++<<<-]>.>++.+++++++..+++.>-.
------------.<++++++++.--------.+++.------.--------.>+.`;

const vm = new MainVM(helloWorld);

console.log(vm);
