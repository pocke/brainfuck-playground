import * as mocha from "mocha";
import * as assert from "power-assert";

import * as la from '../src/language';


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
