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

describe('ParseQueryString and StringifyQueryString', () => {
  it('should parse', () => {
    const q: UI.QueryString = {
      program: 'hoge',
      lang:    la.DEFAULT_LANGUAGE,
      input:   [65, 66, 67, 68],
    };
    const se = UI.StringifyQueryString(q);
    history.pushState(null, null, `${location.protocol}//${location.host}${location.pathname}?${se}`);
    const parsed = UI.ParseQueryString();
    assert.deepEqual(q, parsed);
  });
});
