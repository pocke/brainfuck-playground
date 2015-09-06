/// <reference path="../../typings/tsd.d.ts" />

export default {
  read: (val: number[]): string => {
    return String.fromCharCode(...val);
  },

  write: (val: string): number[] => {
    const res: number[] = [];
    for (let i = 0; i < val.length; ++i) {
      res.push(val.charCodeAt(i));
    }
    return res;
  }
};
