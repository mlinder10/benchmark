import FuncBtn from "./common/FuncBtn";
import useMonday from "./common/useMonday";
import Widget from "./Widget";

export default function App() {
  const { theme, func, settings } = useMonday();

  return (
    <main className={theme}>
      <Widget func={func} settings={settings} />
      <FuncBtn settings={settings} />
    </main>
  );
}
