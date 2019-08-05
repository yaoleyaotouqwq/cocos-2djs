var game_data = require("game_data");
var menu_state = game_data.menu;
var cloud = game_data.cloud;

cc.Class({
    extends: cc.Component,

    properties: {
    
        starttouchNode:{
            default:null,
            type:cc.AudioSource
        },
        faceNode:{
            default:null,
            type:cc.Node
        },
        legNode:{
            default:null,
            type:cc.Node
        }
    },

    init:function(){
        
    },

    playgame:function(){
        var delay = 0.5;
        
        if(!menu_state.menu_open){
            if(menu_state.sound_state == true){
                this.starttouchNode.play();
            }

            this.scheduleOnce(function(){
                cloud.cloud_stop = true;
                
                cc.director.loadScene("running");
            },delay);
        }
    }
});
