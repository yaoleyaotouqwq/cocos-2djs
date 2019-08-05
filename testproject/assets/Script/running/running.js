var game_data = require("game_data");
var person = game_data.person;

cc.Class({
    extends: cc.Component,

    properties: {
        backgoundNode:{
            default:null,
            type:cc.Node
        },
        perosonNode:{
            default:null,
            type:cc.Node
        },
        objs:{
            default:null,
            type:cc.Node
        },
        state:{
            default:null,
            type:cc.Node
        },
        clawNode:{
            default:null,
            type:cc.Node
        },
        menuNode:{
            default:null,
            type:cc.Node
        },
    },

    onLoad:function(){
        this.init();

        //载入背景
        this.backgound_init();
        //预制体载入
        this.get_gold_init();
        //设置碰撞体
        this.setCollision();
        //设置鼠标监听
        this.listen_mouse();
        //初始化菜单
        this.menu_init();
        //标牌设立
        this.set_state_init();
        //人物行为
        this.person_run_init();
        //钩子
        this.claw_init();
    },

    init:function(){
        this.backgound = this.backgoundNode.getComponent("backgound");
        this.person_run = this.perosonNode.getComponent('person_run');
        this.get_gold = this.objs.getComponent("get_gold");
        this.state_data = this.state.getComponent("state_data");
        this.claw = this.clawNode.getComponent("claw_action");
        this.menu = this.menuNode.getComponent("layer_menu");
    },

    backgound_init:function(){
        this.backgound.init();
    },

    get_gold_init:function(){
        this.get_gold.init();
    },

    setCollision:function(){
        var collision = cc.director.getCollisionManager(); 
        //开启
        collision.enabled = true; 
    },

    listen_mouse:function(){
        //监听鼠标点击事件
        this.node.on('touchend', function ( event ) {
            //钩子处于摇摆状态且游戏非暂停则钩子状态变为下钩
            if(!person.pause && this.person_run.claw_state == 'rotate'){
                this.person_run.claw_state='down';
            }
       },this);
    },

    menu_init:function(){
        this.menu.init();
    },
    
    set_state_init:function(){
        this.state_data.init();
    },

    person_run_init:function(){
        this.person_run.init();
    },

    claw_init:function(){
        this.claw.init();
    },

    reload_state:function(){
        //设置倒计时和关卡数标牌
        this.state_data.set_layer_num();
        //设置分数标牌
        this.state_data.set_goal_num();
        //分数标牌移动
        this.state_data.move_goad_scoreNode();
        //倒计时和关卡标牌移动
        this.state_data.move_countdownNode();
        //倒计时数值改变
        this.state_data.change_time();
    },

    reload_person_act:function(){
        //人物过场动作
        this.person_run.person_toRight();
    },

    ToNext_layer:function(){
        //载入背景
        this.backgound.set_backgound();
        //预制体载入
        this.get_gold_init();
        //标牌设立
        this.set_state_init();
        this.reload_state();
        //初始化菜单
        this.menu_init();
        //人物行为
        this.person_run_init();
        this.reload_person_act();
        //钩子
        this.claw_init();
    }
});
