import * as mocha from "mocha";
import * as assert from "power-assert";

import Vue = require('vue');

import * as UI from "../src/ui";
import * as la from '../src/language';


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

describe('ParseQueryString and StringifyQueryString', () => {
  it('should parse', () => {
    const q: UI.QueryString = {
      program: 'hoge',
      lang:    la.DEFAULT_LANGUAGE,
      input:   'piyo',
    };
    const se = UI.StringifyQueryString(q);
    const parsed = UI.ParseQueryString(se);
    assert.deepEqual(q, parsed);
  });
});
