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

module.exports = router;
