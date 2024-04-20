import { Item } from "./types";

export function flattenResponse(res: any): Item[] {
  let flattenedRes = [];

  for (const board of res.data.boards) {
    for (const item of board.items_page.items) {
      for (const column of item.column_values) {
        if (column.type === "numbers") {
          if (
            column.text === null ||
            column.text === undefined ||
            column.text === ""
          )
            continue;
          flattenedRes.push({
            gid: item.group.id,
            cid: column.id,
            value: parseFloat(column.text),
          });
        }

        if (column.type === "mirror") {
          // if (
          //   column.display_value === null ||
          //   column.display_value === undefined ||
          //   column.display_value === ""
          // )
          //   continue;
          // flattenedRes.push({
          //   gid: item.group.id,
          //   cid: column.id,
          //   value: parseFloat(column.display_value),
          // });
        }
      }
    }
  }

  return flattenedRes.sort((a, b) => a.value - b.value);
}

export function sum(items: Item[]) {
  return items.reduce((prev, curr) => prev + curr.value, 0);
}

export function count(items: Item[]) {
  return items.length;
}

export function avg(items: Item[]) {
  return sum(items) / count(items);
}

export function min(items: Item[]) {
  if (items.length === 0) return 0;
  return items[0].value;
}

export function max(items: Item[]) {
  if (items.length === 0) return 0;
  return items[items.length - 1].value;
}

export function median(items: Item[]) {
  if (items.length === 0) return 0;
  const middle = Math.floor(items.length / 2);
  if (items.length % 2 === 0)
    return (items[middle - 1].value + items[middle].value) / 2;
  return items[middle].value;
}
