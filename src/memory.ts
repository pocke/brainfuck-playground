/// <reference path="../typings/tsd.d.ts" />

export default class Memory {
  public memory: number[];
  public pos = 0;

  constructor() {
    this.memory = new Array(30000);
    for (let i = 0; i < this.memory.length; ++i) {
      this.memory[i] = 0;
    }
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
