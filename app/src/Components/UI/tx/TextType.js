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
  animate = true, // ⭐ ახალი
  inf,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const [isFinished, setIsFinished] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const hasTypedRef = useRef(false);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  const finalText = Array.isArray(text) ? text[0] : text;

  // ⭐ თუ animation გამორთულია,
  // ტექსტი პირდაპირ მთლიანად გამოჩნდეს
  useEffect(() => {
    if (!animate) {
      setDisplayedText(finalText);
      setCurrentCharIndex(finalText.length);
      setIsFinished(true);
      hasTypedRef.current = true;
    }
  }, [animate, finalText]);

  // Cursor blink
  useEffect(() => {
    if (!showCursor || !cursorRef.current || !animate) return;

    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    return () => {
      gsap.killTweensOf(cursorRef.current);
    };
  }, [showCursor, cursorBlinkDuration, animate]);

  // Start on visible
  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [startOnVisible]);

  // Typing effect
  useEffect(() => {
    // ⭐ ძველი მესიჯია → typing საერთოდ არ გაეშვას
    if (!animate) return;

    if (!isVisible) return;

    if (hasTypedRef.current) return;

    if (currentCharIndex >= finalText.length) {
      hasTypedRef.current = true;
      setIsFinished(true);
      return;
    }

    const timeout = setTimeout(
      () => {
        setDisplayedText((prev) => {
          return prev + finalText[currentCharIndex];
        });

        setCurrentCharIndex((prev) => prev + 1);
      },
      currentCharIndex === 0 ? initialDelay : typingSpeed,
    );

    return () => clearTimeout(timeout);
  }, [
    currentCharIndex,
    isVisible,
    finalText,
    typingSpeed,
    initialDelay,
    animate,
  ]);

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `whitespace-pre-wrap break-words ${className}`,
      style: { lineHeight: 1.4 },
      ...props,
    },
    <>
      {inf === "carscalc" ? (
        <>
          <div
            className={`overflow-hidden xxxl:overflow-visible transition-all duration-300
            ${
              expanded
                ? "xl:max-h-[450px] overflow-y-auto"
                : "max-h-[250px] overflow-hidden"
            }
            xxxl:max-h-none xxxl:overflow-visible`}
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {displayedText}
          </div>

          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-3 cursor-target text-blue-500 block xl:hidden xxl:block xxxl:hidden"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        </>
      ) : inf === "carscalc2" ? (
        <>
          <div
            className={`overflow-hidden xl:overflow-visible transition-all duration-300
            ${
              expanded
                ? "max-h-[350px] overflow-y-auto"
                : "max-h-[250px] overflow-hidden"
            }
            xl:max-h-none xl:overflow-visible`}
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {displayedText}
          </div>

          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-3 cursor-target text-blue-500 block xl:hidden"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        </>
      ) : inf === "about" ? (
        <>
          <div
            className={`overflow-hidden lg:overflow-visible transition-all duration-300
            ${
              expanded
                ? "max-h-[450px] overflow-y-auto"
                : "max-h-[310px] overflow-hidden"
            }
            lg:max-h-none lg:overflow-visible`}
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {displayedText}
          </div>

          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-3 cursor-target text-blue-500 lg:hidden"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        </>
      ) : (
        <div
          className="overflow-visible transition-all duration-300 max-h-none"
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {displayedText}

          {/* ⭐ cursor მხოლოდ ახალი ტექსტის წერისას */}
          {showCursor && animate && !isFinished && (
            <span ref={cursorRef} className={cursorClassName}>
              {cursorCharacter}
            </span>
          )}
        </div>
      )}
    </>,
  );
};

export default TextType;
