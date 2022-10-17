import React from "react";

type Props = {
  orderId?: number;
};

const SignInForm: React.FC<Props> = () => {
  return (
    <>
      <form>
        <div>
          <label>Email</label>
          <input type={"email"} name="email" />
        </div>
        <div>
          <label>Password</label>
          <input type={"password"} name="password" />
        </div>
      </form>
    </>
  );
};

export default SignInForm;
