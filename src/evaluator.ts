/// <reference path="../typings/tsd.d.ts" />

import * as la from './language';

class Data {
  private memory: number[];
  private pos:    number;

  constructor() {
    this.memory = new Array(30000);
    for (let i = 0; i < this.memory.length; ++i) {
      this.memory[i] = 0;
    }
    this.pos = 0;
  }

  incP(): void {
    if (this.pos === this.memory.length - 1) {
      this.pos = 0;
    } else {
      this.pos++;
    }
  }

  decP(): void {
    if (this.pos === 0) {
      this.pos = this.memory.length - 1;
    } else {
      this.pos--;
    }
  }

  incB(): void {
    const v = this.memory[this.pos];
    if (v === 255) {
      this.memory[this.pos] = 0;
    } else {
      this.memory[this.pos] = v + 1;
    }
  }

  decB(): void {
    const v = this.memory[this.pos];
    if (v === 0) {
      this.memory[this.pos] = 255;
    } else {
      this.memory[this.pos] = v - 1;
    }
  }

  get(): number {
    return this.memory[this.pos];
  }

  set(b: number): void {
    this.memory[this.pos] = b;
  }
}

export default class Evaluator {
  private data: Data;
  private pos: number;
  private posStack: number[];

  constructor(private program: la.Token[]) {
    this.data = new Data();
    this.pos  = 0;
    this.posStack = [];
  };

  eval(input: number[]): number[] {
    let out: number[] = [];
    let cnt = 0;
    while (this.pos < this.program.length && cnt < 1000) {
      const tok = this.tok();
      switch (tok) {
        case la.Token.incPtr:      this.data.incP();             break;
        case la.Token.decPtr:      this.data.decP();             break;
        case la.Token.incByte:     this.data.incB();             break;
        case la.Token.decByte:     this.data.decB();             break;
        case la.Token.output:      out.push(this.data.get());    break;
        case la.Token.input:       this.data.set(input.shift()); break;
        case la.Token.jumpForward: this.jumpForward();           break;
        case la.Token.jumpBack:    this.jumpBack();              break;
      }
      this.pos++;
      cnt++;
    }
    return out;
  }

  private jumpForward(): void {
    if (this.data.get() === 0) {
      while (this.tok() !== la.Token.jumpBack) { this.pos++; }
    } else {
      this.posStack.push(this.pos);
    }
  }

  private jumpBack(): void {
    this.pos = this.posStack.pop() - 1;
  }

  private tok(): la.Token {
    return this.program[this.pos];
  }
}
