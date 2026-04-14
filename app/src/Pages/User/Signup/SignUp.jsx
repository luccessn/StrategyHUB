import React, { useState } from "react";
import { Label } from "../../../Components/UI/Form/label";
import { Input } from "../../../Components/UI/Form/input";
import { cn } from "../../../Lib/utils";
import { authHandler } from "../../../Api/ApiAuth";
import { useNavigate } from "react-router-dom";
import { authActionTypes } from "../../../Constants/auth/authActions";
import { routes } from "../../../Constants/Routes";
import { Button } from "../../../Components/UI/About/Stateful-Button";
export const SignUp = () => {
  const [user, setuser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setformErrors] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const Changeinput = (e) => {
    const { name, value } = e.target;
    setuser((prev) => ({ ...prev, [name]: value }));
    setformErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const validateForm = () => {
    const errors = {};
    if (!user.firstName.trim()) {
      errors.firstName = "Please Enter Valid Username";
    }
    if (!user.lastName.trim()) {
      errors.lastName = "Please Enter Lastname";
    }
    if (!user.email.trim()) {
      errors.email = "Please Enter Valid Email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      errors.email = "Email is incorrect";
    }
    if (!user.password) {
      errors.password = "Please Enter the strong password";
    } else if (user.password.length < 6) {
      errors.password = "Password must to includes the 6 symbols or more";
    }
    if (!user.confirmPassword) {
      errors.confirmPassword = "Repeat the password";
    } else if (user.password !== user.confirmPassword) {
      errors.confirmPassword = "Password dont match";
    }
    setformErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    console.log("Form submitted", user);
    setisLoading(true);
    authHandler(authActionTypes.register, user)
      .then((response) => {
        console.log(response);
        navigate(routes.LogIn);
      })
      .catch((error) => {
        console.log(error.message);

        setformErrors({
          general: error.message || "Something is wrong , please try again",
        });
      })
      .finally(() => setisLoading(false));
  };
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
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="firstName">First name</Label>
            <Input
              type="text"
              name="firstName"
              placeholder="Niki"
              value={user.firstName}
              onChange={Changeinput}
              className={`bg-zinc-800 text-zinc-200 ${
                formErrors.firstName ? "border-2 border-red-500" : ""
              }`}
            />
            {formErrors.firstName && (
              <p className="text-red-500 font-bold text-xs mt-1">
                {formErrors.firstName}
              </p>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              type="text"
              name="lastName"
              placeholder="Lauda"
              value={user.lastName}
              onChange={Changeinput}
              className={`bg-zinc-800 text-zinc-200 ${
                formErrors.lastName ? "border-2 text-red-900 font-bold" : ""
              }`}
            />
            {formErrors.lastName && (
              <p className="text-red-500 font-bold text-xs mt-1">
                {formErrors.lastName}
              </p>
            )}
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            name="email"
            placeholder="projectmayhem@fc.com"
            value={user.email}
            onChange={Changeinput}
            className={`bg-zinc-800 text-zinc-200 ${
              formErrors.email ? "border-2 border-red-500" : ""
            }`}
          />
          {formErrors.email && (
            <p className="text-red-500 font-bold text-xs mt-1">
              {formErrors.email}
            </p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            placeholder="••••••••"
            type="password"
            name="password"
            value={user.password}
            onChange={Changeinput}
            className={`bg-zinc-800 text-zinc-200 ${
              formErrors.email ? "border-2 border-red-500" : ""
            }`}
          />
          {formErrors.password && (
            <p className="text-red-500 font-bold text-xs mt-1">
              {formErrors.password}
            </p>
          )}
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="twitterpassword">Repeat your password</Label>
          <Input
            placeholder="••••••••"
            type="twitterpassword"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={Changeinput}
            className={`bg-zinc-800 text-zinc-200 ${
              formErrors.confirmPassword ? "border-2 border-red-900" : ""
            }`}
          />
          {formErrors.confirmPassword && (
            <p className="text-red-500 font-bold text-xs mt-1">
              {formErrors.confirmPassword}
            </p>
          )}
        </LabelInputContainer>
        <button
          type="submit"
          className="flex  cursor-target   items-center justify-center"
        >
          <Button isLoading={isLoading}>
            Sign up
            <BottomGradient />
          </Button>
        </button>
        {/* <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button> */}
        {formErrors.general && (
          <p className="text-red-600 text-sm mt-2 text-center">
            {formErrors.general}
          </p>
        )}
        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        {/* <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit"
          >
            <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              OnlyFans
            </span>
            <BottomGradient />
          </button>
        </div> */}
      </form>
      {isLoading && <h1>Loading...</h1>}
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
