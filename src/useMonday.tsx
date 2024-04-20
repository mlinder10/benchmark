import { useEffect, useState } from "react";
import { Theme } from "./types";
import { monday } from "./constants";

export default function useMonday() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    monday.listen("context", (data) => {
      console.log(data);
      setTheme(data.data.theme as Theme);
      const unchecked = data.data as any;
      queryBoards(unchecked.boardIds)
    });
  }, []);

  async function queryBoards(boardIds: number | undefined) {
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

  return { theme };
}
