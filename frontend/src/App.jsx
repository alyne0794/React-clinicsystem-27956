import { useState } from "react";
import "./App.css";
import Office from "./components/Office";
import OfficeList from "./components/OfficeList";

function App() {
  const [refresh, setRefresh] = useState(0);
  return (
    <div>
      <Office onChange={() => setRefresh((r) => r + 1)} />
      <OfficeList refresh={refresh} />
    </div>
  );
}

export default App;