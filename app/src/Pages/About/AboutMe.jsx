import { ReactLenis } from "lenis/dist/lenis-react";
import React, { useEffect, useRef, useState } from "react";
import ProfileCard from "../../Components/UI/About/ProfileCard";
import TextType from "../../Components/UI/tx/TextType";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FloatingDock } from "../../Components/UI/About/FloatingDock";
import { AnimatedTestimonials } from "../../Components/UI/About/AnimatedTestimonials";
// import CardSwap, { Card } from "../../Components/UI/About/CardSwap";
import { SmoothScrollHero } from "../../Components/About/SmoothScrollHero";
//
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import LogoLoop from "../../Components/UI/Border/LogoLoop";
import { FaNodeJs } from "react-icons/fa6";
import { FaJava } from "react-icons/fa";
import { IoLogoPython } from "react-icons/io5";
import { FaReact } from "react-icons/fa";
import { DiNodejs } from "react-icons/di";
import { BiLogoMongodb } from "react-icons/bi";
import { RiTailwindCssFill } from "react-icons/ri";
import { RiPhpLine } from "react-icons/ri";
import { FaLaravel } from "react-icons/fa";
import { BiLogoFlask } from "react-icons/bi";
import { BiLogoDjango } from "react-icons/bi";
import { ExpandleCardForAbout } from "../../Components/About/ExpandableCardForAbout";
const links = [
  {
    title: "Github",
    icon: (
      <FaGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "https://github.com/luccessn",
  },

  {
    title: "LinkedinIn",
    icon: (
      <FaLinkedinIn className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "https://www.linkedin.com/in/luka-gulua-679041319/",
  },
  {
    title: "Youtube",
    icon: (
      <FaYoutube className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "https://www.youtube.com/@sseny17.42",
  },
];
//
//

const techLogos = [
  { node: <FaNodeJs />, title: "JS" },
  { node: <FaJava />, title: "java" },
  { node: <IoLogoPython />, title: "pythone" },
  { node: <FaReact />, title: "react" },
  { node: <DiNodejs />, title: "nodejs" },
  { node: <BiLogoMongodb />, title: "mongoDB" },
  { node: <RiTailwindCssFill />, title: "tailwind" },
  { node: <RiPhpLine />, title: "php" },
  { node: <FaLaravel />, title: "laravel" },
  { node: <BiLogoFlask />, title: "flask" },
  { node: <BiLogoDjango />, title: "django" },
];
///
///

export const AboutMe = () => {
  return (
    <div className="relative h-[2000px]  flex flex-col gap-5 ">
      {/* <ReactLenis
        root
        options={{
          // Learn more -> https://github.com/darkroomengineering/lenis?tab=readme-ov-file#instance-settings
          lerp: 0.03,
          //   infinite: true,
          //   syncTouch: true,
        }}
      > */}
      {/* <Nav /> */}
      <FirstTab />
      <section className="relative grid  w-full place-content-center  bg-neutral-950">
        <Cards />
      </section>
      <div className="relative top-60 flex flex-col gap-14">
        <div className="">
          <motion.div
            initial={{ opacity: 0.1, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: "linear" }}
            viewport={{ once: false, amount: 0.4 }}
          >
            {/* Basic horizontal loop */}
            <LogoLoop
              logos={techLogos}
              speed={120}
              direction="left"
              logoHeight={55}
              gap={45}
              hoverSpeed={80}
              scaleOnHover
              fadeOut
              // fadeOutColor="#ffffff"
              className="text-white"
              ariaLabel="Technology partners"
            />
          </motion.div>
          {/* Vertical loop with deceleration on hover */}
        </div>
        <ExpandleCardForAbout />
      </div>
    </div>
  );
};

// const Hero = () => {
//   return (
//     <div
//       style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
//       className="relative w-full"
//     >
//       {/* <CenterImage /> */}
//       <FirstTab />

//       <div className="absolute bottom-0 left-0 right-0 h-96 " />
//     </div>
//   );
// };

//
//
const FirstTab = () => {
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
    <div className="flex m-20 flex-row gap-5">
      {/* LEFT SIDE */}
      <div className="w-[400px] flex flex-col gap-5">
        <ProfileCard
          name="Lucca Gulua"
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

        <div className="flex items-center justify-center w-full">
          <FloatingDock mobileClassName="translate-y-20" items={links} />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="mt-5 flex flex-col  gap-10 text-white w-full">
        <div className=" mx-auto text-center" ref={ref}>
          <p className="font-panchangSB text-xl md:text-4xl">
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
        </div>

        <div className="flex flex-row  ">
          <div className="w-full mx-auto max-w-[1150px]  ">
            <TextType
              as="p"
              className="text-xl font-satosIT font-bold"
              text={`I would like to introduce my project, StrategyHub, which is created for every auto and motorsport fan who wants precise answers and effective strategies.

This website provides valuable knowledge about major racing tracks, cars, and their conditions, all of which influence our AI-generated insights. Initially, the platform offers global information about well-known tracks and cars that have already been analyzed and measured.

In addition, we have an AI-powered system where users can receive personalized strategies and knowledge based on their specific goals. Whether the purpose is improving driving skills, preparing for qualifying, winning a race, or achieving the fastest lap, the platform delivers tailored strategic plans.

I believe that this website will be especially helpful for motorsport enthusiasts like me who seek accurate and reliable information about tracks, cars, and their performance options. This opportunity gives users the confidence to move closer to their goals in motorsport.

As for the technical side of the project, the frontend is built using React and Tailwind CSS. The backend is developed with Node.js and Express, with MongoDB as the database. The AI engine is implemented in Python using Flask.`}
              typingSpeed={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
//

// const Schedule = () => {
//   return (
//     <section
//       id="launch-schedule"
//       className="mx-auto max-w-5xl px-4 py-48 text-white"
//     >
//       <motion.h1
//         initial={{ y: 48, opacity: 0 }}
//         whileInView={{ y: 0, opacity: 1 }}
//         transition={{ ease: "easeInOut", duration: 0.75 }}
//         className="mb-20 text-4xl font-black uppercase text-zinc-50"
//       >
//         Launch Schedule
//       </motion.h1>
//       <ScheduleItem title="NG-21" date="Dec 9th" location="Florida" />
//       <ScheduleItem title="Starlink" date="Dec 20th" location="Texas" />
//       <ScheduleItem title="Starlink" date="Jan 13th" location="Florida" />
//       <ScheduleItem title="Turksat 6A" date="Feb 22nd" location="Florida" />
//       <ScheduleItem title="NROL-186" date="Mar 1st" location="California" />
//       <ScheduleItem title="GOES-U" date="Mar 8th" location="California" />
//       <ScheduleItem title="ASTRA 1P" date="Apr 8th" location="Texas" />
//     </section>
//   );
// };

// const ScheduleItem = ({ title, date, location }) => {
//   return (
//     <motion.div
//       initial={{ y: 48, opacity: 0 }}
//       whileInView={{ y: 0, opacity: 1 }}
//       transition={{ ease: "easeInOut", duration: 0.75 }}
//       className="mb-9 flex items-center justify-between border-b border-zinc-800 px-3 pb-9"
//     >
//       <div>
//         <p className="mb-1.5 text-xl text-zinc-50">{title}</p>
//         <p className="text-sm uppercase text-zinc-500">{date}</p>
//       </div>
//       <div className="flex items-center gap-1.5 text-end text-sm uppercase text-zinc-500">
//         <p>{location}</p>
//         <FiMapPin />
//       </div>
//     </motion.div>
//   );
// };
//
//
const Cards = () => {
  const containerRef = useRef(null);

  return (
    <div className="absolute inset-0 z-10" ref={containerRef}>
      <Card
        containerRef={containerRef}
        src="https://i.postimg.cc/prCjGpXL/Tato-s-ideal-project-feedback.png"
        alt="Example image"
        rotate="6deg"
        top="55%"
        left="3%"
        className="w-36 md:w-64"
      />
      <Card
        containerRef={containerRef}
        src="https://i.postimg.cc/MGggHGw5/Positive-testimonial-on-Strategy-Hub-tools.png "
        alt="Example image"
        rotate="12deg"
        top="50%"
        left="19%"
        className="w-24 md:w-64"
      />
      <Card
        containerRef={containerRef}
        src="https://i.postimg.cc/0Q0YKtm9/Screenshot-1gt'u.png"
        alt="Example image"
        rotate="-6deg"
        top="10%"
        left="65%"
        className="w-52 md:w-80"
      />
      <Card
        containerRef={containerRef}
        src="https://i.postimg.cc/Kjkx1Wkd/DRt-AR.jpg"
        alt="Example image"
        rotate="8deg"
        top="60%"
        left="83%"
        className="w-48 md:w-72"
      />
      <Card
        containerRef={containerRef}
        src="https://i.postimg.cc/0yP5nPzj/R1Yyq.jpg"
        alt="Example image"
        rotate="18deg"
        top="55%"
        left="50%"
        className="w-40 md:w-64"
      />
      <Card
        containerRef={containerRef}
        src="https://i.postimg.cc/W3V2f8y3/Screenshot-1sandro.png "
        alt="Example image"
        rotate="-3deg"
        top="70%"
        left="36%"
        className="w-24 md:w-64"
      />
    </div>
  );
};

const Card = ({ containerRef, src, alt, top, left, rotate, className }) => {
  const [zIndex, setZIndex] = useState(0);

  const updateZIndex = () => {
    const els = document.querySelectorAll(".drag-elements");

    let maxZIndex = -Infinity;

    els.forEach((el) => {
      let zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue("z-index"),
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.img
      onMouseDown={updateZIndex}
      style={{
        top,
        left,
        rotate,
        zIndex,
      }}
      className={twMerge(
        "drag-elements absolute w-48 bg-neutral-200 p-1 pb-4",
        className,
      )}
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      // Uncomment below and remove dragElastic to remove movement after release
      //   dragMomentum={false}
      dragElastic={0.65}
    />
  );
};
