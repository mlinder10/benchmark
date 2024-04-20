import useMonday from "./useMonday";

export default function App() {
  const { theme, func, settings } = useMonday();

  if (settings === null) return <>Loading...</>;

  const cUnit = settings.unit.custom_unit;
  const symbol = settings.unit.symbol;
  const text =
    settings.unit.direction === "right"
      ? `${func.toLocaleString()}${cUnit === "" ? symbol : cUnit}`
      : `${cUnit === "" ? symbol : cUnit}${func.toLocaleString()}`;

  return <main className={theme}>{text}</main>;
}
