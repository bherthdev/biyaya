import { useEffect, useRef, useState } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
export default function Carousel({ slides }) {
  let [current, setCurrent] = useState(0);

  const intervalRef = useRef(null); // useRef to store the interval ID

  const startAutoSlide = () => {
    // Clear any existing interval
    clearInterval(intervalRef.current);

    // Start a new interval
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
  };

  useEffect(() => {
    startAutoSlide(); // Start the interval when the component mounts

    return () => clearInterval(intervalRef.current); // Clean up the interval on component unmount
  }, []);

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
    startAutoSlide(); // Reset the interval

  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
    startAutoSlide(); // Reset the interval
  };




  return (
    <div className="overflow-hidden bg-gray-900 absolute  h-full w-full opacity-80">
      <div
        className={`flex transition ease-in-out duration-1000`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s, idx) => {
          return <img key={idx} src={s} />;
        })}
      </div>

      <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
        <button onClick={previousSlide} >
          <BsFillArrowLeftCircleFill />
        </button>
        <button onClick={nextSlide}>
          <BsFillArrowRightCircleFill />
        </button>
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {slides.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-2 h-2 cursor-pointer  ${i == current ? "bg-gray-200" : "bg-gray-500"
                }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}