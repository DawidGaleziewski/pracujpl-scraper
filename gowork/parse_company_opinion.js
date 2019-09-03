const rp = require('request-promise');
const $ = require('cheerio');

//Selectors
const jobRatingSelector = '.js-employer-rating span';
const jobCommentsSelector = '.review__text';

const parseCompanyOpinion = function(url){
	return rp(url)
		.then(function(html){
			const commentNodesLength = $(jobCommentsSelector,html).length
			const commentsArray = [];


			
			for (let i = 0; i < commentNodesLength; i++){
				//4 filter only the links
				commentsArray.push($(jobCommentsSelector,html)[i].children[0].data)
			}
		

			//console.log(commentsArray[0].children[0]) 

			return {
				jobRating: $(jobRatingSelector, html).text(),
				comments: commentsArray
			}
		})
		
		.catch(function(err) {
			//handle error
		});
}




module.exports = parseCompanyOpinion