import { compress, decompress } from '../json-compressor';

test('compress and decompress object', () => {
  const orig = {
    aLongPropertyNameA: { longPropertyNameB: 123, longPropertyNameC: 'abc' },
    arrayA: [
      { longPropertyNameD: 123, longPropertyNameE: 'xyz' },
      { longPropertyNameE: 'asdf' },
      { longPropertyNameE: 'query', longPropertyNameF: true },
    ],
    arrayB: [1, 2, 3],
  };

  const compressed = compress(orig);
  expect(compressed).toEqual({
    data: {
      a: { b: 123, c: 'd' },
      e: [{ f: 123, g: 'h' }, { g: 'i' }, { g: 'j', k: true }],
      l: [1, 2, 3],
    },
    keys: {
      a: 'aLongPropertyNameA',
      b: 'longPropertyNameB',
      c: 'longPropertyNameC',
      d: 'abc',
      e: 'arrayA',
      f: 'longPropertyNameD',
      g: 'longPropertyNameE',
      h: 'xyz',
      i: 'asdf',
      j: 'query',
      k: 'longPropertyNameF',
      l: 'arrayB',
    },
  });

  const decompressed = decompress(compressed);
  expect(decompressed).toEqual(orig);
});

test('compress and decompress array', () => {
  const orig = [
    {
      longPropertyNameA: 'abcdefg',
      longPropertyNameB: true,
      longPropertyNameC: 1234,
      longPropertyNameD: 'qwerty',
    },
    {
      longPropertyNameA: 'abcdefg',
      longPropertyNameB: false,
      longPropertyNameC: 3456,
    },
    {
      longPropertyNameA: 'uiop',
      longPropertyNameB: true,
      longPropertyNameC: 5678,
      longPropertyNameD: 'qwerty',
      longPropertyNameE: null,
    },
    {
      longPropertyNameA: 'uiop',
      longPropertyNameB: false,
      longPropertyNameC: 5678,
      longPropertyNameD: 'qwerty',
    },
    {
      longPropertyNameA: 'uiop',
      longPropertyNameB: false,
      longPropertyNameC: 5678,
      longPropertyNameD: 'qwerty',
      longPropertyNameE: { someProperty: 'foobar' },
    },
  ];

  const compressed = compress(orig);
  expect(compressed).toEqual({
    data: [
      { a: 'b', c: true, d: 1234, e: 'f' },
      { a: 'b', c: false, d: 3456 },
      { a: 'g', c: true, d: 5678, e: 'f', h: null },
      { a: 'g', c: false, d: 5678, e: 'f' },
      { a: 'g', c: false, d: 5678, e: 'f', h: { i: 'j' } },
    ],
    keys: {
      a: 'longPropertyNameA',
      b: 'abcdefg',
      c: 'longPropertyNameB',
      d: 'longPropertyNameC',
      e: 'longPropertyNameD',
      f: 'qwerty',
      g: 'uiop',
      h: 'longPropertyNameE',
      i: 'someProperty',
      j: 'foobar',
    },
  });

  const decompressed = decompress(compressed);
  expect(decompressed).toEqual(orig);
});
