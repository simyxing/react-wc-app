import axios from "axios";
import React from "react";

type Props = {
  orderId?: number;
};

const SignUpForm: React.FC<Props> = () => {
  const signUpWithPlanSelected = async (plan: string) => {
    const data = {
      firstName: "yxing 2",
      lastName: "subs",
      email: "simyxing2subscription@gmail.com",
      wc_username: "yxing2subscription",
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
  };

  // FIXME: having error here
  const signUp = async () => {
    const data = {
      firstName: "yxing 1",
      lastName: "without WC",
      email: "simyxingnowc@gmail.com",
      type: "lite",
    };

    await axios.post("http://localhost:5001/profile", {
      data: data,
    });
    localStorage.setItem("email", data.email);
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
      <form onSubmit={signUp}>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignUpForm;
