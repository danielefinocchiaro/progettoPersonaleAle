import React from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();

  return (
    <div class="bg-gradient-to-t from-black to bg-neutral-800 flex-grow h-full">
      <div class="bg-neutral-950 h-28 flex items-center">
        <img src="/logo.png" className="h-9 pl-16" />
      </div>
      <div class="bg-gradient-to-t from-neutral-900 to bg-neutral-950 rounded-t-md rounded-b-md px-12 pt-12 mb-8 mt-8 m-auto w-1/2 h-5/6 flex flex-col items-center justify-around">
        <h1 class="font-bold text-5xl text-center text-white">
          {" "}
          Accedi a Spotify
        </h1>
        <div class="pt-12">
          <h3 class="text-base font-bold text-white">
            {" "}
            Indirizzo e-mail o nome utente{" "}
          </h3>
          <form>
            <label for="username"></label>
            <input
              class="w-80 h-10 border-inherit rounded-sm"
              type="email"
              name="username"
              placeholder="indirizzo e-mail o nome utente"
              required
            />
          </form>
        </div>
        <div class="pt-5">
          <h3 class="text-base font-bold text-white "> Password</h3>{" "}
          <form>
            <label for="password"></label>
            <input
              class="w-80 h-10 border-inherit rounded-sm relative"
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </form>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          class="font-bold bg-green-600 rounded-3xl w-80 h-12 hover:scale-105 mt-12"
        >
          Accedi
        </button>
        <a
          href="https://accounts.spotify.com/it/password-reset?flow_ctx=6bcf1352-4ee7-4a82-9cee-4c8896862665%3A1706714292"
          class="text-white hover:text-green-600 py-10"
        >
          {" "}
          <u>Hai dimenticato la password? </u>{" "}
        </a>
        <hr class="w-full text-gray-400"></hr>
        <h2 class="text-gray-400 py-10">
          {" "}
          Non hai un account?{" "}
          <a
            href="https://www.spotify.com/it/signup?flow_id=555a93f7-c891-448f-b311-4ded6af76ce9%3A1706714806&forward_url=https%3A%2F%2Fopen.spotify.com%2Fintl-it%3Fflow_ctx%3D555a93f7-c891-448f-b311-4ded6af76ce9%253A1706714806"
            class="text-white hover:text-green-600"
          >
            {" "}
            <u> Iscriviti a Spotify </u>{" "}
          </a>
        </h2>
      </div>
      <footer class="h-16 p-5 text-gray-400 bg-neutral-900 text-center text-xs">
        Questo sito è protetto da reCAPTCHA e si applicano l
        googlePrivacyPolicyLink Informativa sulla privacy
        googlePrivacyPolicyLink e i googleTermsLink Termini di servizio
        googleTermsLink di Google.
      </footer>
    </div>
  );
}
