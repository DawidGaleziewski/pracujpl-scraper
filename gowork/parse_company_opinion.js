const rp = require('request-promise');
const $ = require('cheerio');

//Selectors
const jobRatingSelector = '.js-employer-rating span';
const jobCommentsSelector = '.review__text';

const parseCompanyOpinion = function(url){
	return rp(url)
		.then(function(html){
			const commentArray = $(jobCommentsSelector,html).map(function(comment){
					return comment;
				})
			
			return {
				jobRating: $(jobRatingSelector, html).text(),
			}
		})
		
		.catch(function(err) {
			//handle error
		});
}




module.exports = parseCompanyOpinion