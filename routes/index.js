var express = require('express');
var router = express.Router();

const apiKey = require('../config');
const apiBaseUrl = 'http://api.themoviedb.org/3';
const imgBaseUrl = 'http://image.tmdb.org/t/p/w300';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;

//$.getJSON(nowPlayingUrl,()=>{});
const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  request.get(nowPlayingUrl,(err,resp,body)=>{
    console.log(typeof(body));
    const parsedData = JSON.parse(body);
    console.log(parsedData);
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;
