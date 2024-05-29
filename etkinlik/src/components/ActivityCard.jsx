/* eslint-disable react/prop-types */
import { useGSAP } from "@gsap/react";
import imageLocal from "../assets/Logo-bg.jpeg";
import gsap from "gsap";
import { useRef, useState } from "react";
import { useGlobalContext } from "../utils/context";
import { deleteActivity } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const ActivityCard = (props) => {
  const { index, id, title, description, date, time, quota, image, salon } =
    props;
  const navigate = useNavigate();
  const { StorageAdminUser, setMessage, setDeletedActivity } =
    useGlobalContext();
  const [loading, setLoading] = useState(false);
  const cardRef = useRef(null);

  useGSAP(() => {
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.5 * index,
    });
  }, []);

  const handleEdit = (
    id,
    title,
    description,
    date,
    time,
    quota,
    image,
    salon
  ) => {
    navigate(`/edit/${id}`, {
      state: { id, title, description, date, time, quota, image, salon },
    });
  };

  const handleDelete = async (id, image) => {
    setLoading(true);
    try {
      const res = await deleteActivity(id, image);
      if (res.success) {
        setMessage({ message: res.message, type: "success" });
        setDeletedActivity(id);
      } else {
        setMessage({ message: res.message, type: "error" });
      }
    } catch (error) {
      setMessage({ message: "Hata!! Etkinlik silinemedi", type: "error" });
    }
  };

  return (
    <div className="flex flex-col w-full" ref={cardRef}>
      <div className="max-md:relative w-full bg-slate-300 rounded-lg overflow-hidden flex max-md:flex-col lg:h-60 border border-zinc-300 shadow-md">
        <div className="lg:w-1/3 max-md:absolute max-md:top-0 max-md:left-0 flex items-center justify-center max-md:h-full z-10">
          <img
            src={image ? image : imageLocal}
            alt="image"
            className="object-cover h-full object-center w-full"
          />
        </div>

        <div className="max-md:hidden w-0.5 h-full bg-slate-400"></div>

        <div className="flex-1 max-md:px-4 max-md:py-8 max-md:h-full max-md:space-y-4 lg:p-10 bg-zinc-200 max-md:bg-slate-600 max-md:opacity-75 z-50 flex flex-col lg:justify-between max-md:text-white">
          <h1 className="text-2xl font-bold max-md:text-3xl lg:text-4xl break-words">
            {title.length > 50 ? `${title.slice(0, 50)}...` : title}
          </h1>
          <p className="text-lg">
            {description.length > 100
              ? `${description.slice(0, 100)}...`
              : description}
          </p>
          <p>
            Tarihi: {date} - {time} / Kontenjan: {quota}
          </p>
          <p>
            <span className="font-bold">Salon:</span> {salon}
          </p>
        </div>

        <div className="h-full max-md:h-10 flex items-center justify-center z-50 bg-orange-600 hover:bg-orange-300 transition duration-300 ease-in-out">
          <a
            href="#"
            className="h-full flex items-center justify-center w-full text-white font-bold font-mono px-2 hover:text-black transition duration-300 ease-in-out"
          >
            Rezervasyon
          </a>
        </div>
      </div>
      {StorageAdminUser && (
        <div className="w-full flex justify-end items-center space-x-3 mt-2">
          <button
            className="text-blue-500"
            onClick={() =>
              handleEdit(
                id,
                title,
                description,
                date,
                time,
                quota,
                image,
                salon
              )
            }
          >
            Düzenle
          </button>
          <button
            className="text-red-500"
            onClick={() => handleDelete(id, image)}
          >
            {loading ? "Siliniyor..." : "Sil"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityCard;
