import React, { useEffect, useMemo } from "react";
//@ts-ignore: getting error Cannot find module './index.module.scss' or its corresponding type declarations.
import styles from "./index.module.scss";

const Home: React.FC = () => {
  const firstName = "yeexing 1";
  const lastName = "sim";
  const email = "yeexing+test@whiteroom.work";

  const isLogin = useMemo(() => {
    return localStorage.getItem("email");
  }, []);

  const isPendingPurchase = useMemo(() => {
    return localStorage.getItem("isPendingPurchase");
  }, []);

  useEffect(() => {
    if (isLogin) {
      if (isPendingPurchase) {
        // TODO: show request payment message
      }
    }
  }, [isLogin, isPendingPurchase]);

  return (
    <div className={styles.container}>
      <h1>Welcome!</h1>

      <div>
        <h2>Products</h2>

        <div>
          <h3>Product 1: Subscription</h3>
          <a
            target="_blank"
            href={`http://wcreact.local/cart?add-to-cart=12&firstname=${firstName}&lastname=${lastName}&email=${email}`}
            rel="noreferrer"
          >
            Upgrade
          </a>
        </div>
        <a href="http://wcreact.local/wp-json/sand_login/login?username=y.xing1999@gmail.com">
          Hello
        </a>
        <a
          href="http://wcreact.local/wp-json/sand_login/login?username=y.xing1999@gmail.com"
          target="popup"
          onClick={() => {
            window.open(
              "http://wcreact.local/wp-json/sand_login/login?username=y.xing1999@gmail.com",
              "popup",
              "width=600,height=600"
            );
          }}
        >
          Open Link in Popup
        </a>

        <div>
          <h3>Product 2: Life time</h3>
          <a
            href={`http://wcreact.local/cart?add-to-cart=13&firstname=${firstName}&lastname=${lastName}&email=${email}`}
          >
            Upgrade
          </a>
        </div>
      </div>

      <div>
        <h2>Past Orders</h2>
      </div>
    </div>
  );
};

export default Home;
