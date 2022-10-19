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
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response.data);
    });
};

//get customer by email - not working if it is guest customer, note: guest customer does not create any account
const getAccountByEmail = (req, res, next) => {
  const data = {
    email: "yeexing+2@whiteroom.work",
    first_name: "yx",
    last_name: "sim",
    username: "yx.sim2",
  };

  api
    .get("customers", { email: data.email })
    .then((response) => {
      console.log(response);
      res.json({ message: "success", data: response.data });
    })
    .catch((error) => {
      console.log(error.response.data);
    });
};

//   create order
const createOrder = (req, res, next) => {
  const data = {
    // payment_method: "bacs",
    // payment_method_title: "Direct Bank Transfer",
    set_paid: false,
    customer_id: 3,
    billing: {
      first_name: "yx",
      last_name: "sim",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
      email: "yeexing+2@whiteroom.work",
      phone: "",
    },
    shipping: {
      first_name: "",
      last_name: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
    },
    line_items: [
      {
        product_id: 12,
        quantity: 1,
      },
    ],
    coupon_lines: [{ code: "FREE" }],
  };

  api
    .post("orders", data)
    .then((response) => {
      console.log(response.data);
      res.json({ message: "success", data: response.data });
    })
    .catch((error) => {
      console.log(error.response.data);
    });
};

const getOrders = (req, res, next) => {
  //get all orders
  api
    .get("orders", { per_page: 30 })
    .then((response) => {
      console.log(response);
      res.json({
        message: "success",
        data: response.data,
        count: response.data.length,
      });
    })
    .catch((error) => {
      console.log(error.response.data);
    });

  //   api
  //     .get("orders", { billing: { email: data.email } })
  //     .then((response) => {
  //       console.log(response);
  //       res.json({ message: "success", data: response.data });
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data);
  //     });
};

const getOrdersByCustId = (req, res, next) => {
  //get all orders
  api
    .get("orders", { customer: 3, per_page: 30 })
    .then((response) => {
      console.log(response);
      res.json({
        message: "success",
        data: response.data,
        count: response.data.length,
      });
    })
    .catch((error) => {
      console.log(error.response.data);
    });

  //   api
  //     .get("orders", { billing: { email: data.email } })
  //     .then((response) => {
  //       console.log(response);
  //       res.json({ message: "success", data: response.data });
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data);
  //     });
};

const upgrade = (req, res, next) => {
  //get all orders
  console.log(req.params);
  res.json({ message: "success", data: req.params });
};

module.exports = {
  createAccount,
  getAccountByEmail,
  createOrder,
  getOrders,
  upgrade,
  getOrdersByCustId,
};
