import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Resetpassword from "./pages/Resetpassword";
function App() {
  //   const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/resetpassword" element={<Resetpassword />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
