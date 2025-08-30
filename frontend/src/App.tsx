import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
function App() {
  //   const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
