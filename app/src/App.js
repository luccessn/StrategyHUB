"use client";
import { ReactLenis } from "lenis/dist/lenis-react";

import { useEffect, useRef, useState } from "react";
import "./App.css";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./Components/UI/ResizableNavbar";
import { StarsBackground } from "./Components/UI/Stars-background";
import { motion, AnimatePresence } from "framer-motion";
// import { AppRouters } from "./AppRouters";
import TargetCursor from "./Components/UI/Cursor/targetCursor";
import { AppRoutes } from "./AppRoutes";
import { routes } from "./Constants/Routes";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useAppContext } from "./Context/AppContextProvider";
import { CartDrawer } from "./Components/NavBar/CartDrawer";
import ClickSpark from "./Components/UI/Cursor/ClickSpark";
import { UserDrawer } from "./Components/NavBar/UserDrawer";
import StaggeredMenu from "./Components/UI/StraggeredMenu";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import MetallicPaint from "./Components/UI/MetallicPaint";
import { useInView } from "framer-motion";

function App() {
  const navbarRT = [
    { name: "Home", path: routes.Home, icon: <HomeIcon /> },
    // { name: "SignUp", path: routes.SignUp },
    // { name: "LogIn", path: routes.LogIn },

    { name: "Merch", path: routes.Products, icon: <CategoryIcon /> },
    {
      name: "Subscriptions",
      path: routes.Subscription,
      icon: <LoyaltyIcon />,
    },

    { name: "About", path: routes.About, icon: <PermDataSettingIcon /> },
  ];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  console.log(state);
  const menuItems = [
    // { label: "Home", ariaLabel: "Go to home page", link: "/" },
    // { label: "About", ariaLabel: "Learn about us", link: "/about" },
    // { label: "Services", ariaLabel: "View our services", link: "/services" },
    // { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
  ];

  const socialItems = [
    { label: "Twitter", link: "https://twitter.com" },
    { label: "GitHub", link: "https://github.com" },
    { label: "LinkedIn", link: "https://linkedin.com" },
  ];
  const [onHovered, setOnHovered] = useState(false);
  //

  const userExpiresAt = state?.user?.trial?.expiresAt;
  const freeExpiresAt = state?.subscription?.free?.freeAccessExpiresAt;

  const finalExpiresAt = userExpiresAt || freeExpiresAt;

  const expiredTime = new Date(finalExpiresAt);
  const formattedExpiredDate = expiredTime.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const timerRef = useRef(null);
  // useEffect(() => {
  //   const expiresAt = state?.user?.trial?.expiresAt;
  //   if (!expiresAt) return;
  //   const expireTime = new Date(expiresAt).getTime();
  //   const afterRefresh = async () => {
  //     if (Date.now() >= expireTime) {
  //       try {
  //         const res = await fetch("http://localhost:5000/server/refresh", {
  //           headers: {
  //             Authorization: `Bearer ${state.token}`,
  //           },
  //         });
  //         const freshUser = await res.json();
  //         if (res.ok) {
  //           dispatch({ type: AppActions.AUTHENTICATED, payload: freshUser });
  //         }
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     }
  //   };
  // }, []);
  const userTarget = state?.user?.trial?.expiresAt;
  const gsTarget = state.subscription.free.freeAccessExpiresAt;
  const target = userTarget || gsTarget;
  const [hovered, setHovered] = useState(null);
  const [openBlock, setOpenBlock] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 800) {
      setOpenBlock(true);
    } else {
      setOpenBlock(false);
    }
  }, []);

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
    <>
      {openBlock ? (
        <div>
          <div className="fixed inset-0 -z-10 w-screen h-screen overflow-hidden">
            <StarsBackground />
          </div>
          <div style={{ width: "100%", height: "500px" }}>
            <MetallicPaint
              imageSrc="https://i.postimg.cc/zBJqhfT3/main3.png"
              // Pattern
              seed={42}
              scale={4}
              patternSharpness={1}
              noiseScale={0.5}
              // Animation
              speed={0.3}
              liquid={0.75}
              mouseAnimation={false}
              // Visual
              brightness={2}
              contrast={0.5}
              refraction={0.01}
              blur={0.015}
              chromaticSpread={2}
              fresnel={1}
              angle={0}
              waveAmplitude={1}
              distortion={1}
              contour={0.2}
              // Colors
              lightColor="#ffffff"
              darkColor="#000000"
              tintColor="#feb3ff"
            />
          </div>
          <div className="max-w-7xl mx-auto text-center" ref={ref}>
            {/* <p className="font-panchangSB text-xl md:text-4xl  text-white ">
              Welcome to
              <span className="text-neutral-400 px-3">
                {"Strategy Hub".split("").map((letter, idx) => (
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
            <p className="text-sm font-satosIT md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
              We are analyzing your car, track, and intentions to build the
              smartest strategy for your race — from high-pressure competition
              to laid-back driving.
            </p> */}
            <div className="mx-auto block lg:hidden gap-8 text-center">
              <p className="font-panchangSB text-white text-xl ssm:text-2xl smm:text-3xl xl:text-4xl">
                WebSite is
                <span className="text-red-600 relative left-2">
                  Unavailable
                </span>
              </p>
            </div>

            <p className="font-satosIT text-sm ssm:text-base smm:text-lg text-neutral-300 max-w-2xl mx-auto py-4 p-10">
              This website is not available for devices with a screen width
              below 800px. Please switch to a larger screen for the best
              experience.
            </p>
          </div>
        </div>
      ) : (
        <div className="relative  w-screen ">
          <ReactLenis
            root
            options={{
              lerp: 0.07,
              infinite: false,
              syncTouch: false,
            }}
          >
            <ClickSpark
              sparkColor="#fff"
              sparkSize={10}
              sparkRadius={15}
              sparkCount={8}
              duration={400}
            >
              <div className="fixed inset-0 -z-10 w-screen h-screen overflow-hidden">
                <StarsBackground />
              </div>
              <TargetCursor
                spinDuration={2}
                hideDefaultCursor={true}
                parallaxOn={true}
              />
              <div
                style={{ height: "100vh" }}
                className="verflow-hidden h-screen  fixed z-50"
              >
                <StaggeredMenu
                  position="left"
                  // items={menuItems}
                  // socialItems={socialItems}
                  displaySocials
                  displayItemNumbering={true}
                  menuButtonColor="#ffffff"
                  openMenuButtonColor="#5227FF"
                  changeMenuColorOnOpen={true}
                  colors={["#B19EEF", "#5227FF"]}
                  logoUrl="/path-to-your-logo.svg"
                  accentColor="#5227FF"
                  // onMenuOpen={() => console.log("Menu opened")}
                  // onMenuClose={() => console.log("Menu closed")}
                />
              </div>
              <Navbar>
                <NavBody>
                  <NavbarLogo />
                  <NavItems />
                  <div className="flex  items-center gap-1">
                    {state.user ? (
                      <NavbarButton
                        variant="secondary"
                        className=""
                        // onClick={() => navigate(routes.SignUp)}
                      >
                        {/* <FaRegUser className="text-white text-xl font-bold " /> */}
                        <UserDrawer />
                      </NavbarButton>
                    ) : (
                      <>
                        {/* <NavbarButton
                    variant="secondary"
                    className="cursor-target"
                    onClick={() => navigate(routes.SignUp)}
                  >
                    SignUp
                  </NavbarButton> */}

                        <NavbarButton
                          className="cursor-target"
                          onClick={() => navigate(routes.LogIn)}
                          variant="primary"
                        >
                          Log In
                        </NavbarButton>
                      </>
                    )}
                    <NavbarButton
                      variant="secondary"
                      className=""
                      // onClick={() => navigate(routes.SignUp)}
                    >
                      {/* <CartDrawer /> */}
                      {/* <FaShoppingCart className="text-white text-xl font-bold " /> */}
                    </NavbarButton>
                  </div>
                </NavBody>

                <MobileNav>
                  <MobileNavHeader>
                    <NavbarLogo />
                    <MobileNavToggle
                      isOpen={isMobileMenuOpen}
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    />
                  </MobileNavHeader>

                  <MobileNavMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                  >
                    {navbarRT.map((item, idx) => (
                      <div
                        key={idx}
                        className="relative"
                        onMouseEnter={() => setHovered(idx)}
                      >
                        <button
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            navigate(item.path);
                          }}
                          className="relative hover:scale-110 duration-200 hover:text-neutral-500 text-neutral-300"
                        >
                          <span className="mr-2">{item.icon}</span>
                          {item.name}
                        </button>
                      </div>
                    ))}
                    <div className="flex w-full flex-col gap-4">
                      {/* <NavbarButton
                      onClick={() => setIsMobileMenuOpen(false)}
                      variant="primary"
                      className="w-full"
                      >
                      Book a call
                      </NavbarButton> */}
                      <NavbarButton
                        variant="primary"
                        className="cursor-target"
                        onClick={() => navigate(routes.SignUp)}
                      >
                        SignUp
                      </NavbarButton>
                      <NavbarButton
                        onClick={() => navigate(routes.LogIn)}
                        variant="primary"
                        className="w-full"
                      >
                        Login
                      </NavbarButton>
                    </div>
                  </MobileNavMenu>
                </MobileNav>
              </Navbar>

              <div className="relative -top-20">
                {/* <AppRouters /> */}
                <AppRoutes />
              </div>
              {target && (
                <div className="fixed left-4 bottom-4 z-30">
                  <img
                    onMouseEnter={() => setOnHovered(true)}
                    onMouseLeave={() => setOnHovered(false)}
                    src="https://i.postimg.cc/bwv0fsRX/waste.png"
                    alt=""
                    className="animate-bounce cursor-target w-14"
                  />

                  <AnimatePresence>
                    {onHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="absolute bottom-20 left-12 w-44 rounded-2xl rounded-bl-none bg-white/10 backdrop-blur-xl border border-white/30 shadow-xl p-3 text-white"
                      >
                        <h1 className="text-sm font-medium">Subscription</h1>
                        <p className="text-xs mt-1">{formattedExpiredDate}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </ClickSpark>
          </ReactLenis>
        </div>
      )}
    </>
  );
}

export default App;
