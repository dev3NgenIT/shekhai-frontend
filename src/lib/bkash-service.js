import axios from 'axios';
import { getBkashConfig } from './bkash-config';

class BkashService {
  constructor() {
    this.config = getBkashConfig();
    this.tokenCache = {
      value: null,
      expiry: null
    };
  }

  async getAccessToken() {
    // Check if token is cached and valid (60 minutes)
    if (this.tokenCache.value && this.tokenCache.expiry > Date.now()) {
      return this.tokenCache.value;
    }

    try {
      const response = await axios.post(
        `${this.config.BASE_URL}/checkout/token/grant`,
        {
          app_key: this.config.APP_KEY,
          app_secret: this.config.APP_SECRET
        },
        {
          headers: {
            'Content-Type': 'application/json',
            username: this.config.USERNAME,
            password: this.config.PASSWORD
          },
          timeout: 10000
        }
      );

      if (response.data.statusCode === '0000' && response.data.id_token) {
        // Cache token for 60 minutes
        this.tokenCache = {
          value: response.data.id_token,
          expiry: Date.now() + (60 * 60 * 1000) // 60 minutes
        };
        
        console.log('bKash token obtained successfully');
        return response.data.id_token;
      } else {
        throw new Error(`Token grant failed: ${response.data.statusMessage}`);
      }
    } catch (error) {
      console.error('bKash token error:', error.response?.data || error.message);
      throw new Error(`Failed to get access token: ${error.message}`);
    }
  }

  async createPayment(paymentData) {
    try {
      const token = await this.getAccessToken();
      
      const payload = {
        mode: paymentData.mode || '0011',
        payerReference: paymentData.payerReference,
        callbackURL: paymentData.callbackURL || this.config.callbackUrl,
        amount: paymentData.amount,
        currency: paymentData.currency || 'BDT',
        intent: paymentData.intent || 'sale',
        merchantInvoiceNumber: paymentData.merchantInvoiceNumber
      };

      const response = await axios.post(
        `${this.config.BASE_URL}/checkout/create`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
            'X-APP-Key': this.config.APP_KEY
          },
          timeout: 15000
        }
      );

      if (response.data.statusCode === '0000') {
        return {
          success: true,
          paymentID: response.data.paymentID,
          bkashURL: response.data.bkashURL,
          createTime: response.data.createTime,
          transactionStatus: response.data.transactionStatus,
          amount: response.data.amount,
          currency: response.data.currency
        };
      } else {
        return {
          success: false,
          statusCode: response.data.statusCode,
          statusMessage: response.data.statusMessage
        };
      }
    } catch (error) {
      console.error('Create payment error:', error.response?.data || error.message);
      throw new Error(`Payment creation failed: ${error.response?.data?.statusMessage || error.message}`);
    }
  }

  async executePayment(paymentID) {
    try {
      const token = await this.getAccessToken();
      
      const response = await axios.post(
        `${this.config.BASE_URL}/checkout/execute`,
        { paymentID },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
            'X-APP-Key': this.config.APP_KEY
          },
          timeout: 10000
        }
      );

      if (response.data.statusCode === '0000') {
        return {
          success: true,
          paymentID: response.data.paymentID,
          trxID: response.data.trxID,
          amount: response.data.amount,
          transactionStatus: response.data.transactionStatus,
          paymentExecuteTime: response.data.paymentExecuteTime,
          currency: response.data.currency
        };
      } else {
        return {
          success: false,
          statusCode: response.data.statusCode,
          statusMessage: response.data.statusMessage
        };
      }
    } catch (error) {
      console.error('Execute payment error:', error.response?.data || error.message);
      throw new Error(`Payment execution failed: ${error.response?.data?.statusMessage || error.message}`);
    }
  }

  async queryPayment(paymentID) {
    try {
      const token = await this.getAccessToken();
      
      const response = await axios.post(
        `${this.config.BASE_URL}/checkout/payment/status`,
        { paymentID },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
            'X-APP-Key': this.config.APP_KEY
          },
          timeout: 10000
        }
      );

      return {
        success: response.data.statusCode === '0000',
        ...response.data
      };
    } catch (error) {
      console.error('Query payment error:', error.response?.data || error.message);
      throw new Error(`Payment query failed: ${error.message}`);
    }
  }

  async searchTransaction(trxID) {
    try {
      const token = await this.getAccessToken();
      
      const response = await axios.post(
        `${this.config.BASE_URL}/checkout/general/searchTransaction`,
        { trxID },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
            'X-APP-Key': this.config.APP_KEY
          },
          timeout: 10000
        }
      );

      return {
        success: response.data.statusCode === '0000',
        ...response.data
      };
    } catch (error) {
      console.error('Search transaction error:', error.response?.data || error.message);
      throw new Error(`Transaction search failed: ${error.message}`);
    }
  }
}

// Singleton instance
export const bkashService = new BkashService();