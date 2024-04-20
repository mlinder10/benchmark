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
            let flattened = {
              gid: item.group.id,
              cid: item.column_values[0].id,
              text: item.column_values[0].text,
              type: item.column_values[0].type,
              display_value: item.column_values[0].display_value,
            };
            flattened_res.push(flattened);
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
