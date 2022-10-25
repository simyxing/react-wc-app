const Profile = require("../models/profile");

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
require("dotenv").config({ path: "./config.env" });

const api = new WooCommerceRestApi({
  url: "http://wcreact.local/",
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  version: "wc/v3",
});

//   create customer
const createAccount = (req, res, next) => {
  api
    .post("customers", req.body.data)
    .then((response) => {
      Profile.updateOne(
        { email: req.body.data.email },
        { wc_id: response.data.id }
      ).exec();
      res.json({ message: "WC account created" });
    })
    .catch((error) => {
      res.json({ message: "create WC account Failed" });
    });
};

// get all orders based on productid & customer id
const getOrdersByCustId = (req, res, next) => {
  api
    .get("orders", {
      customer: req.params.id,
      per_page: 30,
      product: req.query.productId,
    })
    .then((response) => {
      res.json({
        message: "success",
        data: response.data,
        count: response.data.length,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

// get subscriptions only (without orders)
// const getSubscriptionsByCustId = (req, res, next) => {
//   api
//     .get("subscriptions", {
//       customer: req.params.id,
//       per_page: 30,
//     })
//     .then((response) => {
//       res.json({
//         message: "success",
//         data: response.data,
//         count: response.data.length,
//       });
//     })
//     .catch((error) => {
//       console.log(error.response.data);
//     });
// };

// get subscriptions (with orders) based on customer id
const getSubscriptionsByCustId = (req, res, next) => {
  api
    .get("subscriptions", {
      customer: req.params.id,
      per_page: 30,
    })
    .then((response) => {
      return response.data;
    })
    .then(async (result) => {
      const a = await Promise.all(
        result.map(async (element) => {
          const orders = await api
            .get(`subscriptions/${element.id}/orders`)
            .then((response) => {
              return response.data;
            })
            .catch((error) => {
              console.log(error.response.data);
            });

          return { ...element, test: orders };
        })
      );

      res.json({
        message: "success",
        data: a,
        count: result.length,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  createAccount,
  getOrdersByCustId,
  getSubscriptionsByCustId,
};
