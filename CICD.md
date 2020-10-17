## 准备

```sh
apt update
apt install npm
```

## Nginx

### nginx 安装

```sh
sudo apt-get install nginx
```

### 基本配置介绍

[教程](https://juejin.im/post/6844903816521842702)

### nginx 控制

```sh
nginx -t // 测试配置文件是否合法

nginx -s reload // 重新加载配置

nginx -s reopen // 重启
```

## Jenkins

### java/jdk 安装

```sh
sudo apt install openjdk-8-jdk
```

### Jenkins 安装

```sh
wget -q -O - https://pkg.jenkins.io/debian/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
echo y|sudo apt-get install jenkins
```

### Jenkins 控制

```sh
systemctl start jenkins // 启动
systemctl stop jenkins // 停止
```

### Jenkins 配置

[教程 1](https://www.shangmayuan.com/a/9607aaeed6d74492b6a70d3c.html)

[教程 2](https://juejin.im/post/6844903743612256264#heading-2)

[教程 3](https://juejin.im/post/6844903984419831815)
