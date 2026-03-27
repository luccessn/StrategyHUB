import React from "react";
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
  return (
    <div className="flex gap-4 pt-1">
      {/* <Badge content={totalItems} overlap="rectangular">
        <button
          onClick={() => dispatch(openCartDrawer())}
          className="cursor-target "
        >
          <IconButton aria-label="cart">
            <Badge badgeContent={4} color="primary">
              <FaShoppingCart className="text-white w-8 font-bold  hover:scale-110 transition-transform duration-150 " />
            </Badge>
          </IconButton>
        </button>
      </Badge>
      <Drawer
        isOpen={isOpen}
        onOpenChange={() => dispatch(closeCartDrawer())}
        motionProps={{
          variants: {
            enter: { opacity: 1, x: 0, duration: 0.3 },
            exit: { x: 100, opacity: 0, duration: 0.3 },
          },
        }}
        size="lg"
      >
        <DrawerContent className="bg-orange-500 rounded-sm ">
          <DrawerHeader className="flex  bg-orange-600 gap-1 text-white pr-10 ">
            <div className="flex flex-col gap-5">
              <h1 className="text-3xl">კალათა </h1>
              <p className="text-medium">თქვენს კალათაში {totalItems} ნივთია</p>
            </div>
          </DrawerHeader>

          <DrawerBody>
            <div className="flex flex-col gap-5">
              {state.cartItems.map((item) => (
                <CartCard key={item.id} props={item} />
              ))}
            </div>
          </DrawerBody>

          <DrawerFooter className="flex flex-col gap-3 bg-orange-600 shadow-[0_-32px_20px_rgba(0,0,0,0.1)]">
            <div className="w-full text-white text-xl font-mono flex justify-between px-2">
              <span>ჯამი:</span>
              <span>
                {state.cartItems
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}{" "}
                ₾
              </span>
            </div>

            <div className="flex flex-row w-full justify-between">
              <button className="Btn" onClick={goOrder}>
                გადახდა
                <svg className="svgIcon" viewBox="0 0 576 512">
                  <path d="..." />
                </svg>
              </button>
              <button
                onClick={() => dispatch(clearCart())}
                className="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
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
          </DrawerFooter>
        </DrawerContent>
      </Drawer> */}
    </div>
  );
};
// {/* <div className="flex gap-4  ">
//       {/* <Badge content={0} overlap="rectangular">
//         <button>
//           <FaShoppingCart className="text-white text-xl font-bold  hover:scale-110 transition-transform duration-150 " />
//         </button>
//       </Badge> */}
{
  /* <div className="cursor-target ">
  <IconButton aria-label="cart">
    <Badge badgeContent={4} color="primary">
      <FaShoppingCart className="text-white w-8 font-bold  hover:scale-110 transition-transform duration-150 " />
    </Badge>
  </IconButton>
      </div> */
}
//     </div> */}
