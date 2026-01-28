export const BKASH_CONFIG = {
  // Sandbox configuration
  SANDBOX: {
    BASE_URL: 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized',
    APP_KEY: '4f6o0cjiki2rfm34kfdadl1eqq',
    APP_SECRET: '2is7hdktrekvr28jjq0p9g5mgl',
    USERNAME: 'sandboxTokenizedUser02',
    PASSWORD: 'sandboxTokenizedUser02@12345'
  },
  
  // Production configuration
  PRODUCTION: {
    BASE_URL: 'https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized',
    APP_KEY: process.env.BKASH_APP_KEY,
    APP_SECRET: process.env.BKASH_APP_SECRET,
    USERNAME: process.env.BKASH_USERNAME,
    PASSWORD: process.env.BKASH_PASSWORD
  }
};

// Helper to get config
export const getBkashConfig = () => {
  const isSandbox = process.env.NODE_ENV === 'development' || process.env.BKASH_SANDBOX === 'true';
  return {
    ...(isSandbox ? BKASH_CONFIG.SANDBOX : BKASH_CONFIG.PRODUCTION),
    isSandbox,
    callbackUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/bkash/webhook`
  };
};