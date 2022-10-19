import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
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

  const [orders, setOrders] = useState([]);
  const [orderCount, setOrderCount] = useState(0);

  const getOrders = async () => {
    const res = await axios.get(`http://localhost:5001/wc/orders/${5}`);
    setOrders(res.data.data);
    setOrderCount(res.data.count);
  };

  useEffect(() => {
    if (isLogin) {
      getOrders();
      console.log("i am in");
    }
  }, [isLogin, isPendingPurchase]);

  return (
    <div className={styles.container}>
      <h1>Welcome!</h1>

      {/* If user is login and has pendingCheckout in DB, show a link to allow user to make payment */}
      <a
        href="http://wcreact.local/wp-json/sand_login/login?username=simyxing@gmail.com"
        target="popup"
        onClick={() => {
          window.open(
            "http://wcreact.local/wp-json/sand_login/login?username=simyxing@gmail.com",
            "popup",
            "width=600,height=600"
          );
        }}
      >
        Open Link in Popup
      </a>
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
        {/* TODO: get orders here */}
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
    </div>
  );
};

export default Home;
