## 依赖

* mongodb 3.0+
* node 7.0+

## 安装mongodb

首先，创建文件`/etc/yum.repos.d/mongodb-org-3.0.repo`，内容如下

```
[mongodb-org-3.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.0/x86_64/
gpgcheck=0
enabled=1
```

然后，安装`mongodb-org`。

>其中包含了 `mongodb-org-mongos`、`mongodb-org-server`、`mongodb-org-shell`、`mongodb-org-tools`


```bash
sudo yum install -y mongodb-org
```

参考链接：https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-red-hat/#install-mongodb

## 安装node

```bash
curl --silent --location https://rpm.nodesource.com/setup_7.x | bash -
```

```bash
yum -y install nodejs
```

参考链接：https://nodejs.org/en/download/package-manager/#enterprise-linux-and-fedora

