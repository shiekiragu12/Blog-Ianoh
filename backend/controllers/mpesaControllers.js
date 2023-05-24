const { MpesaGateway } = require("./utils/mpesa_util");

const mpesaCallback = async (req, res) => {
  const gateway = new MpesaGateway();
  console.log("Callback from MPESA");
  const data = req.body;
  console.log(data);
  return gateway.callbackHandler(data);
};

const raiseStk = async (req, res) => {
  console.log("inside raiseStk", req.safaricom_access_token);
  const payload = req.body;
  const gateway = new MpesaGateway();
  const gatewayRes = gateway.stk_push_request(
    payload,
    req.safaricom_access_token
  );

  return res.status(200).json("suceessfull");
};

module.exports = { mpesaCallback, raiseStk };
