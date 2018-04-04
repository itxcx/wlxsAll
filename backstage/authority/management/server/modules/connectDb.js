/********************************************
 * common mongodb connection function module
 * author:Jilon
 * 2018-3-1
 * ******************************************/

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const dbUrl = "mongodb://127.0.0.1:27017/backstage";


/*********************************************
 * 数据库连接方法封装, 最后以模块的方式导出
 * parames
 * @{callback} 数据库连接完成后的回调方法,实现对数据库的CURD操作
 * @{collectionName} 数据库连接完成后要实现CURD操作的集合
 * @{condition} 操作数据库的初始参数
 * @{newcondition}  修改对数据库的修改为参数
 * *********************************************/
const MongoConnection = function (callback, collectionName, condition, newcondition) {
    MongoClient.connect(dbUrl, (connectError, client) => {
        if(connectError) {
            console.log(connectError);
            console.log(`数据库连接失败`);
        }else{
            console.log(`数据库连接成功`);
            let dbname = 'backstage';
            let collection = collectionName;
            let db = client.db(dbname);
            //数据库操作方法
            callback(db, collection, client, condition, newcondition);
        }
    });
};

/***********
 * 操作数据库的方法封装对象,包括7个属性,分别实现对数据库的操作,
 * 调用方法为使用对象的属性值,将此属性值传入数据库连接方法中, 为callback,
 * 前三个参数在数据库连接方法中默认传递, 只需要传递后面2个或者3个参数,
 * 最后一个callback参数为操作数据库成功后的回调方法,也可以不传callback
 * parames
 * @{db}/${collectionName}/${client} 3个参数不用传,在数据库连接方法中
 * @{condition} 数据库操作条件
 * @{newcondition}  数据库修改条件
 * @{callback} 数据库操作成功后的回调方法, 可以将数据库操作后的返回值作为参数
 * *****/

const MongoCtrl = {
    //数据查询
    find : function(db, collectionName, client, condition, callback) {
        let result = db.collection(collectionName).find(condition);
        result.toArray(function(findError,data){
          if(findError) {
            console.log(findError);
          }else{
            callback(data);
            client.close();
          }
        })
    },
    //数据插入
    insertOne : function(db, collectionName, client, condition, callback) {
        db.collection(collectionName).insertOne(condition, function(error, result) {
            if(error) {
                console.log(error);
            }else{
                //console.log(result.message.parsed);
                console.log(result.result.n);
                callback(result.result.n);
                client.close();
            }
        })
    },
    insertMany : function(db, collectionName, client, condition, callback) {
        db.collection(collectionName).insertMany(condition, function(error, result) {
            if(error) {
                console.log(error);
            }else{
                console.log(result.result.n);
                callback(result.result.n);
                client.close();
            }
        })
    },
    //数据修改
    updateOne: function(db, collectionName, client, condition, newcondition, callback) {
        db.collection(collectionName).updateOne(condition, newcondition, function(error, result) {
            if(error) {
                console.log(error);
            }else{
                console.log(result.result.nModified);
                callback(result.result.nModified);
                client.close();
            }
        })
    },
    updateMany: function(db, collectionName, client, condition, newcondition, callback) {
        db.collection(collectionName).updateMany(condition, newcondition, function(error, result) {
            if(error) {
                console.log(error);
            }else{
                console.log(result.result.nModified);
                callback(result.result.nModified);
                client.close();
            }
        })
    },
    //数据删除
    delete: function(db, collectionName, client, condition, callback) {
        db.collection(collectionName).delete(condition, function(error, result) {
            if(error) {
                console.log(error);
            }else{
                console.log(result.result.n);
                callback(result.result.n);
                client.close();
            }
        })
    },
    deleteMany: function(db, collectionName, client, condition, callback) {
        db.collection(collectionName).deleteMany(condition, function(error, result) {
            if(error) {
                console.log(error);
            }else{
                console.log(result.result.n);
                callback(result.result.n);
                client.close();
            }
        })
    }
};

//模块导出
module.exports = {
    Mongoclient: MongoConnection,
    MongoFun: MongoCtrl
};
