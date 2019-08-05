var game_data = require('game_data');
var layer = game_data.layer;
var person = game_data.person;

cc.Class({
    extends: cc.Component,

    properties: {
        wordNode:{
            default:null,
            type:cc.Node
        }
    },

    init:function(){

    },

    move_tips:function(words){
        var delay = 1;
        //菜单飞来飞去
        if(words == "通关成功"){
            var body_action_1 = cc.moveBy(delay,cc.v2(0,-450));
            var body_action_2 = cc.moveBy(delay-0.25,cc.v2(0,30));
            var body_action_3 = cc.moveBy(delay-0.25,cc.v2(0,-20));
            var body_action_4 = cc.moveBy(delay-0.25,cc.v2(0,700));
            this.wordNode.getComponent(cc.Label).string = words;
            this.node.setPosition(layer["layer_"+person.layer].tips_loc); 
            this.node.runAction(body_action_1);
            this.scheduleOnce(function(){
                this.node.runAction(body_action_2);
            },delay);
            this.scheduleOnce(function(){
                this.node.runAction(body_action_3);
            },delay+delay-0.25);
            this.scheduleOnce(function(){
                this.node.runAction(body_action_4);
            },delay+delay-0.25+delay-0.25+delay);
        }
        else{
            //这个提示栏想打跳水职业
            var body_action_1 = cc.moveBy(delay-0.5,cc.v2(0,-450));
            var body_action_2 = cc.rotateTo(delay-0.5, 360*6+180);
            var body_action_3 = cc.moveBy(delay-0.5,cc.v2(0,45));
            var body_action_4 = cc.rotateTo(delay-0.5,360);
            var body_action_5 = cc.moveBy(delay-0.5,cc.v2(0,-15));
            this.wordNode.getComponent(cc.Label).string = words;
            this.node.setPosition(layer["layer_"+person.layer].tips_loc); 
            this.node.runAction(body_action_1);
            this.node.runAction(body_action_2);
            this.scheduleOnce(function(){
                this.node.runAction(body_action_3);
                this.node.runAction(body_action_4);
            },delay+delay);
            this.scheduleOnce(function(){
                this.node.runAction(body_action_5);
            },delay+delay+delay);

        }
        
    }   

});
