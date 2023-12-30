"use client";
import { useRef, useState } from "react";
import illustrationDesktop from "@/assets/illustration-sign-up-desktop.svg";
import illustrationMobile from "@/assets/illustration-sign-up-mobile.svg";
import iconList from "@/assets/icon-list.svg";
import iconSuccess from "@/assets/icon-success.svg";
import "@/components/landingpage/Newsletter.css";
import Image from "next/image";

const Page = () => {
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorContact, setErrorContact] = useState<string>("");
  const [isActiveError, setIsActiveError] = useState<boolean>(false);
  const [showState, setShowState] = useState<boolean>(false);
  const inputRefEmail = useRef<HTMLInputElement>(null);
  const inputRefNum = useRef<HTMLInputElement>(null);

  function isValidEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }

  const switchToSignUp = () => {
    setShowState(false);
  };

  const currentEmailValue = () => {
    return inputRefEmail.current?.value || "";
  };

  const submitEmail = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (
      !inputRefEmail.current ||
      inputRefEmail.current.value === "" ||
      !isValidEmail(inputRefEmail.current.value)
    ) {
      setErrorEmail("Valid email required");
      setIsActiveError(true);
      setShowState(false);
      console.log("ERROR: email is valid or empty");
    } else {
      setErrorEmail("");
      setIsActiveError(false);
      setShowState(true);
      console.log("INFO: email is correct");
    }
    if (inputRefNum.current?.value === "") {
      setErrorContact("Contact can't be null");
      setShowState(false);
    }
    if(inputRefNum.current?.value.length!=10 && inputRefNum.current?.value !== ""){
        setErrorContact("Please enter valid contact");
        setShowState(false);
    }
  };

  const thanksState = () => {
    return (
      <div className="container-thank">
        <div>
          <Image alt="Success" src={iconSuccess} />
          <h1 style={{ marginBottom: "1rem" }}>Thanks for subscribing!</h1>
          <p>
            A confirmation email has been sent to{" "}
            <span>{currentEmailValue()}</span>. Please open it and click the
            button inside to confirm your subscription.
          </p>
        </div>
        <button onClick={switchToSignUp}>Dismiss Message</button>
      </div>
    );
  };

  const signupState = () => {
    return (
      <div className="container-signup">
        <div className="side">
          <h1>Stay updated!</h1>

          <div className="list-box">
            <div className="single-list">
              <Image alt="icon" src={iconList} />
              <p>Product discovery and building what matters</p>
            </div>
            <div className="single-list">
              <Image alt="icon" src={iconList} />
              <p>Measuring to ensure updates are a success</p>
            </div>
            <div className="single-list">
              <Image alt="icon" src={iconList} />
              <p>And much more!</p>
            </div>
          </div>
          <div className="form">
            <div className="label-box">
              <div className="label-state" ref={inputRefEmail}>
                Email address
              </div>
              <div className="error-state">{errorEmail}</div>
            </div>
            <input
              type="email"
              placeholder="email@company.com"
              ref={inputRefEmail}
              style={{
                borderColor: isActiveError ? "hsl(4, 100%, 67%)" : "",
                backgroundColor: isActiveError ? "hsla(4, 100%, 67%, 0.2)" : "",
                color: isActiveError ? "hsl(4, 100%, 67%)" : "",
              }}
            />
            <div className="label-box">
              <div className="label-state" ref={inputRefNum}>
                Contact
              </div>
              <div className="error-state">{errorContact}</div>
            </div>
            <input
              type="number"
              placeholder="+91 XXXXXXXXXX"
              ref={inputRefNum}
              style={{
                borderColor: isActiveError ? "hsl(4, 100%, 67%)" : "",
                backgroundColor: isActiveError ? "hsla(4, 100%, 67%, 0.2)" : "",
                color: isActiveError ? "hsl(4, 100%, 67%)" : "",
              }}
            />
            <button onClick={submitEmail}>
              Subscribe to monthly newsletter
            </button>
          </div>
        </div>
        <picture className="side">
          <source media="(max-width: 950px)" srcSet={illustrationMobile} />
          <Image src={illustrationDesktop} alt="image" />
        </picture>
      </div>
    );
  };

  return (
    <div className="main">
      {showState ? <div>{thanksState()}</div> : <div>{signupState()}</div>}
    </div>
  );
};

export default Page;
