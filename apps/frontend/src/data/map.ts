const raw = [
  ['wall', 'empty', 'wall', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['wall', 'empty', 'wall', 'empty', 'empty', 'empty', 'wall', 'empty'],
  ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['wall', 'empty', 'empty', 'empty', 'empty', 'wall', 'empty', 'empty'],
  ['wall', 'wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
  ['wall', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'wall'],
  ['wall', 'empty', 'empty', 'empty', 'wall', 'empty', 'empty', 'empty'],
  ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
] as const;

export const mapData = raw.map(r => r.map(c => ({ type: c })));
