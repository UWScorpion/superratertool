import { signIn } from "../auth";
import google from "../../public/Googlelogo.svg";

const LoginPage = () => {
  return (
    <div className="flex justify-center">
      <div className="text-4xl mt-[20vh]">
        <div>Welcome to Core Machine Learning Group</div>
        <div className="flex flex-row justify-center mt-[25vh]">
          <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
          >
            <button
              type="submit"
              className="bg-sky-500 px-6 py-2 rounded-md hover:bg-sky-600 active:scale-95 transition-transform duration-200 text-white flex flex-row"
            >
              <img className="w-6 mr-3" src={google.src} alt="" />
              <div className="text-base">Login with Google</div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
