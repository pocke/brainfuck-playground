/// <reference path="../typings/tsd.d.ts" />

export default class Memory {
  public memory: Uint8Array;
  public pos = 0;

  constructor() {
    const buf = new ArrayBuffer(30000);

    this.memory = new Uint8Array(buf);
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

  incB(): void { this.memory[this.pos]++; }
  decB(): void { this.memory[this.pos]--; }
  get(): number { return this.memory[this.pos]; }
  set(b: number): void { this.memory[this.pos] = b; }
}
