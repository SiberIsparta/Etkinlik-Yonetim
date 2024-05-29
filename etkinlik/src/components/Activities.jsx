import { useGSAP } from "@gsap/react";
import ActivityCard from "./ActivityCard";
import gsap from "gsap";
import logo from "../assets/logo.png";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../utils/context";
import { getAllActivities } from "../utils/firebase";
import { AiOutlineLoading } from "react-icons/ai";

const Activities = () => {
  const { setMessage, deletedActivity, StorageAdminUser } = useGlobalContext();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const response = await getAllActivities();
        if (response.success) {
          setActivities(response.activities);
        } else {
          setMessage({ message: "Etkinlikler yüklenemedi", type: "error" });
        }
        setLoading(false);
      } catch (error) {
        setMessage({ message: "Etkinlikler yüklenemedi", type: "error" });
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    if (deletedActivity) {
      setActivities((prev) =>
        prev.filter((activity) => activity.id !== deletedActivity)
      );
    }
  }, [deletedActivity]);

  useGSAP(() => {
    gsap.from("#title", { opacity: 0, y: -50, duration: 1, delay: 0.5 });
  }, []);

  return (
    <div className="relative flex flex-col items-center h-screen gap-y-8 lg:gap-y-14 pt-8">
      <div
        className="w-full text-center flex items-center justify-center"
        id="title"
      >
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className=" w-16 bg-white rounded-full logo ml-4 shadow-md"
          />
        </Link>
        <h1 className="text-3xl lg:text-6xl font-serif flex-1">
          Etkinliklerimiz
        </h1>
        {StorageAdminUser && (
          <Link to="/panel" className="text-lg lg:text-2xl">
            Yönetim Paneli
          </Link>
        )}
      </div>

      <div className="w-full min-h-0.5 bg-slate-500"></div>

      <div className="w-full pb-10 lg:px-24 px-10 flex flex-col items-center space-y-6">
        {loading && (
          <div className="flex items-center justify-center w-full h-96">
            <AiOutlineLoading className="text-6xl animate-spin" />
          </div>
        )}

        {!loading && activities.length === 0 ? (
          <h1 className="text-2xl lg:text-4xl font-serif text-center">
            Etkinlik bulunamadı
          </h1>
        ) : (
          activities.map((activity, index) => {
            return (
              <ActivityCard key={activity.id} index={index} {...activity} />
            );
          })
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Activities;
