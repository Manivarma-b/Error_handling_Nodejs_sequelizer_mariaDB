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
  })
  
  app.post('/api/update', function(req, res) 
	{
		var email=req.body.email;
		var name=req.body.name;
   var User = sequelize.define('tab', {
			eName: Sequelize.STRING,
			eEmail: Sequelize.STRING,
			timestamps:false
			});
			User.find({where:{eEmail:email}}).then(function(upd){
				if(upd){
					upd.update({
						eName:name,
						eEmail:email
					}).then(function(){
						console.log('update success')
					})
					
				}
			
			})
	})


  module.exports = router;
