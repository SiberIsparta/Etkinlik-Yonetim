import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Activities from "./components/Activities";
import AdminLogin from "./components/AdminLogin";
import Panel from "./components/Panel";
import Toast from "./components/Toast";
import { useGlobalContext } from "./utils/context";
import { useEffect } from "react";
import EditActivity from "./components/EditActivity";

function App() {
  const { message, setMessage } = useGlobalContext();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage({ message: "", type: "" });
    }, 3000);

    return () => clearTimeout(timeout);
  }, [message, setMessage]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/etkinlik" element={<Activities />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/edit/:id" element={<EditActivity />} />
      </Routes>
      {message && (
        <Toast
          message={message.message}
          ExtraStyle={message.type === "error" ? "bg-red-500" : "bg-green-500"}
        />
      )}
    </>
  );
}

export default App;
