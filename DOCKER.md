# Docker 运行指南

## 快速启动

### 方式一：使用 Docker Compose（推荐）

```bash
# 启动所有服务（MongoDB、Redis、后端、前端）
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止所有服务
docker-compose down

# 停止并删除数据卷（清除数据）
docker-compose down -v
```

### 方式二：分别启动

```bash
# 1. 启动 MongoDB 和 Redis
docker-compose up -d mongodb redis

# 2. 等待数据库启动完成后，启动后端
docker-compose up -d backend

# 3. 启动前端
docker-compose up -d frontend
```

## 访问服务

- **前端开发服务器**: http://localhost:8000
- **后端 API**: http://localhost:7592
- **MongoDB**: localhost:27017
- **Redis**: localhost:6379

## 环境变量配置

可以通过 `.env` 文件或环境变量配置：

```env
# MongoDB
MONGODB_URI=mongodb://admin:admin123@mongodb:27017/?authSource=admin

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=

# 腾讯云开发（如果使用）
TCB_ENV=your-env-id
TCB_SECRET_ID=your-secret-id
TCB_SECRET_KEY=your-secret-key
```

## 开发模式

开发模式使用 volume 挂载，代码修改会实时生效：

- 前端代码：`./src` -> `/app/src`
- 后端代码：`./server/src` -> `/usr/src/app/src`
- node_modules 不会被挂载（使用容器内的）

## 数据持久化

- MongoDB 数据：`mongodb_data` volume
- Redis 数据：`redis_data` volume

数据会保存在 Docker volumes 中，即使容器删除也不会丢失。

## 常用命令

```bash
# 查看运行状态
docker-compose ps

# 查看后端日志
docker-compose logs -f backend

# 查看前端日志
docker-compose logs -f frontend

# 进入后端容器
docker-compose exec backend bash

# 进入前端容器
docker-compose exec frontend bash

# 重新构建镜像
docker-compose build

# 重建并启动
docker-compose up -d --build
```

## 注意事项

1. **首次启动**: 需要等待 MongoDB 和 Redis 完全启动后才能启动后端
2. **端口冲突**: 确保 27017、6379、7592、8000 端口未被占用
3. **云开发配置**: 如果使用腾讯云开发，需要在 `server/src/config/config.local.js` 中配置
4. **热更新**: 开发模式下，代码修改会自动重新加载

## 故障排查

### 后端无法连接 MongoDB
```bash
# 检查 MongoDB 是否运行
docker-compose ps mongodb

# 查看 MongoDB 日志
docker-compose logs mongodb
```

### 后端无法连接 Redis
```bash
# 检查 Redis 是否运行
docker-compose ps redis

# 测试 Redis 连接
docker-compose exec redis redis-cli ping
```

### 端口被占用
```bash
# 检查端口占用
lsof -i :7592
lsof -i :8000

# 修改 docker-compose.yml 中的端口映射
```

