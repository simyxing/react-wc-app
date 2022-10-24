import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
//@ts-ignore: getting error Cannot find module './index.module.scss' or its corresponding type declarations.
import styles from "./index.module.scss";

const Home: React.FC = () => {
  const [userData, setUserData] = useState({
    id: "",
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
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionsCount, setSubscriptionsCount] = useState(0);

  //get user info from DB
  const getUser = useCallback(async () => {
    const res = await axios.get(`http://localhost:5001/profile`, {
      params: { email: isLogin },
    });
    setUserData({ id: res.data.data._id, ...res.data.data });
  }, [isLogin]);

  const getOrders = useCallback(async () => {
    console.log("i am in");
    if (!userData.wc_id) {
      return;
    }

    const res = await axios.get(
      `http://localhost:5001/wc/orders/${userData.wc_id}`,
      {
        params: { productId: 13 },
      }
    );
    setOrders(res.data.data);
    setOrderCount(res.data.count);
  }, [userData.wc_id]);

  const getSubscriptions = useCallback(async () => {
    if (!userData.wc_id) {
      return;
    }
    const res = await axios.get(
      `http://localhost:5001/wc/subscriptions/${userData.wc_id}`
    );
    setSubscriptions(res.data.data);
    setSubscriptionsCount(res.data.count);
  }, [userData.wc_id]);

  useEffect(() => {
    console.log(isLogin);
    if (isLogin) {
      getUser();
      getOrders();
      getSubscriptions();
    }
  }, [getOrders, getSubscriptions, getUser, isLogin]);

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

  // for Logged In user
  // purchase PLUS product
  const purchasePLUS = async (productId: number) => {
    if (!userData.wc_username || !userData.wc_password || !userData.wc_id) {
      console.log("user has no account");
      // generate wc username & password
      // create wc account
      // & update profile
      const wc_username = "yxnoacc";
      const wc_password = randomPasswordGenerator();
      await axios.put(`http://localhost:5001/profile/${userData.id}`, {
        data: {
          wc_username: wc_username,
          wc_password: wc_password,
        },
      });

      await axios.post("http://localhost:5001/wc/create-account", {
        data: {
          email: userData.email,
          first_name: userData.firstName,
          last_name: userData.lastName,
          username: wc_username,
          password: wc_password,
        },
      });

      window.open(
        `http://wcreact.local/wp-json/wr_wc_react_auto_login/login?username=${encodeURIComponent(
          userData.email
        )}&product=${productId}&pass=${wc_password}`,
        "popup",
        "width=600,height=600"
      );
      return;
    }
    window.open(
      `http://wcreact.local/wp-json/wr_wc_react_auto_login/login?username=${encodeURIComponent(
        userData.email
      )}&product=${productId}&pass=${userData.wc_password}`,
      "popup",
      "width=600,height=600"
    );
  };

  const handlePurchase = async (selected: string) => {
    window.open(
      `http://wcreact.local/wp-json/wr_wc_react_auto_login/login?username=${encodeURIComponent(
        userData.email
      )}&product=${selected === "plus" ? 13 : 12}&pass=${userData.wc_password}`,
      "popup",
      "width=600,height=600"
    );
  };

  const handlePay = async (paymentUrl: string) => {
    console.log(userData.wc_username, userData.wc_password, paymentUrl);
    window.open(
      `http://wcreact.local/wp-json/wr_wc_react_auto_login/payment?username=${encodeURIComponent(
        userData.email
      )}&pass=${userData.wc_password}&link=${encodeURIComponent(paymentUrl)}`,
      "popup",
      "width=600,height=600"
    );
  };

  const handleRenewNow = async (subId: string) => {
    const renewalURL = `http://wcreact.local/my-account/?subscription_renewal_early=${subId}&subscription_renewal=true`;
    window.open(
      `http://wcreact.local/wp-json/wr_wc_react_auto_login/payment?username=${encodeURIComponent(
        userData.email
      )}&pass=${userData.wc_password}&link=${encodeURIComponent(renewalURL)}`,
      "popup",
      "width=600,height=600"
    );
  };

  //call api to cancel subscription
  const handleCancelSubscription = async (subId: string) => {
    await axios.put(
      `http://wcreact.local/wp-json/wr_wc_react/update_status?subscription=${subId}&status=pending-cancel`
    );
  };

  //call api to reactivate subscription
  const handleReactivateSubscription = async (subId: string) => {
    await axios.put(
      `http://wcreact.local/wp-json/wr_wc_react/update_status?subscription=${subId}&status=active`
    );
  };

  return (
    <div className={styles.container}>
      <h1>Welcome!</h1>
      {userData.id}
      <br />
      {userData.firstName}
      <br />
      {userData.lastName}
      <br />
      {userData.email}
      <br />
      {userData.wc_username}
      <br />
      {userData.wc_password}
      <br />
      {userData.wc_id}
      <br />
      {userData.type}
      <br />
      {userData.selectedPlan}
      <br />
      {userData.isPendingUpgrade}
      <br />

      {/* If user is login and has pendingCheckout in DB, show a link to allow user to make payment */}
      {isLogin && userData.type === "lite" && userData.isPendingUpgrade && (
        <button onClick={() => handlePurchase(userData.selectedPlan)}>
          Upgrade to selected plan: {userData.selectedPlan}
        </button>
      )}
      {/* else show product so they can make purchase of it, modify the following to make it behave like above
       * check if wc account exist, create if no
       * redirect them to make payment
       * if success, close popup and upgrade user account
       */}
      <div>
        <h2>Products (Presume this is see after logged in)</h2>

        <div>
          <h3>Product 1: Subscription</h3>
          <button onClick={() => purchasePLUS(12)}>
            Upgrade to SUBSCRIPTION plan
          </button>
        </div>

        <div>
          <h3>Product 2: Life time</h3>
          <button onClick={() => purchasePLUS(13)}>Upgrade to PLUS</button>
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
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.status}</td>
                <td>{o.payment_method}</td>
                <td>{o.customer_id}</td>
                <td>{`${o.needs_payment}`}</td>
                <td>{o.total}</td>
                <td>
                  {o.needs_payment && (
                    <button onClick={() => handlePay(o.payment_url)}>
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            )
          )}
        </table>
      </div>
      <div>
        <h2>Subscriptions (Count: {subscriptionsCount})</h2>
        <table>
          <tr>
            <td>id</td>
            <td>status</td>
            <td>payment_method</td>
            <td>needs_payment</td>
            <td>total</td>
            <td>next_payment_date_gmt</td>
            <td>cancelled_date_gmt</td>
          </tr>
          {subscriptions.map(
            (s: {
              id;
              status;
              payment_method;
              needs_payment;
              total;
              payment_url;
              next_payment_date_gmt;
              cancelled_date_gmt;
              test;
            }) => (
              <>
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.status}</td>
                  <td>{s.payment_method}</td>
                  <td>{`${s.needs_payment}`}</td>
                  <td>{s.total}</td>
                  <td>{s.next_payment_date_gmt}</td>
                  <td>{s.cancelled_date_gmt}</td>
                  <td>
                    {!s.needs_payment && s.status === "active" && (
                      <button onClick={() => handleRenewNow(s.id)}>
                        Renew Now
                      </button>
                    )}
                  </td>
                  <td>
                    {s.status !== "cancelled" &&
                      s.status !== "pending-cancel" && (
                        <button onClick={() => handleCancelSubscription(s.id)}>
                          Cancel Subscription
                        </button>
                      )}
                    {s.status === "pending-cancel" && (
                      <button
                        onClick={() => handleReactivateSubscription(s.id)}
                      >
                        Reactivate Subscription
                      </button>
                    )}
                  </td>
                </tr>

                <tr>
                  <td colSpan={5}>
                    <table>
                      <tr>
                        <td>Order Details:</td>
                      </tr>
                      <tr>
                        <td>id</td>
                        <td>status</td>
                        <td>payment_method</td>
                        <td>date_paid</td>
                        <td>needs_payment</td>
                        <td>total</td>
                        <td>payment_url</td>
                      </tr>
                      {s.test.map(
                        (o: {
                          id;
                          status;
                          payment_method;
                          date_paid;
                          needs_payment;
                          total;
                          payment_url;
                        }) => (
                          <tr key={o.id}>
                            <td>{o.id}</td>
                            <td>{o.status}</td>
                            <td>{o.payment_method}</td>
                            <td>{o.date_paid}</td>
                            <td>{`${o.needs_payment}`}</td>
                            <td>{o.total}</td>
                            <td>
                              {o.needs_payment && (
                                <button
                                  onClick={() => handlePay(o.payment_url)}
                                >
                                  Pay
                                </button>
                              )}
                            </td>
                          </tr>
                        )
                      )}
                    </table>
                  </td>
                </tr>
                <br />
              </>
            )
          )}
        </table>
      </div>
    </div>
  );
};

export default Home;
