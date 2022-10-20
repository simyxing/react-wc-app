import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
//@ts-ignore: getting error Cannot find module './index.module.scss' or its corresponding type declarations.
import styles from "./index.module.scss";

const Home: React.FC = () => {
  const firstName = "yeexing 1";
  const lastName = "sim";
  const email = "yeexing+test@whiteroom.work";

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    wc_username: "",
    wc_password: "",
    wc_id: undefined,
    type: "lite",
    selectedPlan: "", // plus or subscription
    isPendingUpgrade: false,
  });

  const isLogin = useMemo(() => {
    return localStorage.getItem("email");
  }, []);

  const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState(0);
  const [subscriptionOrders, setSubscriptionOrders] = useState([]);
  const [subscriptionOrderCount, setSubscriptionOrderCount] = useState(0);

  //get user info from DB
  const getUser = useCallback(async () => {
    const res = await axios.get(`http://localhost:5001/profile`, {
      params: { email: isLogin },
    });
    setUserData(res.data.data);
  }, [isLogin]);

  const getOrders = useCallback(async () => {
    console.log("i am in");

    if (!userData.selectedPlan) {
      return;
    }

    const res = await axios.get(
      `http://localhost:5001/wc/orders/${userData.wc_id}`,
      {
        params: { productId: userData.selectedPlan === "plus" ? 12 : 13 },
      }
    );
    setOrders(res.data.data);
    setOrderCount(res.data.count);
  }, [userData.selectedPlan, userData.wc_id]);

  const getSubscriptionOrders = useCallback(async () => {
    if (!userData.selectedPlan) {
      return;
    }
    const res = await axios.get(
      `http://localhost:5001/wc/orders/${userData.wc_id}`,
      {
        params: { productId: userData.selectedPlan === "plus" ? 12 : 13 },
      }
    );
    setSubscriptionOrders(res.data.data);
    setSubscriptionOrderCount(res.data.count);
  }, [userData.selectedPlan, userData.wc_id]);

  useEffect(() => {
    console.log(isLogin);
    if (isLogin) {
      getUser();
      getOrders();
      getSubscriptionOrders();
    }
  }, [getOrders, getSubscriptionOrders, getUser, isLogin]);

  const email1 = "yeexing";

  return (
    <div className={styles.container}>
      <h1>Welcome!</h1>

      {/* If user is login and has pendingCheckout in DB, show a link to allow user to make payment */}
      {isLogin && userData.isPendingUpgrade && (
        <a
          href={`http://wcreact.local/wp-json/wr_wc_react_auto_login/login?username=${email1}&product=13&pass=yeexing`}
          target="popup"
          onClick={() => {
            window.open(
              `http://wcreact.local/wp-json/wr_wc_react_auto_login/login?username=${email1}&product=13&pass=yeexing`,
              "popup",
              "width=600,height=600"
            );
          }}
        >
          Open Link in Popup
        </a>
      )}
      {/* else show product so they can make purchase of it, modify the following to make it behave like above
       * check if wc account exist, create if no
       * redirect them to make payment
       * if success, close popup and upgrade user account
       */}
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
        <h2>Past Orders (Count: {orderCount})</h2>
        <table>
          <tr>
            <td>id</td>
            <td>status</td>
            <td>payment_method</td>
            <td>customer_id</td>
            <td>needs_payment</td>
            <td>total</td>
            <td>payment_url</td>
          </tr>
          {orders.map(
            (o: {
              id;
              status;
              payment_method;
              customer_id;
              needs_payment;
              total;
              payment_url;
            }) => (
              <tr>
                <td>{o.id}</td>
                <td>{o.status}</td>
                <td>{o.payment_method}</td>
                <td>{o.customer_id}</td>
                <td>{`${o.needs_payment}`}</td>
                <td>{o.total}</td>
                <td>{o.needs_payment && <a href={o.payment_url}>Pay</a>}</td>
              </tr>
            )
          )}
        </table>
      </div>
      <div>
        <h2>Subscriptions Orders (Count: {subscriptionOrderCount})</h2>
        <table>
          <tr>
            <td>id</td>
            <td>status</td>
            <td>payment_method</td>
            <td>customer_id</td>
            <td>needs_payment</td>
            <td>total</td>
            <td>payment_url</td>
          </tr>
          {subscriptionOrders.map(
            (o: {
              id;
              status;
              payment_method;
              customer_id;
              needs_payment;
              total;
              payment_url;
            }) => (
              <tr>
                <td>{o.id}</td>
                <td>{o.status}</td>
                <td>{o.payment_method}</td>
                <td>{o.customer_id}</td>
                <td>{`${o.needs_payment}`}</td>
                <td>{o.total}</td>
                <td>{o.needs_payment && <a href={o.payment_url}>Pay</a>}</td>
              </tr>
            )
          )}
        </table>
      </div>
    </div>
  );
};

export default Home;
