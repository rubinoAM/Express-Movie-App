var express = require('express');
var router = express.Router();

const mysql = require('mysql');
const config = require('../config');
const connection = mysql.createConnection(config.db);
connection.connect();

const apiBaseUrl = 'http://api.themoviedb.org/3';
const imgBaseUrl = 'http://image.tmdb.org/t/p/w300';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${config.apiKey}`;

//$.getJSON(nowPlayingUrl,()=>{}); This doesn't work in node/express!
const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  request.get(nowPlayingUrl,(error,response,body)=>{
    const parsedData = JSON.parse(body); //We now have the data from the Movie Database API
    //res.json(parsedData);
    res.render('nowplaying',{
      parsedData: parsedData.results,
      imgBaseUrl: imgBaseUrl
    });
  });
  //res.render('index', { title: 'Express' });
});

router.get('/search',function(req,res,next){
  res.render('search');
})

router.post('/search/movie',(req,res,next)=>{
  /*
  Submitted data from forms comes in the req object
  Query string data is in req.query
  Posted data is in req.body
  */
  res.json(req.body);
})

router.get('/login',(req,res,next)=>{
  res.render('login');
});

router.post('/loginProcess',(req,res,next)=>{
  const insertQuery = `INSERT into users (email,password)
    VALUES (?,?);`;
  connection.query(insertQuery,[req.body.email,req.body.password],(err,results)=>{
    if(err){throw err;}
    else{
      res.json("Success!");
    }
  });
  res.json(req.body);
});

module.exports = router;
