import { useEffect, useState } from "react";
import { Theme } from "./types";
import { monday } from "./constants";

export default function useMonday() {
  const [theme, setTheme] = useState<Theme>("light");
  const [boardIds, setBoardIds] = useState<string[]>([]);

  useEffect(() => {
    monday.listen("context", (data) => {
      console.log(data);
      setTheme(data.data.theme as Theme);
      const unchecked = data.data as any;
      setBoardIds(unchecked.boards);
    });
  }, []);

  return { theme, boardIds };
}
