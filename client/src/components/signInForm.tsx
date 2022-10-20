import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  orderId?: number;
};

const SignInForm: React.FC<Props> = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (!email) {
      return;
    }
    localStorage.setItem("email", email);

    navigate("/");
  };

  const onChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <>
      <form onSubmit={handleSignIn}>
        <div>
          <label>Email (Must enter a valid user email)</label>
          <br />
          <br />
          <input type={"email"} name="email" onChange={onChange} />
        </div>
        <br />
        <button type="submit">Sign In</button>
      </form>
    </>
  );
};

export default SignInForm;
