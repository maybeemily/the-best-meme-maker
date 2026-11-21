import { describe, it, expect } from 'vitest';
import exportSize from './exportSize';

describe('exportSize', () => {
  it('uses the original image size exactly', () => {
    expect(exportSize(1200, 1800)).toEqual({ width: 1200, height: 1800 });
  });

  it('shrinks proportionally to about 16 million pixels for huge images', () => {
    const { width, height } = exportSize(8000, 6000);
    expect(width * height).toBeLessThanOrEqual(16000000 + 8000);
    expect(width / height).toBeCloseTo(8000 / 6000, 2);
  });

  it('returns null when the image size is unknown', () => {
    expect(exportSize(0, 0)).toBeNull();
  });
});
