import { useEffect, useState } from "react";
import { Theme } from "./types";
import { monday } from "./constants";

export default function useMonday() {
  const [theme, setTheme] = useState<Theme>("light");
  const [boardIds, setBoardIds] = useState<number | undefined>(undefined);

  useEffect(() => {
    monday.listen("context", (data) => {
      console.log(data);
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
                                column_values(types: [numbers, mirror, formula]) {
                                    id
                                    text
                                    value
                                    type
                                }
                            }
                        }
                    }
                }
            `);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }

    queryBoards();
  }, [boardIds]);

  return { theme };
}
