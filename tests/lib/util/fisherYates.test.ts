import { FloatGenerator } from '$lib/domain/crypto/float-generator';
import { fisherYates } from '$lib/domain/games/shared/fisher-yates';
import { describe, test, expect } from 'vitest';

describe('fisherYates', () => {
  test('keno', () => {
    const floatGenerator = FloatGenerator({
      clientSeed: 'ec75fca98de6f2d9',
      serverSeed: '735249f062ac025044a8523aa92e034803f02d6b75129abc97e8b1be19aab9b4',
      nonce: 22,
    });
    const tiles = [];
    for (let i = 1; i <= 40; i++) {
      tiles.push(i);
    }
    const fisherYatesItems = fisherYates(floatGenerator, tiles, 10);
    for (const fisherYatesItem of fisherYatesItems) {
      fisherYatesItem.float = Math.round(fisherYatesItem.float * 1e12) / 1e12;
    }
    expect(fisherYatesItems).toStrictEqual([
      {
        chosen: 29,
        float: 0.717253545532,
        chosenIndex: 28,
        chosenIndexes: [28],
      },
      {
        chosen: 32,
        float: 0.790927353082,
        chosenIndex: 30,
        chosenIndexes: [28, 30],
      },
      {
        chosen: 20,
        float: 0.507541260915,
        chosenIndex: 19,
        chosenIndexes: [28, 30, 19],
      },
      {
        chosen: 7,
        float: 0.187117791036,
        chosenIndex: 6,
        chosenIndexes: [28, 30, 19, 6],
      },
      {
        chosen: 34,
        float: 0.826648504008,
        chosenIndex: 29,
        chosenIndexes: [28, 30, 19, 6, 29],
      },
      {
        chosen: 17,
        float: 0.446080138907,
        chosenIndex: 15,
        chosenIndexes: [28, 30, 19, 6, 29, 15],
      },
      {
        chosen: 6,
        float: 0.172935115173,
        chosenIndex: 5,
        chosenIndexes: [28, 30, 19, 6, 29, 15, 5],
      },
      {
        chosen: 37,
        float: 0.891133415746,
        chosenIndex: 29,
        chosenIndexes: [28, 30, 19, 6, 29, 15, 5, 29],
      },
      {
        chosen: 11,
        float: 0.278925591381,
        chosenIndex: 8,
        chosenIndexes: [28, 30, 19, 6, 29, 15, 5, 29, 8],
      },
      {
        chosen: 1,
        float: 0.020267952699,
        chosenIndex: 0,
        chosenIndexes: [28, 30, 19, 6, 29, 15, 5, 29, 8, 0],
      },
    ]);
  });
  test('mines', () => {
    const floatGenerator = FloatGenerator({
      clientSeed: 'ec75fca98de6f2d9',
      serverSeed: '735249f062ac025044a8523aa92e034803f02d6b75129abc97e8b1be19aab9b4',
      nonce: 22,
    });
    const mines = [];
    for (let i = 0; i <= 24; i++) {
      mines.push(i);
    }
    const fisherYatesItems = fisherYates(floatGenerator, mines, 10);
    for (const fisherYatesItem of fisherYatesItems) {
      fisherYatesItem.float = Math.round(fisherYatesItem.float * 1e12) / 1e12;
    }
    expect(fisherYatesItems).toStrictEqual([
      {
        chosen: 17,
        float: 0.717253545532,
        chosenIndex: 17,
        chosenIndexes: [17],
      },
      {
        chosen: 19,
        float: 0.790927353082,
        chosenIndex: 18,
        chosenIndexes: [17, 18],
      },
      {
        chosen: 11,
        float: 0.507541260915,
        chosenIndex: 11,
        chosenIndexes: [17, 18, 11],
      },
      {
        chosen: 4,
        float: 0.187117791036,
        chosenIndex: 4,
        chosenIndexes: [17, 18, 11, 4],
      },
      {
        chosen: 21,
        float: 0.826648504008,
        chosenIndex: 17,
        chosenIndexes: [17, 18, 11, 4, 17],
      },
      {
        chosen: 9,
        float: 0.446080138907,
        chosenIndex: 8,
        chosenIndexes: [17, 18, 11, 4, 17, 8],
      },
      {
        chosen: 3,
        float: 0.172935115173,
        chosenIndex: 3,
        chosenIndexes: [17, 18, 11, 4, 17, 8, 3],
      },
      {
        chosen: 23,
        float: 0.891133415746,
        chosenIndex: 16,
        chosenIndexes: [17, 18, 11, 4, 17, 8, 3, 16],
      },
      {
        chosen: 6,
        float: 0.278925591381,
        chosenIndex: 4,
        chosenIndexes: [17, 18, 11, 4, 17, 8, 3, 16, 4],
      },
      {
        chosen: 0,
        float: 0.020267952699,
        chosenIndex: 0,
        chosenIndexes: [17, 18, 11, 4, 17, 8, 3, 16, 4, 0],
      },
    ]);
  });
});
