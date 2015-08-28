import * as mocha from "mocha";
import * as assert from "power-assert";

import BytesFilter from "../../src/filters/bytes";

describe('BytesFilter', () => {
  describe('#read', () => {
    it('should eq', () => {
      assert(BytesFilter.read([65, 66, 67]) === "ABC");
    });
  });

  describe('#write', () => {
    it('should eq', () => {
      assert.deepEqual(BytesFilter.write("ABC"), [65, 66, 67]);
    });
  });

  describe('read write', () => {
    it('should eq', () => {
      const str = "hogefugapoyoyo";
      assert(str === BytesFilter.read(BytesFilter.write(str)));
    });

    it('should eq', () => {
      const nums = [65, 66, 67, 85, 1, 4, 6];
      assert.deepEqual(nums, BytesFilter.write(BytesFilter.read(nums)));
    });
  });
});
