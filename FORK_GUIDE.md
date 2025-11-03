# 如何正确 Fork 项目

## 推荐做法：使用 GitHub Fork

### 步骤：

1. **在 GitHub 上 Fork 原仓库**
   - 访问：https://github.com/liyupi/mianshiya
   - 点击右上角的 "Fork" 按钮
   - 这会创建一个完整的副本到你的账户

2. **删除当前的本地仓库连接**
   ```bash
   git remote remove origin
   ```

3. **添加你 Fork 后的仓库作为 origin**
   ```bash
   git remote add origin https://github.com/Maaayhan/InterviewHub.git
   ```

4. **添加原仓库作为 upstream（用于同步更新）**
   ```bash
   git remote add upstream https://github.com/liyupi/mianshiya.git
   ```

5. **推送你的更改**
   ```bash
   git push -u origin master
   ```

### 后续同步原项目更新

```bash
# 获取原项目的最新更新
git fetch upstream

# 合并到你的分支
git merge upstream/master

# 推送到你的仓库
git push origin master
```

### 两个仓库的作用：
- **origin**: 你自己的仓库（你推送和修改的地方）
- **upstream**: 原始仓库（用于同步更新）

