import React from "react";

type Props = {
  orderId?: number;
};

const SignUpForm: React.FC<Props> = () => {
  return (
    <>
      <form>
        <div>
          <label>First Name</label>
          <input type={"text"} name="firstName" />
        </div>

        <div>
          <label>Last Name</label>
          <input type={"text"} name="lastName" />
        </div>

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

export default SignUpForm;
