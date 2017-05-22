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
/* GET home page. */
var User = sequelize.define('tabs',{
			
			eName:Sequelize.STRING,
			eEmail: Sequelize.STRING
		 },
			{
				timestamps:false
			});
			
			
			sequelize.sync().then(function(){
  console.log('DB connection sucessful.');
},function(err){
  // catch error here
  
  //console.log(err);
  
  console.error('database connection problem'+ err.stack)
  
 // console.log('database connection problem'+ errmsg(err))

});
			
			
			var cacheObj = cacher(sequelize, rc)
		.model('tabs')
		.ttl(1000);
 router.post('/api/retrieve', function(req, res,next) 
	{
		console.log('in api')
		var email=req.body.eEmail;
		console.log(email)
  
		
		cacheObj.findAll({ where: { eEmail:email } })
  .then(function(user) {
	  
	

	  if(user.length !=0)
	  {
		  console.log(user); // sequelize db object 
    console.log(cacheObj.cacheHit); // true or false 
	res.send({"output":user})
	  }
	  else
	  {
		  console.log("its empty");
		res.json({"output":user});
	  }
    
  }).catch(next)
	  
 
  
	
	});


module.exports = router;
