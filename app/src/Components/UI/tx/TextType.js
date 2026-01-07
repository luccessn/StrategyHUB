"use client";

import { useEffect, useRef, useState, createElement } from "react";
import { gsap } from "gsap";

const TextType = ({
  text,
  as: Component = "div",
  typingSpeed = 50,
  initialDelay = 0,
  className = "",
  showCursor = true,
  cursorCharacter = "_",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  startOnVisible = false,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);

  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  const finalText = Array.isArray(text) ? text[0] : text;

  // Cursor blink
  useEffect(() => {
    if (!showCursor || !cursorRef.current) return;

    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });
  }, [showCursor, cursorBlinkDuration]);

  // Start on visible
  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  // Typing effect
  useEffect(() => {
    if (!isVisible) return;
    if (currentCharIndex >= finalText.length) return;

    const timeout = setTimeout(
      () => {
        setDisplayedText((prev) => prev + finalText[currentCharIndex]);
        setCurrentCharIndex((prev) => prev + 1);
      },
      currentCharIndex === 0 ? initialDelay : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentCharIndex, finalText, typingSpeed, initialDelay, isVisible]);

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `inline-block whitespace-pre-wrap ${className}`,
      ...props,
    },
    <>
      <span>{displayedText}</span>
      {showCursor && (
        <span ref={cursorRef} className={`ml-1 ${cursorClassName}`}>
          {cursorCharacter}
        </span>
      )}
    </>
  );
};

export default TextType;
