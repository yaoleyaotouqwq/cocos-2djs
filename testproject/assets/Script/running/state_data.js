var game_data = require('game_data');
var layer = game_data.layer;
var person = game_data.person;
var cloud = game_data.cloud;

cc.Class({
    extends: cc.Component,

    properties: {
        goad_scoreNode:{
            default:null,
            type:cc.Node
        },
        countdownNode:{
            default:null,
            type:cc.Node
        },
        save_moneyNode:{
            default:null,
            type:cc.Node
        },
        goal_moneyNode:{
            default:null,
            type:cc.Node
        },
        layerNode:{
            default:null,
            type:cc.Node
        },
        timeNode:{
            default:null,
            type:cc.Node
        },
        runningNode:{
            default:null,
            type:cc.Node
        },
        tipsNode:{
            default:null,
            type:cc.Node
        }
    },

    onLoad(){
        //设置倒计时和关卡数标牌
        this.set_layer_num();
        //设置分数标牌
        this.set_goal_num();
        //分数标牌移动
        this.move_goad_scoreNode();
        //倒计时和关卡标牌移动
        this.move_countdownNode();
        //倒计时数值改变
        this.change_time();
    },

    init:function(){
        this.running = this.runningNode.getComponent("running");
        this.tips = this.tipsNode.getComponent("tips_act");
    },
    
    set_layer_num:function(){
        this.layerNode.getComponent(cc.Label).string = person.layer;
        this.timeNode.getComponent(cc.Label).string = layer["layer_"+person.layer].limit_time;
    },

    set_goal_num:function(){
        this.goal_moneyNode.getComponent(cc.Label).string = layer["layer_"+person.layer].goal;
        this.save_moneyNode.getComponent(cc.Label).string = person.save_money;
    },
    move_goad_scoreNode:function(){
        var delay = 1;
        //途径时间为delay，相对起始位置移动，同倒计时标牌
        var move_extent = cc.moveBy(delay,cc.v2(-200,0));
        //设置起点，防止遮盖
        this.goad_scoreNode.setPosition(layer["layer_"+person.layer].goal_banner_loc);
        
        this.goad_scoreNode.runAction(move_extent);
        
    },
    move_countdownNode:function(){
        var delay = 2;
        var move_extent = cc.moveBy(delay,cc.v2(0,-120));
        //设置起点，防止遮盖
        this.countdownNode.setPosition(layer["layer_"+person.layer].time_banner_loc);
        //设置计时器，延缓delay-1时间执行，为的是等待人物进场后再出现
        this.scheduleOnce(function(){
            this.countdownNode.runAction(move_extent);
            
        },delay-1);
        
    },
 
    change_time:function(){
        //获取目前关卡处理的时间
        var total_time = layer["layer_"+person.layer].limit_time;
        
        this.callback = function(){
            if(!person.pause){
                total_time = total_time - 1;
                //改变标牌数值
                this.timeNode.getComponent(cc.Label).string = total_time;
                if(total_time <= 0){
                    this.time_out();
                    //游戏超时，取消计时
                    this.unschedule(this.callback);
                }
            }
        };
        //每秒执行一次计时器
        this.schedule(this.callback,1);
    },

    time_out:function(){
        //该关卡游戏结束，初始金额变为0
        person.game_state = "end";
    },

    get_score:function(){
        //累计分数
        person.save_money += person.predict_money;
        this.save_moneyNode.getComponent(cc.Label).string = person.save_money;
    },

    goNext:function(){
        var words = "";
        
        if(cc.sys.localStorage.getItem('max_score') < person.save_money){
            cc.sys.localStorage.setItem('max_score', person.save_money)
        }
        
        if(parseInt(this.save_moneyNode.getComponent(cc.Label).string) >= layer["layer_"+person.layer].goal){
            words = "通关成功";
            //弹出提示框，同下
            this.tips.move_tips(words);
            //等待提示框结束
            this.scheduleOnce(function(){
                if(person.layer == 3)
                {
                    cloud.cloud_stop = false;
                    cc.director.loadScene("game_start");
                }
                ++person.layer;
                //根据关卡数选择关卡
                this.running.ToNext_layer();
                
            },5);
        }
        else{
            //未通关游戏结束
            words = "通关失败";
            this.tips.move_tips(words);
            this.scheduleOnce(function(){
                cloud.cloud_stop = false;
                cc.director.loadScene("game_start");
            },5);
            
        }
    }
});
