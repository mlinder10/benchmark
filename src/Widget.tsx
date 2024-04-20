type WidgetProps = {
  func: number | null;
  settings: Record<string, any> | null;
};

export default function Widget({ func, settings }: WidgetProps) {
  if (settings === null || func === null) return <>Loading...</>;

  const cUnit = settings.unit.custom_unit;
  const symbol = settings.unit.symbol;
  const text =
    settings.unit.direction === "right"
      ? `${func.toLocaleString()}${cUnit === "" ? symbol : cUnit}`
      : `${cUnit === "" ? symbol : cUnit}${func.toLocaleString()}`;

  return <h1>{text}</h1>;
}
