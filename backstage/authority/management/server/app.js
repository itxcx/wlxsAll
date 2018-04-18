const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const user = require('./api/user/api'); //调用api
const charts = require('./api/common/charts');
const app = express();

//配置session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 15 },
  rolling: true, //如果有操作,session信息随时更新
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(user);
// app.use(charts);

// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')));
// 因为是单页应用 所有请求都走/dist/index.html
app.get('*', (req, res) => {
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
  res.send(html);
});

////////
app.use((req, res, next) => {
  console.log('ssss');
  if(req.url === '/login' || req.url === '/api/login/getUserInfo') {
    next();
  }else{
    if(req.session.userinfo && req.session.userinfo.username) {
      next();
    }else{
      res.redirect('/login');
    }
  }
});


app.listen(90);
