import React, { useEffect, useState } from "react";
import { FiCheckSquare, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "../../Context/AppContextProvider";
import { closeNotfAction } from "../../Context/AppActionsCreator";
export const MainNotification = () => {
  const { state, dispatch } = useAppContext();
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      // removeNotif(id);
      dispatch(closeNotfAction());
    }, 8000);
    return () => clearTimeout(timeoutRef);
  }, []);
  const content = state.notification.content;
  return (
    // <div className="bg-white min-h-[200px] flex items-center justify-center">
    //   <button
    //     onClick={() => {
    //       setNotifications((pv) => [generateRandomNotif(), ...pv]);
    //     }}
    //     className="text-sm text-white bg-indigo-500 hover:bg-indigo-600 active:scale-95 transition-all font-medium px-3 py-2 rounded"
    //   >
    //     Add notification
    //   </button>
    <>
      {state.notification.isOpen && (
        <div className="flex flex-col gap-1 w-80 fixed bottom-5 right-5 z-50 pointer-events-none">
          <AnimatePresence>
            {/* {notifications.map((n) => (
            <Notification removeNotif={removeNotif} {...n} key={n.id} />
          ))} */}
            <motion.div
              layout
              initial={{ y: 45, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="p-2 flex items-start rounded gap-2  shadow-lg text-white bg-indigo-500 pointer-events-auto"
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-2">
                  <FiCheckSquare className=" mt-0.5" />
                  <h1 className="text-base font-mono font-semibold">
                    {content} subscription activated
                  </h1>
                </div>
                <p className="text-sm font-satosIT font-medium">
                  You`h activated{" "}
                  {content === "Standard"
                    ? "1 month"
                    : content === "Premium"
                      ? "3 month"
                      : content === "Enterprise"
                        ? "1 year"
                        : "Free 14 days "}{" "}
                  access to unlimited chat and strategy planning modules.
                </p>
              </div>
              <button
                onClick={() => dispatch(closeNotfAction())}
                className="ml-auto mt-0.5"
              >
                <FiX />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
    // </div>
  );
};
const NOTIFICATION_TTL = 5000;

const Notification = ({ text, id, removeNotif }) => {
  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="p-2 flex items-start rounded gap-2 text-xs font-medium shadow-lg text-white bg-indigo-500 pointer-events-auto"
    >
      <FiCheckSquare className=" mt-0.5" />
      <span>{text}</span>
      <button onClick={() => removeNotif(id)} className="ml-auto mt-0.5">
        <FiX />
      </button>
    </motion.div>
  );
};

// const generateRandomNotif = () => {
//   const names = [
//     "John Anderson",
//     "Emily Peterson",
//     "Frank Daniels",
//     "Laura Williams",
//     "Donald Sanders",
//     "Tom Smith",
//     "Alexandra Black",
//   ];

//   const randomIndex = Math.floor(Math.random() * names.length);

//   const data = {
//     id: Math.random(),
//     text: `New notification from ${names[randomIndex]}`,
//   };

//   return data;
// };
