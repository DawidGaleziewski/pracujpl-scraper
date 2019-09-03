//Sources:
	//https://www.freecodecamp.org/news/the-ultimate-guide-to-web-scraping-with-node-js-daa2027dcd3/
	
	//To do, check jak dojade api:
		//https://jakdojade.pl/public/pages/api/http_get.html

//1 Install packages:
//npm install --save request request-promise cheerio puppeteer

//2 Get raw html
const rp = require('request-promise');
const $ = require('cheerio');
const parseCompanyOpinion = require('./parse_company_opinion')



//Search variables
 //Site url - Junior fron end warszawa search url
 const url = 'https://www.gowork.pl/opinie/robert-bosch-sp.-z-o.o.;pr/warszawa;l';
 const companyLinkSelector = '.o-link.o-link--blue';





rp(url)
  .then(function(html){
    //success!
    //console.log(html);
	
	//3 Parsing HTML with Cheerio.js
	const companyDOM = $(companyLinkSelector, html);
	const companyUrl = 'https://www.gowork.pl' + companyDOM[0].attribs.href;
	
	//console.log(companyUrl)
	

	return parseCompanyOpinion(companyUrl)
	
  })
  
  .then(function(company){
     return company
   })
	
  
  .catch(function(err){
    //handle error
	console.log(err);
  });
  
