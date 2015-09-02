import * as mocha from "mocha";
import * as assert from "power-assert";

import Memory from "../src/memory";


describe('Memory', () => {
  describe('constructor', () => {
    it('should set memory', () => {
      const m = new Memory();
      for (let i = 0; i < m.memory.length; ++i) {
        assert(m.memory[i] === 0);
      }
    });

    it('should set pos', () => {
      const m = new Memory();
      assert(m.pos === 0);
    });
  });

  describe('#incP', () => {
    it('should increment pos', () => {
      const m = new Memory();
      const before = m.pos;
      m.incP();
      const after = m.pos;
      assert(before + 1 === after);
    });

    context('when pos is last', () => {
      it('should be 0', () => {
        const m = new Memory();
        m.pos = m.memory.length - 1;
        m.incP();
        assert(m.pos === 0);
      });
    });
  });

  describe('#decP', () => {
    it('should decrement pos', () => {
      const m = new Memory();
      m.pos = 1;
      const before = m.pos;
      m.decP();
      const after = m.pos;
      assert(before - 1 === after);
    });

    context('when pos is last', () => {
      it('should be length - 1', () => {
        const m = new Memory();
        m.decP();
        const expected = m.memory.length - 1;
        assert(m.pos === expected);
      });
    });
  });

  describe('#incB', () => {
    
  });
});
