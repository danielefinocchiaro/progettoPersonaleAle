import React from "react";
import { useNavigate } from "react-router-dom";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import { type LoginInput, loginInput } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Login() {
  const navigate = useNavigate();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginInput),
    defaultValues: {
      email: "",
    },
  });

  const [loginError, setLoginError] = React.useState<string | null>(null);

  const onSubmit = async (data: LoginInput) => {
    setLoginError(null);
    const queryLogin = await trpc.login.query({
      email: data.email,
      password: data.password,
    });
    if (queryLogin === "INVALID CREDENTIAL") {
      setLoginError("Email o password non corretti.");
    } else {
      navigate("/Dashboard");
    }
    form.reset();
  };

  return (
    <div className="bg-gradient-to-t from-black to bg-neutral-800 min-h-screen w-full overflow-x-hidden px-2 sm:px-4 md:px-8 flex flex-col items-center justify-center">
      <div className="bg-neutral-950 h-20 sm:h-28 flex items-center w-full justify-center">
        <img src="/logo.png" className="h-8 sm:h-9" alt="Spotify Logo" />
      </div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex justify-center py-4 sm:py-8"
      >
        <div className="bg-gradient-to-t from-neutral-900 to bg-neutral-950 rounded-t-md rounded-b-md px-4 sm:px-8 md:px-12 pt-8 sm:pt-12 mb-4 sm:mb-8 mt-4 sm:mt-8 w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col items-center justify-center gap-4 sm:gap-6 text-center">
          {loginError && (
            <div className="text-red-500 font-bold text-center mb-2 w-full">
              {loginError}
            </div>
          )}
          <h1 className="font-bold text-5xl text-center text-white">
            Accedi a Spotify
          </h1>
          <div className="pt-8 sm:pt-12 w-full flex flex-col items-center">
            <h3 className="text-base font-bold text-white pb-4">
              Indirizzo e-mail o nome utente
            </h3>
            {/* Removed empty label for accessibility */}
            <input
              className="w-full max-w-xs h-10 border-inherit rounded-sm text-center"
              type="email"
              {...form.register("email")}
              placeholder="Indirizzo e-mail"
              required
            />
          </div>
          <div className="pt-4 sm:pt-5 flex flex-col items-center justify-center w-full gap-4">
            <h3 className="text-base font-bold text-white text-center w-full">
              Password
            </h3>
            <input
              className="w-full max-w-xs h-10 border-inherit rounded-sm text-center"
              type="password"
              {...form.register("password")}
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="font-bold bg-green-600 rounded-3xl w-full max-w-xs h-12 hover:scale-105 mt-8 sm:mt-12"
            >
              Accedi
            </button>
          </div>
          <a
            href="https://accounts.spotify.com/it/password-reset?flow_ctx=6bcf1352-4ee7-4a82-9cee-4c8896862665%3A1706714292"
            className="text-white hover:text-green-600 py-10"
          >
            Hai dimenticato la password?
          </a>
          <hr className="w-full text-gray-400" />
          <h2 className="text-gray-400 py-10">
            Non hai un account?{" "}
            <a
              href="https://www.spotify.com/it/signup?flow_id=555a93f7-c891-448f-b311-4ded6af76ce9%3A1706714806&forward_url=https%3A%2F%2Fopen.spotify.com%2Fintl-it%3Fflow_ctx%3D555a93f7-c891-448f-b311-4ded6af76ce9%253A1706714806"
              className="text-white hover:text-green-600"
            >
              Iscriviti a Spotify
            </a>
          </h2>
        </div>
      </form>
    </div>
  );
}
