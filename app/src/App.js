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
import { LuTimerReset } from "react-icons/lu";
import { AppActions } from "./Context/AppActions";

function App() {
  const navbarRT = [
    { name: "Home", path: routes.Home },
    // { name: "SignUp", path: routes.SignUp },
    // { name: "LogIn", path: routes.LogIn },
    { name: "Products", path: routes.Products },
    { name: "About", path: routes.About },
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

  return (
    <>
      <div className="relative  w-screen ">
        <ReactLenis
          root
          options={{
            lerp: 0.03,
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
              className="verflow-hidden h-screen bg-red-500   fixed z-50"
            >
              <StaggeredMenu
                position="left"
                items={menuItems}
                socialItems={socialItems}
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

              {/* Mobile Navigation */}
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
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate(item.path);
                      }}
                      className="relative cursor-target text-neutral-300"
                    >
                      <span className="block">{item.name} </span>
                    </button>
                  ))}
                  <div className="flex w-full flex-col gap-4">
                    <NavbarButton
                      onClick={() => setIsMobileMenuOpen(false)}
                      variant="primary"
                      className="w-full"
                    >
                      Login
                    </NavbarButton>
                    <NavbarButton
                      onClick={() => setIsMobileMenuOpen(false)}
                      variant="primary"
                      className="w-full"
                    >
                      Book a call
                    </NavbarButton>
                  </div>
                </MobileNavMenu>
              </MobileNav>
            </Navbar>

            {/* Main App Content */}
            <div className="">
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
    </>
  );
}

export default App;
