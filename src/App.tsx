import useMonday from "./useMonday";

export default function App() {
  const { theme, boardIds } = useMonday();

  return <div className={theme}>{boardIds}</div>;
}
