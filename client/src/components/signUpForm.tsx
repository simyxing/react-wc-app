import axios from "axios";
import React from "react";

type Props = {
  orderId?: number;
};

const SignUpForm: React.FC<Props> = () => {
  const signUpWithPlanSelected = async () => {
    const data = {
      firstName: "Xing2",
      lastName: "test",
      email: "y.xing1999@gmail.com", // "yeexing+2@whiteroom.work",
      wc_username: "yxing99", // "yeexing+2",
      wc_password: randomPasswordGenerator(),
      selectedPlan: "plus",
      isPendingUpgrade: true,
    };

    const res = await axios.post("http://localhost:5001/profile/profile", {
      data: data,
    });
    const res2 = await axios.post("http://localhost:5001/wc/create-account", {
      data: {
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        username: data.wc_username,
        password: data.wc_password,
      },
    });
    console.log(res, res2);

    localStorage.setItem("email", data.email);
  };

  const signUp = async () => {
    const data = {
      firstName: "Xing 3",
      lastName: "test",
      email: "yeexing+3@whiteroom.work",
    };

    await axios.post("/profile/create-account", { data: data });

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
      <form onSubmit={signUpWithPlanSelected}>
        <button type="submit">Sign Up With PLUS Plan Selected</button>
      </form>

      <form onSubmit={signUp}>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignUpForm;
