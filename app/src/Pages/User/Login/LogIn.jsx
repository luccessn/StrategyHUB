import React, { useState } from "react";
import { Label } from "../../../Components/UI/Form/label";
import { Input } from "../../../Components/UI/Form/input";
import { cn } from "../../../Lib/utils";
import { authHandler } from "../../../Api/ApiAuth";
import { authActionTypes } from "../../../Constants/auth/authActions";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContextProvider";
import { LogInAction } from "../../../Context/AppActionsCreator";
export const LogIn = () => {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setisLoading] = useState(false);
  const ChangeInput = (e) => {
    const { name, value } = e.target;
    setuser((prev) => ({ ...prev, [name]: value }));
  };
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);
    authHandler(authActionTypes.login, user)
      .then((response) => {
        if (response.message === "Success") {
          navigate("/", { state: { success: true } });
          dispatch(LogInAction(response));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setisLoading(false));
  };
  return (
    <div className="shadow-input mx-auto mt-20 w-full max-w-xl p-4 rounded-2xl rounded-br-none rounded-tl-none md:p-8 dark:bg-black">
      <h2 className="text-3xl font-array font-bold text-neutral-200">
        Welcome to Strategy Hub
      </h2>
      <p className="mt-2 font-satosIT  max-w-sm text-sm text-neutral-300">
        Login to our HUB for more new changes and strategy !
      </p>
      <form
        className="my-8    w-full flex flex-col gap-5"
        onSubmit={handleSubmit}
      >
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            name="email"
            value={setuser.email}
            onChange={ChangeInput}
            placeholder="projectmayhem@fc.com"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            placeholder="••••••••"
            type="password"
            name="password"
            onChange={ChangeInput}
            value={user.password}
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
      </form>
    </div>
  );
};
const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-orange-800 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
