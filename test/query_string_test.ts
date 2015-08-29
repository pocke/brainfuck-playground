import * as mocha from "mocha";
import * as assert from "power-assert";

import * as la from '../src/language';
import * as qs from '../src/query_string';


describe('Parse and Stringify', () => {
  it('should parse', () => {
    const q: qs.QueryString = {
      program: 'hoge',
      lang:    la.DEFAULT_LANGUAGE,
      input:   [65, 66, 67, 68],
    };
    const se = qs.Stringify(q);
    history.pushState(null, null, `${location.protocol}//${location.host}${location.pathname}?${se}`);
    const parsed = qs.Parse();
    assert.deepEqual(q, parsed);
  });
});
