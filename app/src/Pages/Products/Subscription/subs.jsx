import React, { useMemo, useState } from "react";
import { TestModal } from "./TestModal";
// import { Button } from "../../../Components/UI/About/Stateful-Button";
import { useAppContext } from "../../../Context/AppContextProvider";
import { freeAccess, LogInAction } from "../../../Context/AppActionsCreator";
import { v4 as uuidv4 } from "uuid";
import { SubsButton } from "./subsButton";
import { AppActions } from "../../../Context/AppActions";
//
export const Subs = () => {
  const subsOption = useMemo(
    () => [
      { id: uuidv4(), name: "Free", price: "$0", duration: "7 days" },
      { id: uuidv4(), name: "Standard", price: "$15", duration: "1 Month" },
      { id: uuidv4(), name: "Premium", price: "$45", duration: "3 Months" },
      { id: uuidv4(), name: "Enterprise", price: "$180", duration: "1 Year" },
    ],
    [],
  );
  // const [ShowModal, setShowModal] = useState(false);
  const [isLoading, setisLoading] = useState(null);
  const { state, dispatch } = useAppContext();
  console.log(state.user);
  // console.log(state);
  console.log("TOKEN:", state.token);
  const getSubscription = async (id) => {
    setisLoading(id);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (state.user) {
      console.log("Subscription successful!");
      try {
        setisLoading(id);
        const res = await fetch(
          "http://localhost:5000/server/subscription/start-trial",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${state.token}`,
            },
            body: JSON.stringify({}),
          },
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          return;
        }
        //
        //
        const token = localStorage.getItem("accesTokenHUB");
        const userRef = await fetch("http://localhost:5000/server/refresh", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const freshUser = await userRef.json();
        dispatch({ type: AppActions.AUTHENTICATED, payload: freshUser });
        console.log("Trial started:", data);
      } catch (err) {
        console.error(err);
      } finally {
        setisLoading(null);
      }
    } else {
      dispatch(freeAccess());
    }

    setisLoading(null);
  };

  return (
    <>
      <div className=" h-full flex items-center justify-center">
        <div className="relative top-28 grid grid-cols-2 xl:grid-cols-3 xxxl:grid-cols-4 gap-10 p-10 pt-0 ">
          {subsOption.map((option) => (
            <div key={option.id} className="w-full  max-w-[380px] ">
              <div className="max-w-sm lg:max-w-none mx-auto pt-10 px-5 pb-8 bg-gradient-to-b  from-zinc-900 to-zinc-800 border border-zinc-700 rounded-3xl shadow-xl">
                <div className="text-center mb-6">
                  <h5 className="text-2xl font-semibold text-white mb-3">
                    {option.name}
                  </h5>
                  <span className="block text-5xl font-bold text-white mb-3">
                    {option.price}
                  </span>
                  <span className="block text-zinc-400 font-medium mb-6">
                    {option.duration}
                  </span>
                </div>
                <div className="flex flex-col gap-5">
                  {option.name === "Free" ? (
                    <p className="ml-2 font-satosIT text-zinc-500">
                      Free 7-Day Access for All Users as Guests. Enjoy full
                      access to our Strategy Planner and AI Chat Bot for 7 days
                      completely free. Whether you're a guest or a registered
                      user, you can explore all features, plan your goals, build
                      strategies, and interact with the AI assistant — with no
                      restrictions during your trial period.
                    </p>
                  ) : (
                    <p className="ml-2 font-satosIT text-zinc-500">
                      Unlimited Access to Chat and Strategy Planning Modules.
                      Gain full, unrestricted access to our chat platform and
                      strategy planning tools for {option.duration}. Use this
                      time to define, plan, and develop strategies tailored to
                      your goals, track your progress, and refine your approach
                      for maximum results.
                    </p>
                  )}
                  <ul>
                    {[
                      { text: "Unlimited Chat Access", active: true },
                      { text: "Strategy Planner Access", active: true },
                      option.name === "Free"
                        ? { text: "Enhanced Security", active: false }
                        : { text: "Enhanced Security", active: true },
                      option.name === "Free"
                        ? { text: "Exclusive Access to Modules", active: false }
                        : { text: "Exclusive Access to Modules", active: true },
                      option.name === "Free"
                        ? { text: "7-Day Free Trial", active: true }
                        : { text: "Priority Support", active: true },
                      option.name === "Free"
                        ? { text: "Access to Future Features", active: false }
                        : { text: "Access to Future Features", active: true },
                    ].map((item, i) => (
                      <li key={i} className="flex mb-4 items-center">
                        <svg
                          viewBox="0 0 20 20"
                          className={`w-6 h-6 ${
                            item.active ? "text-purple-600" : "text-zinc-600"
                          }`}
                          fill="currentColor"
                        >
                          <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z" />
                        </svg>

                        <span
                          className={`ml-2 font-mono ${
                            item.active
                              ? "text-zinc-200 "
                              : "text-zinc-500 line-through"
                          }`}
                        >
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {/* <button
                  onClick={() => getSubscription(option.id)}
                  disabled={isLoading === option.id}
                  className="relative cursor-target group inline-block w-full py-4 px-6 text-center bg-yellow-300 text-gray-800  font-semibold rounded-md overflow-hidden transition duration-200"
                >
                  <div className="absolute top-0 right-full w-full h-full bg-white transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                  <span className="relative font-panchangSB">
                    {isLoading === option.id ? "Processing..." : "Get Started"}
                  </span>{" "}
                </button> */}
                  <SubsButton
                    onClick={() => getSubscription(option.id)}
                    isLoading={isLoading === option.id}
                    planName={option.name}
                  >
                    Get Started
                  </SubsButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
