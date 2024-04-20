import { useEffect, useState } from "react";
import { Theme, Values } from "./types";
import { monday } from "./constants";
import {
  avg,
  count,
  flattenResponse,
  max,
  median,
  min,
  sum,
} from "./functions";

export default function useMonday() {
  const [theme, setTheme] = useState<Theme>("light");
  const [boardIds, setBoardIds] = useState<number | undefined>(undefined);
  const [values, setValues] = useState<Values | null>(null);

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

        const flat = flattenResponse(res);
        const v = {
          sum: sum(flat),
          count: count(flat),
          avg: avg(flat),
          median: median(flat),
          min: min(flat),
          max: max(flat),
        };
        setValues(v);

        console.log(flat);
        console.log(v);
      } catch (err) {
        console.log(err);
      }
    }

    queryBoards();
  }, [boardIds]);

  return { values, theme };
}
