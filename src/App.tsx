import useMonday from "./useMonday";

export default function App() {
  const { theme, func } = useMonday();

  return <div className={theme}>{func}</div>;
}
