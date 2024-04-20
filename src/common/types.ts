export type Theme = "light" | "dark" | "black";

export type Item = {
  gid: string;
  cid: string;
  value: number;
};

export type Values = {
  sum: number;
  count: number;
  avg: number;
  median: number;
  min: number;
  max: number;
};
