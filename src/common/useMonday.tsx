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
  const [func, setFunc] = useState<number | null>(null);

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
        console.log(res)

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
  }, [items]);

  useEffect(() => {
    if (values === null || settings === null) return;

    switch (settings.function) {
      case "sum":
        setFunc(values.sum);
        break;
      case "count":
        setFunc(values.count);
        break;
      case "average":
        setFunc(values.avg);
        break;
      case "median":
        setFunc(values.median);
        break;
      case "min":
        setFunc(values.min);
        break;
      case "max":
        setFunc(values.max);
        break;
      default:
        setFunc(null);
        break;
    }
  }, [values, settings]);

  return { values, theme, settings, func };
}
