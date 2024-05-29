import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { RiAdminFill } from "react-icons/ri";
import Footer from "./Footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Home = () => {
  useGSAP(() => {
    gsap.from(".title", { opacity: 0, y: -50, duration: 1, delay: 0.5 });
    gsap.from(".actionBtn", { opacity: 0, y: 50, duration: 1, delay: 1 });
    gsap.from(".logo", { opacity: 0, x: -50, duration: 1, delay: 0.5 });
  });

  return (
    <>
      <div className="relative flex flex-col items-center justify-center h-screen gap-y-12 lg:gap-y-24">
        <Link to="/login">
          <RiAdminFill className="absolute top-10 right-10 text-gray-300 text-xl rounded-full hover:text-gray-500 transition duration-300 ease-in-out" />
        </Link>
        <img
          src={logo}
          alt="logo"
          className="absolute top-4 left-4 lg:top-2 lg:left-0 w-20 lg:w-40 bg-white rounded-full logo"
        />
        <h1 className="text-3xl lg:text-6xl text-center title">
          Isparta Belediyesi Kültür Sanat Merkezi{" "}
          <span className="text-orange-500 block">
            Etkinliklerine Hoşgeldiniz
          </span>
        </h1>

        <div className="w-1/2 flex items-center justify-center actionBtn">
          <Link to={"/etkinlik"}>
            <button className="text-xl lg:text-3xl">
              Etkinlikler <span className="text-orange-500">Göster</span>
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
