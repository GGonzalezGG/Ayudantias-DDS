// App.jsx
import React, { useState } from "react";
import UsestatePage from "./UsestatePage";
import UseeffectPage from "./UseeffectPage";
import UsereducerPage from "./UsereducerPage";
import UsecontextPage from "./UsecontextPage";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Ayudantía React: Hooks</h1>
      {page === "home" && (
        <div>
          <button onClick={() => setPage("usestate")}>useState</button>
          <button onClick={() => setPage("useeffect")}>useEffect</button>
          <button onClick={() => setPage("usereducer")}>useReducer</button>
          <button onClick={() => setPage("usecontext")}>useContext</button>
        </div>
      )}

      {page === "usestate" && <UsestatePage />}
      {page === "useeffect" && <UseeffectPage />}
      {page === "usereducer" && <UsereducerPage />}
      {page === "usecontext" && <UsecontextPage />}
    </div>
  );
}

export default App;

