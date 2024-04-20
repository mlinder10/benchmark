import { useEffect, useState } from "react";
import { Item, Theme, Values } from "./types";
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
  const [items, setItems] = useState<Item[]>([]);
  const [values, setValues] = useState<Values | null>(null);
  const [settings, setSettings] = useState<Record<string, any> | null>(null);
  const [func, setFunc] = useState<number>(0);

  useEffect(() => {
    monday.listen("context", (data) => {
      setTheme(data.data.theme as Theme);
      const unchecked = data.data as any;
      setBoardIds(unchecked.boardIds);
    });

    monday.listen("settings", (data) => {
      setSettings(data.data);
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
        setItems(flat);
      } catch (err) {
        console.log(err);
      }
    }

    queryBoards();
  }, [boardIds]);

  useEffect(() => {
    const v = {
      sum: sum(items),
      count: count(items),
      avg: avg(items),
      median: median(items),
      min: min(items),
      max: max(items),
    };
    setValues(v);

    switch (settings?.function) {
      case "sum":
        setFunc(v.sum);
        break;
      case "count":
        setFunc(v.count);
        break;
      case "average":
        setFunc(v.avg);
        break;
      case "median":
        setFunc(v.median);
        break;
      case "min":
        setFunc(v.min);
        break;
      case "max":
        setFunc(v.max);
        break;
      default:
        setFunc(0);
        break;
    }
  }, [items]);

  return { values, theme, settings, func };
}
