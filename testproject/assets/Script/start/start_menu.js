var game_data = require("game_data");
var menu_data = game_data.menu;
var cloud = game_data.cloud;

cc.Class({
    extends: cc.Component,

    properties: {
        button_switchNode:{
            default:null,
            type:cc.Node
        },
        bodyNode:{
            default:null,
            type:cc.Node
        },
        musicNode:{
            default:null,
            type:cc.AudioSource
        },
        music_labelNode:{
            default:null,
            type:cc.Node
        },
        music_switchNode:{
            default:null,
            type:cc.Node
        },
        openmusicNode:{
            default:null,
            type:cc.Node
        },
        closemusicNode:{
            default:null,
            type:cc.Node
        },
        sound_labelNode:{
            default:null,
            type:cc.Node
        },
        sound_switch:{
            default:null,
            type:cc.Node
        },   
        opensoundNode:{
            default:null,
            type:cc.Node
        },
        closesoundNode:{
            default:null,
            type:cc.Node
        },
        out_gameNode:{
            default:null,
            type:cc.Node
        },
        touchNode:{
            default:null,
            type:cc.AudioSource
        },
        closeNode:{
            default:null,
            type:cc.AudioSource
        },
        codeNode:{
            default:null,
            type:cc.Node
        }
    },

    onLoad(){
        //默认打开音乐
        this.open_music();
    },

    init:function(){
    },
    
    open_music:function(){

        if(menu_data.music_state == true){
            this.musicNode.play();
            //初始化音乐图标
            this["openmusicNode"].active = true;
            this["closemusicNode"].active = false;
        }
        else{
            this["openmusicNode"].active = false;
            this["closemusicNode"].active = true;
        }

        if(menu_data.sound_state == true){
            //初始化音效图标
            this["opensoundNode"].active = true;
            this["closesoundNode"].active = false;
        }
        else{
            this["opensoundNode"].active = false;
            this["closesoundNode"].active = true;
        }
        
    },
    
    //点击按钮改变音乐状态
    change_music_state:function(){
        //点击相应音频
        if(menu_data.sound_state == true){
            this.touchNode.play(); 
        }

        if(menu_data.music_state == true){
            this.musicNode.pause();
            menu_data.music_state = false;
            //切换音乐图标，同下
            this["closemusicNode"].active = true;
            this["openmusicNode"].active = false;
        }
        else{
            this.musicNode.play();
            menu_data.music_state = true;
            this["openmusicNode"].active = true;
            this["closemusicNode"].active = false;
        }
        
    },
    //点击按钮改变按键声状态
    change_sound_state:function(){
        
        if(menu_data.sound_state == false){
            this.touchNode.play();
        }

        if(menu_data.sound_state == true){
            this.touchNode.active = false;
            this.closeNode.active = false;
            menu_data.sound_state = false;
            //更改音效图标，同下
            this["opensoundNode"].active = false;
            this["closesoundNode"].active = true;
        }
        else{
            this.touchNode.active = true;
            this.closeNode.active = true;
            menu_data.sound_state = true;
            this["opensoundNode"].active = true;
            this["closesoundNode"].active = false;
        }
        
    },
    
    pop_menu:function(){
        //点击相应音频
        if(menu_data.sound_state == true){
            this.touchNode.play();
        }
        //设置为暂停状态
        menu_data.menu_open = true;
        //将暂停按钮禁用
        this.button_switchNode.getComponent(cc.Button).interactable = false;
        var delay = 0.5;
        //菜单飞来飞去
        var body_action_1 = cc.moveBy(delay,cc.v2(-750,0));
        var body_action_2 = cc.moveBy(delay-0.25,cc.v2(30,0));
        this.bodyNode.setPosition(menu_data.location.game_run); 
        this.bodyNode.runAction(body_action_1);
        this.scheduleOnce(function(){
            this.bodyNode.runAction(body_action_2);
        },delay);
    },

    close_menu:function(){
        //点击相应音频
        if(menu_data.sound_state == true){
            this.closeNode.play();
        }
        var delay = 0.5;
        //菜单飞来飞去
        var body_action_1 = cc.moveBy(delay,cc.v2(-30,0));
        var body_action_2 = cc.moveBy(delay-0.25,cc.v2(750,0));
        this.bodyNode.runAction(body_action_1);
        this.scheduleOnce(function(){
            this.bodyNode.runAction(body_action_2);
        },delay);

        //暂停状态解除
        menu_data.menu_open = false;

        //将暂停按钮开启,菜单按钮恢复原位
        this.scheduleOnce(function(){
            this.button_switchNode.getComponent(cc.Button).interactable = true;
            this.bodyNode.setPosition(menu_data.location.game_start);
            if(cloud.out_code == true){
                cloud.out_code = false;
                this.codeNode.active = false;

                this.music_labelNode.active = true;
                this.music_switchNode.active = true;
                this.sound_labelNode.active = true;
                this.sound_switch.active = true;
                this.out_gameNode.active = true;
            }
        },delay+1);
    },

    //退出游戏
    endGame:function(){
        var delay = 0.5;
        //点击相应音频
        if(menu_data.sound_state == true){
            this.closeNode.play();
        }
        this.scheduleOnce(function(){
            cc.director.end();
        },delay);
    },

    pop_code:function(){
        if(this.button_switchNode.getComponent(cc.Button).interactable){
            this.music_labelNode.active = false;
            this.music_switchNode.active = false;
            this.sound_labelNode.active = false;
            this.sound_switch.active = false;
            this.out_gameNode.active = false;

            cloud.out_code = true;
            this.codeNode.active = true;
            this.pop_menu();
        }
    }
});
