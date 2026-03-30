import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
// import { Badge } from "rsuite";
import { useAppContext } from "../../Context/AppContextProvider";
//
// import {
//   Drawer,
//   DrawerContent,
//   DrawerHeader,
//   DrawerBody,
//   DrawerFooter,
// } from "@heroui/react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import {
  clearCart,
  closeCartDrawer,
  openCartDrawer,
} from "../../Context/AppActionsCreator";
import { CartCard } from "./CartCard";
//
//
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { StarsBackground } from "../UI/Stars-background";
import StaggeredMenu from "../UI/StraggeredMenu";

//
//

//
// import {
//   Drawer,
//   DrawerContent,
//   DrawerHeader,
//   DrawerBody,
//   DrawerFooter,
// } from "@heroui/react";
// const StyledBadge = styled(Badge)(({ theme }) => ({
//   "& .MuiBadge-badge": {
//     right: -3,
//     top: 13,
//     border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
//     padding: "0 4px",
//   },
// }));

export const CartDrawer = () => {
  const { state, dispatch } = useAppContext();
  const goOrder = () => {
    dispatch(closeCartDrawer());
  };
  const totalItems = state.cartItems.lenght;
  const isOpen = state.isCartDrawerOpen;
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const DrawerContent = (
    <Box
      sx={{ width: 450 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      className="flex flex-col h-full bg-black justify-between"
    >
      <StarsBackground className="absolute top-0 left-0 w-full h-full z-0" />{" "}
      {/* Header */}
      <Box className="bg-orange-600 text-white p-4 flex flex-col gap-2 z-20">
        <h1 className="text-3xl font-bold">კალათა</h1>
        <p>თქვენს კალათაში {totalItems} ნივთია</p>
      </Box>
      <Divider />
      {/* Body */}
      <Box className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
        {totalItems === 0 ? (
          <p className="text-center bg-red-400 text-gray-500">
            თქვენი კალათა ცარიელია
          </p>
        ) : (
          state.cartItems.map((item) => <CartCard key={item.id} props={item} />)
        )}
      </Box>
      <Divider />
      {/* Footer */}
      {/* {totalItems > 0 && ( */}
      <Box className="bg-orange-600 p-4 flex flex-col gap-3 z-20">
        <div className="w-full text-white text-xl font-mono flex justify-between">
          <span>ჯამი:</span>
          <span>
            {state.cartItems
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)}{" "}
            ₾
          </span>
        </div>

        <div className="flex flex-row w-full justify-between gap-2">
          <button
            onClick={goOrder}
            className="Btn flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition transform hover:scale-105"
          >
            გადახდა
            <svg className="svgIcon ml-2" viewBox="0 0 576 512">
              <path d="..." />
            </svg>
          </button>

          <button
            onClick={() => dispatch(clearCart())}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition transform hover:scale-105"
          >
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="..."
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
            გასუფთავება
          </button>
        </div>
      </Box>
      {/* )} */}
    </Box>
  );
  return (
    <div>
      <IconButton
        onClick={toggleDrawer(true)}
        className="relative text-white"
        aria-label="cart"
      >
        <Badge badgeContent={totalItems} color="primary">
          <div className="cursor-target p-2">
            <FaShoppingCart className="text-white text-xl  font-bold  hover:scale-110 transition-transform duration-150 " />
          </div>
        </Badge>
      </IconButton>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerContent}
      </Drawer>
    </div>
  );
};

// <FaShoppingCart className="text-white text-xl  font-bold  hover:scale-110 transition-transform duration-150 " />; */
