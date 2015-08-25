import * as mocha from "mocha";
import * as assert from "power-assert";

import Vue = require('vue');
import * as UI from "../src/ui";


describe('MainVM', () => {
  describe('#run', () => {
    it('should set output', () => {
      const vm = new UI.MainVM(
        `+++++++++[>++++++++>+++++++++++>+++++<<<-]>.>++.+++++++..+++.>-.
        ------------.<++++++++.--------.+++.------.--------.>+.`
      );
      vm.run();
      assert(vm.output === "Hello, world!");
    });
  });
});
