"use client";
import { useState } from "react";
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
// import { AppRouters } from "./AppRouters";
import TargetCursor from "./Components/UI/Cursor/targetCursor";
import { AppRoutes } from "./AppRoutes";
import { routes } from "./Constants/Routes";
import { useNavigate } from "react-router-dom";

function App() {
  // const navItems = [
  //   {
  //     name: "Home",
  //     link: "#features",
  //   },
  //   {f
  //     name: "Pricing",
  //     link: "#pricing",
  //   },
  //   {
  //     name: "Contact",
  //     link: "#contact",
  //   },
  // ];
  const navbarRT = [
    { name: "Home", path: routes.Home },
    // { name: "SignUp", path: routes.SignUp },
    // { name: "LogIn", path: routes.LogIn },
    { name: "Products", path: routes.Products },
    { name: "About", path: routes.About },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <div className="relative  w-screen ">
        {/* Stars Background positioned behind everything */}
        <div className="fixed inset-0 -z-10 w-screen h-screen overflow-hidden">
          <StarsBackground />
        </div>
        <TargetCursor
          spinDuration={2}
          hideDefaultCursor={true}
          parallaxOn={true}
        />
        {/* Navbar */}
        <Navbar>
          {/* Desktop Navigation */}
          <NavBody>
            <NavbarLogo />
            <NavItems items={navbarRT} />
            <div className="flex items-center gap-4">
              <NavbarButton
                variant="secondary"
                onClick={() => navigate(routes.SignUp)}
              >
                SignUp
              </NavbarButton>
              <NavbarButton
                onClick={() => navigate(routes.LogIn)}
                variant="primary"
              >
                Log In
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
                  className="relative text-neutral-300"
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
      </div>
    </>
  );
}

export default App;
