import React from "react";
import { FaShoppingCart } from "react-icons/fa";
// import { Badge } from "rsuite";
import { useAppContext } from "../../../Context/AppContextProvider";
//
//
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
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
  const totalItems = state.cartItems.lenght;
  return (
    <div className="flex gap-4  ">
      {/* <Badge content={0} overlap="rectangular">
        <button>
          <FaShoppingCart className="text-white text-xl font-bold  hover:scale-110 transition-transform duration-150 " />
        </button>
      </Badge> */}
      <div className="cursor-target ">
        <IconButton aria-label="cart">
          <Badge badgeContent={4} color="primary">
            <FaShoppingCart className="text-white w-8 font-bold  hover:scale-110 transition-transform duration-150 " />
          </Badge>
        </IconButton>
      </div>
    </div>
  );
};
