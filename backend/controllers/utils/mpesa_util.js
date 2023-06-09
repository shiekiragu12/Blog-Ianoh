const axios = require("axios");
const Transaction = require("../../models/Transaction");
const { DateTime } = require("luxon");
const UserInvoice = require("../../models/UserInvoice");

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
    this.callback_url = "https://mazzu-blog.onrender.com/api/mpesa-callback";
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

  async getTransactionObject(data) {
    const checkoutRequestId = data.Body.stkCallback.CheckoutRequestID;
    const transaction = await Transaction.findOne({
      checkout_id: checkoutRequestId,
    });

    return transaction;
  }

  async callbackHandler(data) {
    const checkoutRequestId = data.Body.stkCallback.CheckoutRequestID;
    const resultCode = data.Body.stkCallback.ResultCode;
    const status = this.checkStatus(data);
    const transaction = this.getTransactionObject(data);
    if (status === 0) {
      this.handleSuccessfulPay(data, transaction);
      await Transaction.updateOne(
        { checkout_id: checkoutRequestId },
        { $set: { status: resultCode } }
      );
      transaction.then(async (data) => {
        // console.log("this is transaction object ", data.user_invoice);
        await UserInvoice.updateOne(
          { _id: data.user_invoice },
          { $set: { status: "paid", transaction: data._id } }
        );
      });
    } else {
      console.log("Payment failed");
      transaction.status = 1;
      await Transaction.updateOne(
        { checkout_id: checkoutRequestId },
        { $set: { status: 1 } }
      );
    }

    // transaction.save();
    return { status: "ok", code: 0 };
  }

  async stk_push_request(payload, accessToken) {
    const { amount, phone_number, invoice } = payload;

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

      console.log("Mpesa response info", res_data);

      if (response.status === 200) {
        await Transaction.create({
          checkout_id: res_data.CheckoutRequestID,
          user_invoice: invoice,
        });
      }

      return res_data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  async handleSuccessfulPay(data, transaction) {
    const checkoutRequestId = data.Body.stkCallback.CheckoutRequestID;

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
    await Transaction.updateOne(
      { checkout_id: checkoutRequestId },
      {
        $set: { amount: amount, phone: phoneNumber, receipt_number: receiptNo },
      }
    );

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
