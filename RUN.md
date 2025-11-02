# 面试鸭项目运行指南

## 环境要求

- Node.js >= 14（推荐使用 Node.js 16+）
- MongoDB（数据库）
- Redis（缓存，可选）
- 腾讯云开发环境（可选，如需使用云函数功能）

## 快速开始

### 第一步：安装依赖

#### 前端依赖
```bash
cd /Users/mayhan/Documents/AAA.Code/mianshiya
npm install
# 或
yarn install
```

#### 后端依赖
```bash
cd server
npm install
# 或
yarn install
```

### 第二步：配置后端

编辑 `server/src/config/config.local.js`，配置以下信息：

```javascript
module.exports = {
  tcbConfig: {
    env: 'your-tcb-env-id',  // 你的云开发环境 ID
    secretId: 'your-secret-id',
    secretKey: 'your-secret-key',
    credentials: require('../service/login/tcb_custom_login_key(your-env-id).json'),
  },
  redisConfig: {
    host: 'localhost',  // Redis 地址
    port: '6379',        // Redis 端口
    password: '',        // Redis 密码（如果没有则留空）
  },
};
```

**注意：**
- 如果使用 MongoDB 而不是云开发，可能需要修改服务代码
- Redis 如果本地没有，可以暂时注释掉相关代码或使用云 Redis

### 第三步：配置前端代理

编辑 `config/proxy.ts`，修改代理地址为本地后端：

```typescript
export default {
  dev: {
    '/api/': {
      target: 'http://localhost:7592',  // 后端服务地址
      changeOrigin: true,
    },
  },
};
```

### 第四步：配置 hosts（可选）

前端代码中使用了 `local.mianshiya.com:7592`，你需要：

**方案1：修改 hosts 文件**
```bash
sudo vim /etc/hosts
```
添加：
```
127.0.0.1 local.mianshiya.com
```

**方案2：修改前端代码**
编辑 `src/plugins/axios.js`，将：
```javascript
axios.defaults.baseURL = 'http://local.mianshiya.com:7592/api';
```
改为：
```javascript
axios.defaults.baseURL = 'http://localhost:7592/api';
```

### 第五步：启动服务

#### 启动后端（新终端窗口）
```bash
cd server
npm run start:dev
# 或
yarn start:dev
```

后端将在 `http://localhost:7592` 启动

#### 启动前端（新终端窗口）
```bash
cd /Users/mayhan/Documents/AAA.Code/mianshiya
npm run start:dev
# 或
yarn start:dev
```

前端将在 `http://localhost:8000` 启动

### 第六步：访问应用

打开浏览器访问：`http://localhost:8000`

## 常见问题

### 1. 后端启动失败
- 检查 MongoDB 是否运行
- 检查 Redis 是否运行（如果配置了）
- 检查配置文件是否正确

### 2. 前端无法连接后端
- 确认后端已启动（访问 `http://localhost:7592` 测试）
- 检查代理配置是否正确
- 检查 hosts 文件或 axios 配置

### 3. 缺少云开发配置
如果不想使用腾讯云开发，可能需要：
- 修改后端服务代码，使用本地 MongoDB
- 移除云开发相关的依赖和配置

## 开发模式说明

- **前端开发模式**：`npm run start:dev`，支持热更新
- **后端开发模式**：`npm run start:dev`，使用 `config.local.js` 配置

## 生产构建

### 前端构建
```bash
npm run build
```
生成的文件在 `dist` 目录

### 后端生产启动
```bash
cd server
npm run start
```

