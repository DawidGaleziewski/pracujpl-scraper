//Sources:
	//https://www.freecodecamp.org/news/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3/
	
	//To do, check jak dojade api:
		//https://jakdojade.pl/public/pages/api/http_get.html

//1 Install packages:
//npm install --save request request-promise cheerio puppeteer

//2 Get raw html
const rp = require('request-promise');
const $ = require('cheerio');



//Search variables
 //Site url - Junior fron end warszawa search url
 const url = 'https://www.gowork.pl/opinie/robert-bosch-sp.-z-o.o.;pr/warszawa;l';
 const offerLinkSelector = '.list-group-item company-search-group-item .o-link o-link--blue a';





rp(url)
  .then(function(html){
    //success!
    //console.log(html);
	
	//3 Parsing HTML with Cheerio.js
	 //console.log($(containersSelector, html));
     //console.log($('big > a', html));
	const offerUrls = [];
	const offersNumber =$(offerLinkSelector, html).length

	
	for (let i = 0; i < offersNumber; i++){
		//4 filter only the links
		offerUrls.push($(offerLinkSelector, html)[i].attribs.href);
	}
	
	
	
	return Promise.all(
		offerUrls.map(function(offerUrl){
			console.log(siteUrl + offerUrl)
			return offerParse('https://www.gowork.pl/' + offerUrl)
		})
	)

	
  })
  
  .then(function(presidents){
     console.log(presidents)
   })
	
  
  .catch(function(err){
    //handle error
	console.log(err);
  });
  
