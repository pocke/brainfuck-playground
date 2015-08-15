/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./language.ts" />
/// <reference path="./parser.ts" />

namespace Brainfuck {
  class MainVM extends Vue {
    private output:  string;


    constructor(private program: string, private lang: Language = DEFAULT_LANGUAGE, private input: string = "") {
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
        if (e instanceof ParseError) {
          return e.message;
        }
      }
      return "";
    }

    private invalidLangError: string;
    _invalidLangError(): string {
      try {
        LanguageValidate(this.lang);
      } catch (e) {
        if (e instanceof InvalidLanguage) {
          return e.message;
        }
      }
      return "";
    }

    private hasError: boolean;
    _hasError(): boolean {
      return this.parseError !== "" || this.invalidLangError !== "";
    }



    private parse(): Token[] {
      const c = new Parser(this.lang);
      return c.parse(this.program);
    }
  }


  const helloWorld = `This program is hello world
+++++++++[>++++++++>+++++++++++>+++++<<<-]>.>++.+++++++..+++.>-.
------------.<++++++++.--------.+++.------.--------.>+.`;

  const vm = new MainVM(helloWorld);
  console.log(vm);
}
