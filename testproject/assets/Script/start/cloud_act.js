var game_data = require("game_data");
var cloud = game_data.cloud;
var score = game_data.max_score;

cc.Class({
    extends: cc.Component,

    properties: {
        codeNode:{
            default:null,
            type:cc.Node
        },
        scoreNode:{
            default:null,
            type:cc.Node
        },
        scoreLable:{
            default:null,
            type:cc.Node
        }
    },

    onLoad(){
        this.move_clound();
    },

    init:function(){
        
    },
    
    move_clound:function(){

        //读取历史最高分
        var max_score = cc.sys.localStorage.getItem('max_score');

        if(max_score != null){
            this.scoreLable.getComponent(cc.Label).string = max_score;
        }
        else{
            cc.sys.localStorage.setItem('max_score', 0)
        }
        

        var delay = 5;
        //设置两朵云的起始点
        this.codeNode.setPosition(cloud.cloud_loc);
        this.scoreNode.setPosition(score.cloud_loc);

        var action1 = cc.moveBy(delay,cc.v2(4,0));
        var action2 = cc.moveBy(delay,cc.v2(2,0));

        //回调计时器
        this.callback = function(){
            if(cloud.cloud_stop == true){
                this.unschedule(this.callback);
            }

            if(this.codeNode.x >= cloud.max_distance)
            {
                this.codeNode.setPosition(cloud.cloud_loc);
            }
            else{
                this.codeNode.runAction(action1);
            }

            if(this.scoreNode.x < score.max_distance)
            {
                this.scoreNode.runAction(action2);
            }
        }

        //开启计时器，并使用回调来取消
        this.schedule(this.callback,0.01);
    }

});
