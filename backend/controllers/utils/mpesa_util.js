const axios = require("axios");
const Transaction = require("../../models/Transaction");
const { DateTime } = require("luxon");

class MpesaGateway {
  constructor() {
    console.log("Initialized mpesa");

    this.shortcode = 4114083;
    this.consumer_key = "HximSLsAH7G58uZ4nOYAiNFpZqGdGkvr";
    this.consumer_secret = "ixDRGtSNoS3ywsiC";
    this.passKey =
      "2c1fae446d81edb9e1d30a278fe4f4fe8044a1ac36dfe964f943e2d3158adf1e";
    this.access_token_url =
      "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

    this.password = this.generatePassword();
    this.callback_url =
      "https://b1e3-197-237-142-190.ngrok-free.app/api/mpesa-callback";
    this.checkout_url =
      "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    this.register_url_saf_v1 =
      "https://api.safaricom.co.ke/mpesa/c2b/v1/registerurl";
    this.register_url_saf_v2 =
      "https://api.safaricom.co.ke/mpesa/c2b/v2/registerurl";
  }

  generatePassword() {
    const now = DateTime.now();
    this.timestamp = now.toFormat("yyyyMMddHHmmss");
    const password_str = `${this.shortcode}${this.passKey}${this.timestamp}`;
    const password_bytes = Buffer.from(password_str, "ascii");
    return password_bytes.toString("base64");
  }

  checkStatus(data) {
    try {
      const status = data.Body.stkCallback.ResultCode;
      return status;
    } catch (error) {
      console.error("Error:", error);
      return 1;
    }
  }

  getTransactionObject(data) {
    const checkoutRequestId = data.Body.stkCallback.CheckoutRequestID;
    const transaction = Transaction.findOneAndUpdate(
      { checkout_id: checkoutRequestId },

      { upsert: true, new: true }
    );

    return transaction;
  }

  callbackHandler(data) {
    const status = this.checkStatus(data);
    const transaction = this.getTransactionObject(data);
    if (status === 0) {
      console.log("We have successful payment");
      this.handleSuccessfulPay(data, transaction);
    } else {
      console.log("Payment failed");
      transaction.status = 1;
    }
    transaction.status = status;
    transaction.save();
    return { status: "ok", code: 0 };
  }

  async stk_push_request(payload, accessToken) {
    const { amount, phone_number } = payload;

    var phone;
    if (phone_number.startsWith("0")) {
      phone = phone_number.substring(1);
    }

    const req_data = {
      BusinessShortCode: this.shortcode,
      Password: this.password,
      Timestamp: this.timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.ceil(parseFloat(amount)),
      PartyA: `254${phone}`,
      PartyB: this.shortcode,
      PhoneNumber: `254${phone}`,
      CallBackURL: this.callback_url,
      AccountReference: "mazza",
      TransactionDesc: "mazza",
    };

    try {
      const response = await axios.post(this.checkout_url, req_data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const res_data = response.data;

      console.log("Mpesa request data", req_data);
      console.log("Mpesa response info", res_data);

      // if (response.status === 200) {
      //   data.ip =
      //     request.headers["x-forwarded-for"] ||
      //     request.connection.remoteAddress;
      //   data.checkout_request_id = res_data.CheckoutRequestID;

      //   // await Transaction.create(data);

      // }

      return res_data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  handleSuccessfulPay(data, transaction) {
    const items = data.Body.stkCallback.CallbackMetadata.Item;
    let amount, receiptNo, phoneNumber;

    for (const item of items) {
      switch (item.Name) {
        case "Amount":
          amount = item.Value;
          break;
        case "MpesaReceiptNumber":
          receiptNo = item.Value;
          break;
        case "PhoneNumber":
          phoneNumber = item.Value;
          break;
      }
    }

    console.log("We are printing transaction after successful payment ==>");
    console.log(transaction);

    transaction.amount = amount;
    transaction.phone_number = new PhoneNumber(phone_number);
    transaction.receipt_no = receiptNo;
    transaction.confirmed = true;

    return transaction;
  }

  // static refreshToken(decorated) {
  //   return async (gateway, ...args) => {
  //     if (
  //       gateway.access_token_expiration &&
  //       Date.now() > gateway.access_token_expiration
  //     ) {
  //       const token = await gateway.getAccessToken();
  //       gateway.access_token = token;
  //     }
  //     return decorated(gateway, ...args);
  //   };
  // }
}

module.exports = { MpesaGateway };
