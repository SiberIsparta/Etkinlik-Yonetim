import Siberlogo from "../assets/siberlogo.png";
import BelediyeLogo from "../assets/BELEDİYE.png";
import SukruLogo from "../assets/sukru.png";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="h-56 w-full border-t border-gray-400 flex justify-center mb-10 py-6">
      <div className="max-w-screen-lg h-full w-full flex flex-col lg:flex-row items-center justify-between">
        <div className="h-full flex items-center space-x-2">
          <img
            src={Siberlogo}
            alt=""
            className="h-full object-cover object-center shadow-lg border border-zinc-300 rounded-md"
          />

          <div className="h-full flex flex-col space-y-1">
            <img
              src={BelediyeLogo}
              alt=""
              className="h-1/2 object-cover object-center"
            />
            <img
              src={SukruLogo}
              alt=""
              className="h-1/2 object-cover object-center shadow-md border border-zinc-300 rounded-md"
            />
          </div>
        </div>

        <div className="h-full flex flex-col gap-y-2 max-md:items-center max-md:py-10 max-md:text-center">
          <Link
            to="https://www.isparta.bel.tr/iletisim"
            className="text-2xl font-mono font-semibold text-gray-700 hover:text-gray-400 transition duration-300 ease-in-out"
            rel="noreferrer"
            target="_blank"
          >
            Isparta Belediyesi
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            to="https://siber.isparta.bel.tr/"
            className="text-2xl font-mono font-semibold text-gray-700 hover:text-gray-400 transition duration-300 ease-in-out"
          >
            Siber Isparta Gençlik Merkezi
          </Link>
          <p className="mt-auto max-md:pb-14">
            Bu proje{" "}
            <span className="text-orange-500 font-semibold">Siber Isparta</span>{" "}
            tarafından geliştirilmistir.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
