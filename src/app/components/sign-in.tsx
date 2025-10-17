import { signIn } from "../(auth)/auth";
import { FaGoogle } from "react-icons/fa";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        type="submit"
        className="flex items-center gap-2 border-b-2 border-orange-500 pb-1  hover:text-orange-500 transition-all duration-300 cursor-pointer"
      >
        <p className="font-bold">Signin with</p>{" "}
        <FaGoogle className="text-2xl hover:text-orange-500 transition-all duration-300 cursor-pointer" />
      </button>
    </form>
  );
}
