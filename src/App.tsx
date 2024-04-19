import useMonday from "./useMonday";

export default function App() {
  const { theme } = useMonday();

  return <div className={theme}>app</div>;
}
