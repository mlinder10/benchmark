import useMonday from "./useMonday";
import Widget from "./Widget";

export default function App() {
  const { theme, func, settings } = useMonday();

  return (
    <main className={theme}>
      <Widget func={func} settings={settings} />
    </main>
  );
}
