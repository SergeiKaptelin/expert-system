export const CONJUCTION = {
  head: ["A", "B", "A + B"],
  body: [
    [0, 0, 0],
    [1, 0, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
};

export const DISJUNCTION = {
  head: ["A", "B", "A | B"],
  body: [
    [0, 0, 0],
    [1, 0, 1],
    [0, 1, 1],
    [1, 1, 1],
  ],
};

export const NOT = {
  head: ["A", "!A", ""],
  body: [
    [0, 1, ""],
    [1, 0, ""],
  ],
};

export const XOR = {
  head: ["A", "B", "A ^ B"],
  body: [
    [0, 0, 0],
    [1, 0, 1],
    [0, 1, 1],
    [1, 1, 0],
  ],
};

export const IMPLICATION = {
  head: ["A", "B", "A => B"],
  body: [
    [0, 0, 1],
    [1, 0, 0],
    [0, 1, 1],
    [1, 1, 1],
  ],
};

export const EQUALITY = {
  head: ["A", "B", "A <=> B"],
  body: [
    [0, 0, 1],
    [1, 0, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
};