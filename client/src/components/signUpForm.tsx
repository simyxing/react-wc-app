import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  orderId?: number;
};

const SignUpForm: React.FC<Props> = () => {
  const navigate = useNavigate();

  const signUpWithPlanSelected = async (plan: string) => {
    const data = {
      firstName: "yxing annual",
      lastName: "final",
      email: "simyxing+annual@gmail.com",
      wc_username: "yxing0annual",
      wc_password: randomPasswordGenerator(),
      selectedPlan: plan,
      isPendingUpgrade: true,
      type: "lite",
    };

    await axios.post("http://localhost:5001/profile", {
      data: data,
    });
    await axios.post("http://localhost:5001/wc/create-account", {
      data: {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        username: data.wc_username,
        password: data.wc_password,
      },
    });

    localStorage.setItem("email", data.email);
    navigate("/");
  };

  const signUp = async () => {
    const data = {
      firstName: "yxing 2",
      lastName: "without WC",
      email: "simyxing+nowc2@gmail.com",
      type: "lite",
    };

    await axios.post("http://localhost:5001/profile", {
      data: data,
    });
    localStorage.setItem("email", data.email);
    navigate("/");
  };

  const randomPasswordGenerator = () => {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 12;
    var password = "";
    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }

    return password;
  };
  return (
    <>
      Sign Up &amp; Create WC account
      <br />
      <button type="submit" onClick={() => signUpWithPlanSelected("plus")}>
        Sign Up With PLUS Plan Selected
      </button>
      <br />
      <br />
      <button
        type="submit"
        onClick={() => signUpWithPlanSelected("subscription")}
      >
        Sign Up With SUBSCRIPTION Plan Selected
      </button>
      <br />
      <br />
      Sign Up only
      <br />
      <button type="submit" onClick={() => signUp()}>
        Sign Up
      </button>
    </>
  );
};

export default SignUpForm;
