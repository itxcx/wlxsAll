const express = require('express');
const Mongo = require('../../modules/connectDb');
const login = express.Router();

//用户登录接口
login.post('/api/login/getUserInfo', (req, res) => {
    let data ={"name": req.body.username, "password": req.body.password};
    Mongo.Mongoclient(Mongo.MongoFun.find, 'user', data, function(result) {
      if(result && result.length === 1) {
        //console.log(req.session);
        req.session.userinfo = req.body.username;
        res.json({'message': 'successs', 'code': 0});
      }else{
        res.json({'message': '用户名或密码错误!', 'code': 1});
      }
    })
});

//用户列表获取接口
login.get('/api/login/getUserInfo', (req, res) => {
  Mongo.Mongoclient(Mongo.MongoFun.find, 'user', {}, function(result) {
    if(result && result.length > 0) {
      res.json(result);
    }else{
      res.json({'message': '当前没有用户', 'code': 1});
    }
  })
});

//删除用户接口
login.post('/api/login/deleteUser', (req, res) => {
  // let data = req.body;
  // for(let i = 0; i < req.body.length; i++) {
  //   Mongo.Mongoclient(Mongo.MongoFun.deleteOne, 'user', req.body[i], (result) => {
  //     if(result) {
        res.json({'message': 'success', 'code': 0});
  //     }
  //   })
  // }
})

//导出模块
module.exports = login;
