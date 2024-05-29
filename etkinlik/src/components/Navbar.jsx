import { Link } from "react-router-dom";
import { useGlobalContext } from "../utils/context";

const Navbar = () => {
  const { setAdminUser, setStorageAdminUser } = useGlobalContext();

  const handleClick = () => {
    setAdminUser(false);
    setStorageAdminUser(null);
  };

  return (
    <nav className="h-14 border-b border-gray-400 flex items-center">
      <h1 className="text-2xl mr-6">Admin Panel</h1>

      <div className="flex items-center space-x-2">
        <Link to="/panel" className="text-lg">
          Etkenlik Ekle
        </Link>
        <Link to="/etkinlik" className="text-lg">
          Etkenlikler İncele
        </Link>
      </div>

      <button onClick={handleClick} className="ml-auto text-lg">
        <Link to="/login">Çıkış Yap</Link>
      </button>
    </nav>
  );
};

export default Navbar;
