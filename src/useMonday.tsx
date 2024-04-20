import { useEffect, useState } from "react";
import { Item, Theme } from "./types";
import { monday } from "./constants";

export default function useMonday() {
  const [theme, setTheme] = useState<Theme>("light");
  const [boardIds, setBoardIds] = useState<number | undefined>(undefined);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    monday.listen("context", (data) => {
      setTheme(data.data.theme as Theme);
      const unchecked = data.data as any;
      setBoardIds(unchecked.boardIds);
    });
  }, []);

  useEffect(() => {
    async function queryBoards() {
      if (!boardIds) return;
      try {
        const res = await monday.api(`
        query {
          boards(ids: ${JSON.stringify(boardIds)}) {
            id
            items_page {
              items {
                group {
                  id
                }
                column_values(types: [numbers, mirror]) {
                  id
                  text
                  value
                  type
                  ... on MirrorValue {
                    display_value
                  }
                }
              }
            }
          }
        }
        `);

        let flattened_res = [];

        for (const board of res.data.boards) {
          for (const item of board.items_page.items) {
            for (const column of item.column_values) {
              flattened_res.push({
                gid: item.group.id,
                cid: column.id,
                text: column.text,
                value: column.value,
                type: column.type,
                display_value: column.display_value,
              });
            }
          }
        }

        setItems(flattened_res);
        console.log(flattened_res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }

    queryBoards();
  }, [boardIds]);

  return { items, theme };
}
