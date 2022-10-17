import React from "react";

/**
 * getting error:
 * An import path cannot end with a '.tsx' extension.
 * Consider importing '../../components/signUpForm.js' instead.
 *
 * However removing.tsx will cause error:
 * Module not found: Error: Can't resolve '../../components/signUpForm'
 */
//@ts-ignore
import SignUpForm from "../../components/signUpForm.tsx";
//@ts-ignore
import SignInForm from "../../components/signInForm.tsx";

//@ts-ignore: getting error Cannot find module './index.module.scss' or its corresponding type declarations.
import styles from "./index.module.scss";

const SignUp: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <SignUpForm />
      </div>
      <div className={styles.wrapper}>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignUp;
