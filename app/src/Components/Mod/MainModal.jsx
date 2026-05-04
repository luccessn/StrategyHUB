import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import { useAppContext } from "../../Context/AppContextProvider";
import { closeModalAction } from "../../Context/AppActionsCreator";
export const MainModal = ({ props }) => {
  const { state, dispatch } = useAppContext();
  return (
    <AnimatePresence>
      {state.modal.isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => dispatch(closeModalAction())}
          className="bg-slate-900/20 backdrop-blur fixed  p-8  inset-0 z-50 grid place-items-center  cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                One more thing!
              </h3>
              {props === "used" ? (
                <p className="text-center mb-6 font-array text-lg">
                  Your 14-day free trial has ended. You can continue using the
                  AI chatbot for free, but to unlock the full power of the
                  Strategy Chatbot AI, an active subscription is required.
                </p>
              ) : (
                <p className="text-center mb-6 font-array text-lg">
                  During the free plan, you get a 14-day free trial where both
                  chatbots are available at no cost — the AI Chatbot and the
                  Strategy Chatbot AI.
                </p>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => dispatch(closeModalAction())}
                  className="bg-transparent font-mono  text-2xl hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Nah, go back
                </button>
                <button
                  onClick={() => dispatch(closeModalAction())}
                  className="bg-white hover:opacity-90 font-mono  text-2xl transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  Understood!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
