let models = require('../models');
let Twit = require('twit'); 
let config = require('../config/twit');
const Sequelize = require('sequelize');

let T = new Twit(config);
let stream ; 


function CampaignController (CampaignModel) {
  this.model = CampaignModel;
}

CampaignController.prototype.findAll = function(request, response, next){
	this.model.findAll({
		include : [{
			model:  models.Item
		}]
	})
	.then(campaigns => {
		response.json(campaigns);
	});
}

CampaignController.prototype.findById = function(request, response, next){
	this.model.findOne({
		where : { 
			id : request.params._id
		},
		include : [{
			model:  models.Item,
			include : [{
				model: models.Vote,
				attributes: [[Sequelize.fn("COUNT", Sequelize.col("twitter_id")), "Vote"]]
			}],
		}],
		group:['Campaign.id','Items.id']

	})
	.then(campaigns => {
		response.json(campaigns);
	});
}
CampaignController.prototype.activate = function(request, response, next){
	this.model.findOne({
		where : { 
			id : request.params._id
		},
		include : [{
			model:  models.Item,
			include : [{
				model: models.Vote,
				attributes: [[Sequelize.fn("COUNT", Sequelize.col("twitter_id")), "Vote"]]
			}],
		}],
		group:['Campaign.id','Items.id']
	})
	.then(campaign => {
		campaign.update({
			active : true,
		}).then(result =>{
			// ativar stream 

			stream = T.stream('statuses/filter', { track: result.hashtag });
			console.log("Stream is UP!");
			stream.on('tweet', function(tweet){
				
				//compare if has the #hastag for the vote and save it to votes.
				user_id = tweet.user.id;
				let arrayHashtags  = tweet.entities.hashtags.map(x => x.text.toLowerCase());
				for (let x in result.Items){
					let found = arrayHashtags.find(el => el == result.Items[x].hashtag.toLowerCase());
					if (found){
						models.Vote.create({
							ItemId : result.Items[x].id,
							twitter_id: user_id
						}).catch(err=>{
							//console.log(err);
						});
					}
				}
			});

			//ativar servidor de websocket
			
			response.json(result);
		});
	});
} 
CampaignController.prototype.deactivate = function(request, response, next){
	this.model.findOne({
		where : { 
			id : request.params._id
		}
	})
	.then(campaign => {
		campaign.update({
			active : false
		}).then(result =>{
			//desligar servidor do websocket
			if (typeof stream == "object"){
				console.log("Stream is OFF!");
				stream.stop();

			} 

			response.json(result);
		});
	});
}

module.exports = function () {
  return new CampaignController(models.Campaign);
}

