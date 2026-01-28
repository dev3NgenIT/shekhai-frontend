import axios from 'axios';

// bKash Sandbox Configuration
const BKASH_CONFIG = {
  BASE_URL: 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout',
  APP_KEY: '4f6o0cjiki2rfm34kfdadl1eqq',
  APP_SECRET: '2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b',
  USERNAME: 'sandboxTokenizedUser02',
  PASSWORD: 'sandboxTokenizedUser02@12345',
};

export async function POST(request) {
  try {
    const { action, data } = await request.json();

    let response;
    
    switch (action) {
      case 'getToken':
        response = await axios.post(
          `${BKASH_CONFIG.BASE_URL}/token/grant`,
          {
            app_key: BKASH_CONFIG.APP_KEY,
            app_secret: BKASH_CONFIG.APP_SECRET,
          },
          {
            headers: {
              'username': BKASH_CONFIG.USERNAME,
              'password': BKASH_CONFIG.PASSWORD,
              'Content-Type': 'application/json',
            },
          }
        );
        break;

      case 'createPayment':
        response = await axios.post(
          `${BKASH_CONFIG.BASE_URL}/create`,
          data,
          {
            headers: {
              'Authorization': data.token,
              'X-APP-Key': BKASH_CONFIG.APP_KEY,
              'Content-Type': 'application/json',
            },
          }
        );
        break;

      case 'executePayment':
        response = await axios.post(
          `${BKASH_CONFIG.BASE_URL}/execute`,
          { paymentID: data.paymentID },
          {
            headers: {
              'Authorization': data.token,
              'X-APP-Key': BKASH_CONFIG.APP_KEY,
              'Content-Type': 'application/json',
            },
          }
        );
        break;

      case 'queryPayment':
        response = await axios.post(
          `${BKASH_CONFIG.BASE_URL}/payment/status`,
          { paymentID: data.paymentID },
          {
            headers: {
              'Authorization': data.token,
              'X-APP-Key': BKASH_CONFIG.APP_KEY,
              'Content-Type': 'application/json',
            },
          }
        );
        break;

      default:
        return Response.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return Response.json(response.data);
  } catch (error) {
    console.error('bKash API Error:', error.response?.data || error.message);
    return Response.json(
      {
        error: error.message,
        details: error.response?.data,
      },
      { status: error.response?.status || 500 }
    );
  }
}