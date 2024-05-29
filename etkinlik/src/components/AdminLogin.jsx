import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { useGlobalContext } from "../utils/context";
import { adminLogin } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { StorageAdminUser, setStorageAdminUser, setAdminUser, setMessage } =
    useGlobalContext();
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { username, password } = values;
    if (username === "" || password === "") {
      setMessage({ message: "Lütfen tüm alanları doldurun", type: "error" });
      setLoading(false);
      return;
    }

    try {
      const response = await adminLogin(username, password);
      if (response.success) {
        setAdminUser(true);
        setStorageAdminUser(true);
        setMessage({ message: response.message, type: "success" });
        navigate("/panel");
      } else {
        setMessage({ message: response.message, type: "error" });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setMessage({ message: "Bir hata oluştu", type: "error" });
      console.log(error);
    }
  };

  useEffect(() => {
    if (StorageAdminUser) {
      navigate("/panel");
    }
  }, [StorageAdminUser, navigate]);

  return (
    <div className="h-screen relative flex flex-col justify-center items-center">
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className="absolute top-2 left-0 w-40 bg-white rounded-full shadow-lg"
        />
      </Link>
      <div className="w-96 bg-white py-10 px-8 rounded-lg border border-zinc-300 shadow-2xl">
        <h1 className="text-3xl text-center text-black mb-6">Admin Panel</h1>
        <form className="flex flex-col gap-y-4 p-4">
          <input
            type="text"
            placeholder="İsim"
            className="border border-gray-300 bg-white p-2"
            name="username"
            onChange={handleChanges}
          />
          <input
            type="password"
            placeholder="Şifre"
            className="border border-gray-300 bg-white p-2"
            name="password"
            onChange={handleChanges}
          />
          <button
            className="bg-blue-500 text-white p-2"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
