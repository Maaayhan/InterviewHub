/**
 * 默认配置 - Docker 环境支持
 */
module.exports = {
  tcbConfig: {
    env: process.env.TCB_ENV || 'mianshiya-test-xxx', // 改为你的云开发 id
    secretId: process.env.TCB_SECRET_ID || 'xxx',
    secretKey: process.env.TCB_SECRET_KEY || 'xxx',
    credentials: process.env.TCB_CREDENTIALS_PATH
      ? require(process.env.TCB_CREDENTIALS_PATH)
      : (require('../service/login/tcb_custom_login_key(mianshiya-test-xxx).json') || {}),
  },
  redisConfig: {
    host: process.env.REDIS_HOST || 'redis',
    port: process.env.REDIS_PORT || '6379',
    password: process.env.REDIS_PASSWORD || '',
  },
  mongodbConfig: {
    uri: process.env.MONGODB_URI || 'mongodb://admin:admin123@mongodb:27017/?authSource=admin',
  },
};
