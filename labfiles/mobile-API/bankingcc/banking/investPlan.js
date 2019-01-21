"use strict";
const Joi = require('joi');
const MessageModel = require("../MessageModel")(Joi);

var log4js = require('log4js');
var logger = log4js.getLogger();
var moment = require('moment');

//this can be replace by REST API output data 
var outputMsg = {"cards":[{"title":"정기 예금","description":"고수익률 보장으로 여유로운 자금 투자에 유리한 상품. 고객님의 자금 계획에 따라 복리식과 단리식을 선택할 수 있는 예금상품입니다.","imageUrl":"https://www.europol.europa.eu/sites/default/files/images/finance_budget.jpg"},
                    {"title":"자유 적립 예금","description":"자유롭게 납입할 수 있는 예금 상품. 입금액에 관계없이 자유롭게 납입할 수 있으며 이자가 월 복리로 계산되는 예금 상품입니다.","imageUrl":"http://cadmuscapitalgroup.com/images/corporate-finance.jpg"},
                    {"title":"회전 정기예금","description":"정기예금에 0.1%를 더한 금리로 회전되는 정기예금. 여유자금 증식에 유리한 상품으로 편의에 따라 월이자 지급식과 만기일시 지급식을 선택할 수 있는 예금상품입니다.","imageUrl":"https://thehaze.org/wp-content/uploads/2017/08/coins_on_chart-1.jpg"}]}

module.exports = {

    metadata: function metadata() {
        return {
            "name": "InvestPlan",
            "properties": {
            },
            "supportedActions": []
        };
    },

    invoke: (conversation, done) => {
        var cards = [];

        for(var i = 0; i < outputMsg.cards.length; i++) {
            var obj = outputMsg.cards[i];
            var action = MessageModel.postbackActionObject(obj.title + " 가입", obj.imageUrl, obj.title) ;                    
            var card = MessageModel.cardObject(obj.title, obj.description, obj.imageUrl, null, [action]);
            cards.push(card);
        }
        var message =  MessageModel.cardConversationMessage("horizontal", cards);
        conversation.reply(message);
        conversation.transition();
        done();
    }
};