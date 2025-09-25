import { useState } from "react";

export default function SimpleCarousel() {
  const images = [
    "https://via.placeholder.com/400x200?text=Slide+1",
    "https://via.placeholder.com/400x200?text=Slide+2",
    "https://via.placeholder.com/400x200?text=Slide+3"
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div style={{ width: "400px", margin: "20px auto", textAlign: "center" }}>
      <img
        src={images[current]}
        alt="carousel"
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <div style={{ marginTop: "10px" }}>
        <button onClick={prevSlide}>⬅ Prev</button>
        <button onClick={nextSlide} style={{ marginLeft: "10px" }}>
          Next ➡
        </button>
      </div>
    </div>
  );
}