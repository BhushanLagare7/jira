import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";

import { SignUpCard } from "@/features/auth/components/sign-up-card";

const SignUpPage = async () => {
  const user = await getCurrent();

  if (user) return redirect("/");

  return <SignUpCard />;
};

export default SignUpPage;
