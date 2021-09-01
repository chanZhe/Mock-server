# Mock-Server操作文档

### 现支持数据类型:
| 类型  |  对应数据 |
| --- | --- |
| number(min,max) | 整数 |
| string(length) | 英文字符串 |
| url() | 链接 |
| timestamp | 时间戳 |
| float(min,max) | 浮点数 |
| name() | 中文名 |
| id() | id |
| word(length) | 中文字符串 |

数组配置方式例: 
 {"array|min-max":[]} 或 {"array|length":[]}

### 数据库修改:
修改db.config.js文件

```
db.client = new Client({
    mysql: {
        host: "localhost",
        port: 3306,
        database: "api_connect",
        user: "root",
        password: "123456"
    }
});
```
### mock配置tips:
1. 新增或者修改入参，出参需按照json格式配置,例: {"name":"name()","age":"number(1,99)"}
2. 接口路径书写格式为相对地址(必传),例: /api/test

### 服务器发布:
 npm run prd || pm2 start bin/www