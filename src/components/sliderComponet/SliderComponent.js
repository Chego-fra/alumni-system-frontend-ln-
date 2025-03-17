"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./SliderComponent.module.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    title: "Stay Connected",
    description: "Join our alumni network today!",
    img: "https://images.unsplash.com/photo-1700777785889-b9b5baa2e92f?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "/",
    buttons: ["Join Now"]
  },
  {
    id: 2,
    title: "Reconnect & Grow",
    description: "Expand your alumni network!",
    img: "/tours.jpg",
    url: "/",
    buttons: ["Connect"]
  },
  {
    id: 3,
    title: "ISTALUMNI",
    description: "Stay updated on events!",
    img: "https://images.pexels.com/photos/5641973/pexels-photo-5641973.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    url: "/",
    buttons: ["View Events" ]
  },
  {
    id: 4,
    title: "Alumni Connect",
    description: "Stay in touch with your peers!",
    img: "https://images.pexels.com/photos/431722/pexels-photo-431722.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", 
    url: "/",
    buttons: ["Join"]
  }

];

const Slider = () => {
  const [current, setCurrent] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);

  useEffect(() => {
    if (!autoSlide) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [current, autoSlide]);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div 
      className={styles.sliderContainer} 
      onMouseEnter={() => setAutoSlide(false)}
      onMouseLeave={() => setAutoSlide(true)}
    >
      {/* Slide Wrapper */}
      <div
  className={styles.sliderWrapper}
  style={{ width: `${slides.length * 100}vw`, transform: `translateX(-${current * 100}vw)` }}>
        {slides.map((slide, index) => (
          <div 
            className={`${styles.slide} ${current === index ? styles.activeSlide : ""}`} 
            key={slide.id}
          >
            <div className={styles.textContainer}>
              <h2 className={styles.description}>{slide.description}</h2>
              <h1 className={styles.title}>{slide.title}</h1>
              <Link href={slide.url}>
                <button className={styles.button}>{slide.buttons}</button>
              </Link>
            </div>
            <div className={styles.imageContainer}>
              <Image src={slide.img} alt={slide.title} layout="fill" objectFit="cover" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Left Arrow */}
      <button className={styles.leftArrow} onClick={prevSlide}>
        <FaArrowLeft size={24} />
      </button>
      
      {/* Right Arrow */}
      <button className={styles.rightArrow} onClick={nextSlide}>
        <FaArrowRight size={24} />
      </button>

      {/* Dots Navigation */}
      <div className={styles.dotsContainer}>
        {slides.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${current === index ? styles.activeDot : ""}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
