import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useGlobalContext } from "../utils/context";
import { useEffect, useRef, useState } from "react";
import { addActivity } from "../utils/firebase";

const Panel = () => {
  const navigate = useNavigate();
  const { StorageAdminUser, setMessage } = useGlobalContext();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    quota: 0,
    salon: "A",
    image: "",
  });
  const [loading, setLoading] = useState(false);

  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);
  const quotaRef = useRef(null);
  const salonRef = useRef(null);

  useEffect(() => {
    if (!StorageAdminUser) {
      navigate("/login");
    }
  }, [StorageAdminUser, navigate]);

  const clearInputs = () => {
    setForm({
      ...form,
      title: "",
      description: "",
      date: "",
      time: "",
      quota: 0,
      image: "",
    });
    imageRef.current.value = "";
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    dateRef.current.value = "";
    timeRef.current.value = "";
    quotaRef.current.value = "";
    salonRef.current.value = "A";
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;

    if (name === "image") {
      const file = e.target.files[0];
      if (file.size > 1000000) {
        setMessage({
          message: "Resim boyutu 1mb'dan küçük olmalıdır",
          type: "error",
        });
        return;
      }

      const storage = getStorage();
      const storageRef = ref(storage, `images/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // const progress =
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
            case "paused":
              setMessage({
                message: "Upload is paused",
                type: "error",
              });
              break;
            default:
              break;
          }
        },
        (error) => {
          setMessage({
            message: error.message,
            type: "error",
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setForm({ ...form, [name]: downloadURL });
            setMessage({
              message: "Resim yüklendi",
              type: "success",
            });
          });
        }
      );
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!StorageAdminUser) {
      setLoading(false);
      return;
    }

    if (
      !form.title ||
      !form.description ||
      !form.date ||
      !form.time ||
      !form.quota
    ) {
      setMessage({
        message: "Tüm alanları doldurunuz",
        type: "error",
      });
      setLoading(false);
      return;
    }

    if (form.quota < 0) {
      setMessage({
        message: "Kontenjan 0'dan küçük olamaz",
        type: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const res = await addActivity(form);

      if (!res.success) {
        setMessage({
          message: res.message,
          type: "error",
        });
        setLoading(false);
        return;
      }

      setMessage({
        message: res.message,
        type: "success",
      });
      setLoading(false);

      clearInputs();
    } catch (error) {
      setMessage({
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <>
      <Navbar />

      <div className="relative flex flex-col gap-y-4 items-center mt-8 mb-14">
        <h1 className="text-center text-4xl font-bold">Etkinlik Formu</h1>
        <div className="w-[50vw] py-8 px-10 border border-gray-400 rounded-lg shadow-lg">
          <div className="">
            <label htmlFor="image" className="block text-lg font-semibold">
              Resim:
            </label>
            <input
              type="file"
              id="image"
              className=" w-full p-2 border border-gray-400 rounded-lg mt-2"
              name="image"
              onChange={handleChanges}
              ref={imageRef}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="title" className="block text-lg font-semibold">
              Etkinlik Ad:
            </label>
            <input
              type="text"
              id="title"
              className=" w-full p-2 border border-gray-400 rounded-lg mt-2"
              name="title"
              onChange={handleChanges}
              ref={titleRef}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="description"
              className="block text-lg font-semibold"
            >
              Açıklama:
            </label>
            <input
              type="text"
              id="description"
              className=" w-full p-2 border border-gray-400 rounded-lg mt-2"
              name="description"
              onChange={handleChanges}
              ref={descriptionRef}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="date" className="block text-lg font-semibold">
              Tarih:
            </label>
            <input
              type="date"
              id="date"
              className=" w-full p-2 border border-gray-400 rounded-lg mt-2"
              name="date"
              onChange={handleChanges}
              ref={dateRef}
            />
          </div>

          <div className="mt-4">
            <label htmlFor="time" className="block text-lg font-semibold">
              Saat:
            </label>
            <input
              type="time"
              id="time"
              className=" w-full p-2 border border-gray-400 rounded-lg mt-2"
              name="time"
              onChange={handleChanges}
              ref={timeRef}
            />
          </div>

          <div className="mt-4 flex items-center space-x-2">
            <div className="flex-1">
              <label htmlFor="quota" className="block text-lg font-semibold">
                kontenjan:
              </label>
              <input
                type="number"
                id="quota"
                className=" w-full p-2 border border-gray-400 rounded-lg mt-2"
                min={0}
                name="quota"
                onChange={handleChanges}
                ref={quotaRef}
              />
            </div>

            <div className="flex-1">
              <label htmlFor="salon" className="block text-lg font-semibold">
                Salonu:
              </label>
              <select
                id="salon"
                className=" w-full p-2 border border-gray-400 rounded-lg mt-2"
                name="salon"
                onChange={handleChanges}
                ref={salonRef}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
          </div>

          <button
            className="w-full bg-blue-500 text-white text-lg font-semibold py-2 mt-6 rounded-lg hover:bg-blue-600 transition-all duration-200"
            onClick={handleSubmit}
          >
            {loading ? "Yükleniyor..." : "Etkinliği Ekle"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Panel;
