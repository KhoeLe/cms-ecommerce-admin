import { SignIn } from "@clerk/nextjs";

export default function Page() {

  // find a className = cl-internal-b3fm6y a hidden it

  // how to remove className = cl-internal-b3fm6y a hidden it




  return <SignIn appearance ={
    {
      layout: {
        helpPageUrl: "",
        logoImageUrl: "https://clerk.com/_next/image?url=%2Fimages%2Fclerk-logo.svg&w=96&q=75",
        logoPlacement: "inside",
      }
    }
  }/>;
}
