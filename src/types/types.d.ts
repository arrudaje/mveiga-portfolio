export type Offset = {
  // number of pixels offset from the leftmost border of the field to the begin of the square
  left: number;
  // number of pixels offset from the topmost border of the field to the begin of the square
  top: number;
};

export type Coordinate = {
  // horizontal coordinate
  x: number;
  // vertical coordinate
  y: number;
};

export type Position = Offset & Coordinate;

export type Map = {
  [key in `${Position["x"]},${Position["y"]}`]?: Tile;
};

export type Tile = {
    position: Position;
    allow: boolean;
    hasChar: boolean;
    item?: {};
};