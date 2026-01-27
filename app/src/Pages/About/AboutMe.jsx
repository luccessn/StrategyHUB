import React, { useEffect, useRef, useState } from "react";
import ProfileCard from "../../Components/UI/About/ProfileCard";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import TextType from "../../Components/UI/tx/TextType";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FloatingDock } from "../../Components/UI/About/FloatingDock";
import { AnimatedTestimonials } from "../../Components/UI/About/AnimatedTestimonials";
import CardSwap, { Card } from "../../Components/UI/About/CardSwap";

const links = [
  {
    title: "Github",
    icon: (
      <FaGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },

  {
    title: "LinkedinIn",
    icon: (
      <FaLinkedinIn className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "Youtube",
    icon: (
      <FaYoutube className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
];
///
///
const testimonials = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    designation: "Product Manager at TechFlow",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    designation: "CTO at InnovateSphere",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    designation: "Operations Director at CloudScale",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    designation: "Engineering Lead at DataPro",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    designation: "VP of Technology at FutureNet",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
export const AboutMe = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-200px 0px 0px 0px",
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);
  return (
    <div className="flex m-20  flex-row gap-5">
      <div className=" w-[400px] flex flex-col gap-5">
        <ProfileCard
          name="Lucca Sseny"
          title="Developer"
          handle="javicodes"
          status="Online"
          contactText="Contact Me"
          avatarUrl="https://i.postimg.cc/NFxZbB0j/myprofile.png"
          showUserInfo={false}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => console.log("Contact clicked")}
          showIcon
          showBehindGlow
          behindGlowColor="rgba(125, 190, 255, 0.67)"
          customInnerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
        />
        <div className="flex items-center justify-center   w-full">
          <FloatingDock
            mobileClassName="translate-y-20" // only for demo, remove for production
            items={links}
          />
        </div>
      </div>
      <div className=" mt-5  flex flex-col gap-6  text-white w-full">
        <div className="max-w-7xl  mx-auto text-center" ref={ref}>
          <p className="font-panchangSB text-xl md:text-4xl text-white ">
            Welcome to{" "}
            <span className="text-neutral-400">
              {"My Hub".split("").map((letter, idx) => (
                <motion.span
                  key={idx}
                  className="inline-block"
                  initial={{ x: -10, opacity: 0 }}
                  animate={hasAnimated ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.04 }}
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          </p>
          {/* <p className="text-sm font-satosIT md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
            We are analyzing your car, track, and intentions to build the
            smartest strategy for your race — from high-pressure competition to
            laid-back driving.
          </p> */}
        </div>
        <div className="flex flex-row ">
          <div className="w-[750px]">
            <TextType
              // key={`about-title-${selectedCard.title}`}
              as="p"
              className="text-xl font-satosIT font-bold"
              text={
                "  I would like to introduce my self and my project Strategy Hub , which is created for every auto and motosport fans as me . Thats webste hase gave us as the knowledge about the tracks , cars and their conditions also it gives us the strong and correctly exactly strategy for our race or just improving our skils."
              }
              typingSpeed={10}
            />
          </div>
          {/* <div>
          <AnimatedTestimonials testimonials={testimonials} />
        </div> */}
          <div style={{ height: "400px" }}>
            <CardSwap
              cardDistance={60}
              verticalDistance={70}
              delay={5000}
              pauseOnHover={false}
            >
              <Card>
                <div className="flex flex-col gap-2">
                  <h3 className=" font-satosIT pl-2 text-base font-bold ">
                    Front-End
                  </h3>
                  <img
                    src="https://i.postimg.cc/hG82xgPZ/front-end.png"
                    alt=""
                  />
                </div>
              </Card>
              <Card>
                <div className="flex flex-col gap-2">
                  <h3 className=" font-satosIT pl-2 text-base font-bold ">
                    Back-End
                  </h3>
                  <img
                    src="https://i.postimg.cc/nLL1smgr/back-end.png"
                    alt=""
                  />
                </div>
              </Card>
              <Card>
                <div className="flex flex-col gap-2">
                  <h3 className=" font-satosIT pl-2 text-base font-bold ">
                    Ai Funct
                  </h3>
                  <img src="https://i.postimg.cc/tTZtkj9m/ai.png" alt="" />
                </div>
              </Card>
            </CardSwap>
          </div>
        </div>
      </div>
    </div>
  );
};
