const express = require('express');
const Mongo = require('../modules/connectDb');
const api = express.Router();

api.post('/api/login/getUserInfo', (req,res) => {
    let data ={"name": req.body.username, "password": req.body.password};
    Mongo.Mongoclient(Mongo.MongoFun.find, 'user', data, function(result) {
      if(result && result.length === 1) {
        //console.log(req.session);
        req.session.userinfo = req.body.username;
        res.json({'message': 'successs', 'code': 0});
      }else{
        res.json({'message': 'error', 'code': 1});
      }
    })
});
module.exports = api;
