//5. Get information for individual link
const rp = require('request-promise');
const $ = require('cheerio');
//const url = 'https://en.wikipedia.org/wiki/George_Washington';

//Site selectors
const jobTitleSelector = '#offerTitle';
const datePostedSelector = 'span[itemprop="datePosted"]';
const employerSelector = '#offerEmployer';
const addressSelector = 'span[itemprop="addressRegion"]';

const potusParse = function(url){
	return rp(url)
	  .then(function(html) {
		//console.log(html);
		//console.log($('.firstHeading', html).text());
		//console.log($('.bday', html).text());
		return {
			jobTitle: $(jobTitleSelector, html).text(),
			datePosted: $(datePostedSelector, html).text(),
			jobUrl: url,
			employer: $(employerSelector, html).text(),
			address: $(addressSelector, html).text(),
			//Need to figure out how to pass the comments and rating to this object
			employer_opinion: 'test'
		}
	  })
	  .catch(function(err) {
		//handle error
	  });
	  
}

  
//6. Exporting the module to be used in potusScraper
module.exports = potusParse