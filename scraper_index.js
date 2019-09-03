//Sources:
	//https://www.freecodecamp.org/news/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3/
	
	//To do, check jak dojade api:
		//https://jakdojade.pl/public/pages/api/http_get.html

//1 Install packages:
//npm install --save request request-promise cheerio puppeteer

//2 Get raw html
const rp = require('request-promise');
const $ = require('cheerio');
const offerParse = require('./offerParse');
const fs = require('fs');


//Search variables
 //Site url - Junior fron end warszawa search url
 const url = 'https://www.pracuj.pl/praca/junior%20front%20end;kw/warszawa;wp';
 const containersSelector = '.results__list-container-item .offer-details__title-link';
 const siteUrl = 'https://www.pracuj.pl';




rp(url)
  .then(function(html){
    //success!
    //console.log(html);
	
	//3 Parsing HTML with Cheerio.js
	 //console.log($(containersSelector, html));
     //console.log($('big > a', html));
	const offerUrls = [];
	const offersNumber =$(containersSelector, html).length

	
	for (let i = 0; i < offersNumber; i++){
		//4 filter only the links
		offerUrls.push($(containersSelector, html)[i].attribs.href);
	}
	
	
	
	return Promise.all(
		offerUrls.map(function(offerUrl){
			//console.log(siteUrl + offerUrl)
			return offerParse(siteUrl + offerUrl)
		})
	)

	
  })
  
  .then(function(jobOffers){
	  const jobOffersString = JSON.stringify(jobOffers)
     //console.log(jobOffersString)
	 
	 fs.writeFile("./jsonoutput/jobs.json", jobOffersString, function(err){
		 if(err){
			 return console.log(err)
		 }
		 
		 console.log("###File was saved!###")
	 })
   })
	
  
  .catch(function(err){
    //handle error
	console.log(err);
  });
  
