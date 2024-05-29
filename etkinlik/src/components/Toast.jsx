import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import propTypes from "prop-types";
import { useEffect } from "react";

const Toast = ({ message, ExtraStyle }) => {
  let toastAnimation = null;

  useGSAP(() => {
    toastAnimation = gsap.from("#toast", {
      duration: 0.5,
      y: 100,
      opacity: 0,
      ease: "power2.out",
      delay: 0.5,
    });
  }, [message]);

  useEffect(() => {
    return () => {
      if (toastAnimation) {
        toastAnimation.kill();
      }
    };
  }, []);

  // if (!message) return null;

  return (
    <div
      id="toast"
      className={`${
        ExtraStyle ? ExtraStyle : "bg-green-500"
      } fixed bottom-0 right-0 p-4 m-4 text-white rounded-md ${
        message ? "block" : "hidden"
      }`}
    >
      {message}
    </div>
  );
};

Toast.propTypes = {
  message: propTypes.string,
  ExtraStyle: propTypes.string,
};

export default Toast;
