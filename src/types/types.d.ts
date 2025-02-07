export type Offset = {
  // number of pixels offset from the leftmost border of the field to the begin of the tile
  left: number;
  // number of pixels offset from the topmost border of the field to the begin of the tile
  top: number;
};

export type Coordinate = {
  // horizontal coordinate
  x: number;
  // vertical coordinate
  y: number;
};

export type Tile = {
  coordinate: Coordinate;
  allow: boolean;
};

export type Map = {
  [key: `${Position["x"]},${Position["y"]}`]: Tile;
};