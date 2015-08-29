import * as mocha from "mocha";
import * as assert from "power-assert";

import Vue = require('vue');

import * as UI from "../src/ui";
import * as la from '../src/language';
import BytesFilter from "../src/filters/bytes";


describe('MainVM', () => {
  describe('#run', () => {
    it('should set output', () => {
      const vm = new UI.MainVM(
        `+++++++++[>++++++++>+++++++++++>+++++<<<-]>.>++.+++++++..+++.>-.
        ------------.<++++++++.--------.+++.------.--------.>+.`
      );
      vm.run();
      assert.deepEqual(BytesFilter.read(vm.output), "Hello, world!");
    });
  });

  describe('#updatePermalink', () => {
    it('should generate permalink', () => {
      const vm = new UI.MainVM(
        `+++++++++[>++++++++>+++++++++++>+++++<<<-]>.>++.+++++++..+++.>-.
        ------------.<++++++++.--------.+++.------.--------.>+.`
      );
      vm.updatePermalink();
      assert(location.search !== "");
    });
  });
});
