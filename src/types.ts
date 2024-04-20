export type Theme = "light" | "dark" | "black";

export type Item = {
  gid: string;
  cid: string;
  text: string | null;
  type: string;
  display_value: string | null;
};
