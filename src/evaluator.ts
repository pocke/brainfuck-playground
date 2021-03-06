/// <reference path="../typings/tsd.d.ts" />

import * as _ from 'lodash';

import * as la from './language';
import Memory from './memory';


class EvaluateTimeout implements Error {
  public name: string;

  constructor(public message: string) {
    this.name = 'EvaluateTimeout';
  }
}

export default class Evaluator {
  private posStack: number[] = [];
  private input: number[];

  public data  = new Memory();
  public count = 0;
  public pos   = 0;

  constructor(private program: la.Token[], input: number[], private timeout = 1000) {
    this.input = _.clone(input);
  };

  step(): number {
    let res: number = null;

    const tok = this.tok();
    switch (tok) {
      case la.Token.incPtr:      this.data.incP();      break;
      case la.Token.decPtr:      this.data.decP();      break;
      case la.Token.incByte:     this.data.incB();      break;
      case la.Token.decByte:     this.data.decB();      break;
      case la.Token.output:      res = this.data.get(); break;
      case la.Token.input:       this.loadInput();      break;
      case la.Token.jumpForward: this.jumpForward();    break;
      case la.Token.jumpBack:    this.jumpBack();       break;
    }
    this.pos++;
    this.count++;

    if (this.count > this.timeout) { throw new EvaluateTimeout("Timeout"); }
    return res;
  }

  eval(): number[] {
    const out: number[] = [];
    while (!this.endOfProgram()) {
      const o = this.step();
      if (o != null) { out.push(o); }
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

  private loadInput(): void {
    this.data.set(this.input.shift());
  }

  private tok(): la.Token {
    return this.program[this.pos];
  }

  private endOfProgram(): boolean {
    return this.program.length <= this.pos;
  }
}
