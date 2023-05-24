const axios = require("axios");

generateToken = async (req, res, next) => {
  const secret = "ixDRGtSNoS3ywsiC";
  const consumer = "HximSLsAH7G58uZ4nOYAiNFpZqGdGkvr";

  const auth = new Buffer.from(`${consumer}:${secret}`).toString("base64");

  axios
    .get(
      "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    )
    .then((response) => {
      //   console.log(response);
      req.safaricom_access_token = response.data.access_token;
      next();
    });
};

module.exports = generateToken;
