import useMonday from "./useMonday";

export default function App() {
  const { theme, func } = useMonday();

  return <main className={theme}>{func}</main>;
}
