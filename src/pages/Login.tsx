import { useNavigate } from "react-router-dom";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import { LoginInput, loginInput } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Login() {
  const navigate = useNavigate();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginInput),
    defaultValues: {
      email: "alessiacannella123@gmail.com",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    const queryLogin = await trpc.login.query({
      email: data.email,
      password: data.password,
    });
    if (queryLogin === "INVALID CREDENTIAL") {
      console.log(queryLogin);
    } else {
      navigate("/Dashboard");
    }
    form.reset();
  };

  return (
    <div className="bg-gradient-to-t from-black to bg-neutral-800 flex-grow h-full">
      <div className="bg-neutral-950 h-28 flex items-center">
        <img src="/logo.png" className="h-9 pl-16" />
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="bg-gradient-to-t from-neutral-900 to bg-neutral-950 rounded-t-md rounded-b-md px-12 pt-12 mb-8 mt-8 m-auto w-full sm:w-3/4 md:w-1/2 lg:w-1/3 h-5/6 flex flex-col items-center justify-center">
          <h1 className="font-bold text-5xl text-center text-white">
            Accedi a Spotify
          </h1>
          <div className="pt-12">
            <h3 className="text-base font-bold text-white">
              Indirizzo e-mail o nome utente
            </h3>
            <label htmlFor="username"></label>
            <input
              className="w-full sm:w-80 md:w-80 h-10 border-inherit rounded-sm"
              type="email"
              {...form.register("email")}
              placeholder="indirizzo e-mail o nome utente"
              required
            />
          </div>
          <div className="pt-5 flex flex-col items-center justify-center">
            <h3 className="text-base font-bold text-white self-start">
              Password
            </h3>
            <label htmlFor="password"></label>
            <input
              className="w-full sm:w-80 md:w-80 h-10 border-inherit rounded-sm relative"
              type="password"
              {...form.register("password")}
              placeholder="Password"
              required
            />
            <button
              type="submit"
              className="font-bold bg-green-600 rounded-3xl w-full sm:w-80 md:w-80 h-12 hover:scale-105 mt-12"
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
          <hr className="w-full text-gray-400"></hr>
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
      <footer className="h-16 p-5 text-gray-400 bg-neutral-900 text-center text-xs">
        Questo sito è protetto da reCAPTCHA e si applicano l
        googlePrivacyPolicyLink Informativa sulla privacy
        googlePrivacyPolicyLink e i googleTermsLink Termini di servizio
        googleTermsLink di Google.
      </footer>
    </div>
  );
}
