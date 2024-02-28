import React, { useEffect, useState } from "react";
import "./SlidesStyle.css";

interface ISlideProps {
  items: React.ReactElement[];
}

const Slide: React.FunctionComponent<ISlideProps> = ({ items }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  let change = false;

  function changeSlide(n: number) {
    let newIndex = n;
    if (n < 0) {
      newIndex = items.length - 1;
    } else if (n > items.length - 1) {
      newIndex = 0;
    }
    change = true;
    setSlideIndex(newIndex);
  }

  function showSlides() {
    let i;
    let newIndex = slideIndex;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    for (i = 0; i < slides.length; i += 1) {
      slides[i].setAttribute("style", "display:none;");
      dots[i].className = dots[i].className.replace(" active", "");
    }
    newIndex += 1;
    if (newIndex >= slides.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = slides.length - 1;
    }

    slides[newIndex].setAttribute("style", "display:block;");
    dots[newIndex].className += " active";

    setTimeout(() => {
      if (change) {
        change = false;
      } else {
        setSlideIndex(newIndex);
      }
    }, 5000);
  }

  useEffect(() => {
    showSlides();
  });
  return (
    <div>
      <div className="slideshow-container">
        {items.map((item) => (
          <div className="mySlides fade" key={item.key}>
            {item}
          </div>
        ))}

        <button
          type="button"
          className="prev"
          onClick={() => {
            changeSlide(slideIndex - 1);
          }}
        >
          &#10094;
        </button>
        <button
          type="button"
          className="next"
          onClick={() => {
            changeSlide(slideIndex + 1);
          }}
        >
          &#10095;
        </button>
      </div>

      <div className="dots">
        {items.map((item, i) => (
          <button
            type="button"
            className="dot"
            onClick={() => {
              changeSlide(i - 1);
            }}
            key={item.key}
          >
            {" "}
          </button>
        ))}
      </div>
    </div>
  );
};
export default Slide;
