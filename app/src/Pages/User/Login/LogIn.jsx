import React, { useState } from "react";
import { Label } from "../../../Components/UI/Form/label";
import { Input } from "../../../Components/UI/Form/input";
import { cn } from "../../../Lib/utils";
import { authHandler } from "../../../Api/ApiAuth";
import { authActionTypes } from "../../../Constants/auth/authActions";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../Context/AppContextProvider";
import { LogInAction } from "../../../Context/AppActionsCreator";
import { routes } from "../../../Constants/Routes";
import { Button } from "../../../Components/UI/About/Stateful-Button";
export const LogIn = () => {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const [formErrrors, setformErrrors] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const ChangeInput = (e) => {
    const { name, value } = e.target;
    setuser((prev) => ({ ...prev, [name]: value }));
    setformErrrors((prev) => ({ ...prev, [name]: "" }));
  };
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const validateForm = () => {
    const errors = {};
    if (!user.email.trim()) {
      errors.email = "Please Enter The Email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      errors.email = "Email format is not correct";
    }
    if (!user.password) {
      errors.password = "Please Enter the password";
    } else if (user.password.length < 0) {
      errors.password = "Password must to includes the 6 symbols or more";
    }
    setformErrrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);
    if (!validateForm()) return;
    authHandler(authActionTypes.login, user)
      .then((response) => {
        return new Promise((resolve) =>
          setTimeout(() => resolve(response), 3000),
        );
      })
      .then((response) => {
        console.log(response);
        console.log(response.message);
        if (response.message === "Success") {
          // navigate("/", { state: { success: true } });
          dispatch(LogInAction(response));
        }
      })
      .catch((err) => {
        setformErrrors({
          general: err.message || "Something is wrong , please try again",
        });
      })
      .finally(() => {
        setisLoading(false);
        setuser({
          email: "",
          password: "",
        });
      });
  };

  // const goReg = navigate(routes.SignUp);
  return (
    <div className="shadow-input relative top-10 mx-auto mt-20 w-full max-w-xl p-4 rounded-2xl rounded-br-none rounded-tl-none md:p-8 dark:bg-black">
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
            className={`bg-zinc-800 text-zinc-200 ${
              formErrrors.email ? "border-2 border-red-500" : ""
            }`}
          />
          {formErrrors.email && (
            <p className="text-red-600 font-bold text-sm mt-1">
              {formErrrors.email}
            </p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            placeholder="••••••••"
            type="password"
            name="password"
            onChange={ChangeInput}
            value={user.password}
            className={`bg-zinc-800 text-zinc-100 ${
              formErrrors.email ? "border-2 border-red-500" : ""
            }`}
          />
          {formErrrors.password && (
            <p className="text-red-600 font-bold text-sm mt-1">
              {formErrrors.password}
            </p>
          )}
        </LabelInputContainer>

        {/* <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Log In
          <BottomGradient />
        </button> */}
        <button
          type="submit"
          className="flex cursor-target items-center justify-center"
        >
          <Button isLoading={isLoading}>
            Log In
            <BottomGradient />
          </Button>
        </button>
        {formErrrors.general && (
          <p className="text-red-600 text-sm mt-2 text-center">
            {formErrrors.general}
          </p>
        )}
        <p className="text-white text-center">
          Don't have an account?{" "}
          <button
            className="text-blue-600  hover:scale-110 duration-150 cursor-target p-2"
            onClick={() => navigate(routes.SignUp)}
          >
            Register
          </button>
        </p>
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
