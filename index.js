// neem express-module en steek functionaliteit in constante
const express = require('express');
const port = 1000;

// constante aanmaken die als webserver zal dienen
const app = express();

// bibliotheek inladen om paden naar folder te maken
const path = require('path');

// Vertel aan webserver dat ik gebruik maak van view engine en dan ook van dewelke, nl. EJS
app.set("views", "views");
app.set("view engine", "ejs");

// databestand inladen
const blogposts = require('./data/blog.json');

// route naar "homepagina" laten werken
app.get('/', function(req,res){
  res.render('home', {
    // Array van blogberichten doorgeven aan de renderfunctie om op de homepagina te tonen.
    posts: blogposts.blog
  });
});

// detailpagina van een blogbericht
app.get('/blog/:postid', function(req,res){
  res.render('detail', {
    post: blogposts.blog[req.params.postid]
  });
});

// vertel aan webserver waar de publieke bestanden zitten
app.use(express.static('public'));

// webserver luister naar GET-commando van verschillende pagina's
app.get("/", function(request, response){
  // vanuit de views-map de juiste pagina halen en renderen
  response.render("home");
});
app.get("/blog", function(request, response){
  response.render("blog",{
    posts: blogposts.blog
  });
});
app.get("/blog/:blogid", function(request, response){
  response.send("blogbericht nr: "+request.params.blogid);
});
app.get("/contact", function(request, response){
  response.render("contact");
});


// Wanneer de URL niet gevonden werd in bovenstaande, gebruik dan de 404
app.use(function(request, response){
  response.statusCode = 404;
  response.render("404");
});



app.set('port', (process.env.PORT || 1000));

// server opstarten en beschikbaar maken via URL
app.listen(app.get('port'));
