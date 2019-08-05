var game_data = require('game_data');
var person = game_data.person;

cc.Class({
    extends: cc.Component,

    properties: {
        bg_1:{
            default:null,
            type:cc.Node
        },
        bg_2:{
            default:null,
            type:cc.Node
        },
        bg_3:{
            default:null,
            type:cc.Node
        }
    },

    onLoad(){
        this.set_backgound();
    },

    init:function(){
        
    },

    set_backgound:function(){
        if(person.layer<=0){
            console.log("未通关");
        }
        else if(person.layer>3){
            console.log("已通关");
            cc.director.loadScene("game_start");
        }
        else if(person.layer == 1){
            this["bg_"+person.layer].active = true;
        }
        else{
            this["bg_"+(person.layer-1)].active = false;
            
            this["bg_"+person.layer].active = true;
        }
    }
});
