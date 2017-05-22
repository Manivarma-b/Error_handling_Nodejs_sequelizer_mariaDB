var express = require('express');
var router = express.Router();
var cacher = require('sequelize-redis-cache');
var Sequelize = require('sequelize');
var redis = require('redis');
var rc = redis.createClient(6379, 'localhost');
var sequelize = new Sequelize('mydb', 'root', 'mani123', {
  host: "127.0.0.1",
  port: 3306,
  maxConcurrentQueries: 1000,
  dialect: 'mariadb'
  })/* GET users listing. */

 router.post('/api/insert', function(req, res) 
	{
		var name=req.body.ename;
		var email=req.body.email;
		console.log(name+""+email)
		 var User = sequelize.define('tab2', {
			eName: Sequelize.STRING,
			eEmail: Sequelize.STRING
			});
		sequelize.sync().then(function() {
		return User.create({
			eName:name,
			eEmail:email
		});
			}).then(function(mani) {
			console.log(mani.get({
			plain: true
			}));
		});
	});



module.exports = router;
