var game_data = require("game_data");
var obj = game_data.obj;
var person = game_data.person;

cc.Class({
    extends: cc.Component,

    properties: {
        maskNode:{
            default:null,
            type:cc.Node
        },
        person_act:{
            default:null,
            type:cc.Node
        }
    },

    init:function(){
        this.person_run = this.person_act.getComponent('person_run');
    },

    //碰撞处理函数，已在初始化时开启系统
    onCollisionEnter: function (other, self) {    
        if(this.person_run.claw_state!='down'){
            return false;
        } 

        
        //判断碰撞物体类型,0-air,1-gold,2-stone
        if(other.tag>=2 && other.tag <=5){
            person.predict_type = 1;
        }
        else if(other.tag >5){
            person.predict_type = 2;
        }
        else{
            person.predict_type = 0;
        }

        var obj_temp=obj['tag_'+other.tag];
        this.person_run.claw_state='up';
        

        //將碰撞类型的速度传给该函数，进行相应的动画展示和逻辑动作
        this.person_run.getAnimation(obj_temp); 
        person.predict_money=obj_temp.value; 

        //非空非撞墙情况，即勾到东西的情况
        if(obj_temp.value!==0){
            //执行钩子抓紧金块动作
            this.person_run.clawClose();
            //将抓到的预制金块由掩盖节点控制
            var objNode = this.maskNode;
            var objsprite=other.node.getComponent(cc.Sprite);
            //获得金块相应的精灵组件配置
            objNode.getComponent(cc.Sprite).spriteFrame=objsprite.spriteFrame;
            objNode.width = obj_temp.size.x;
            objNode.height = obj_temp.size.y;
            //将获得的部分钩子透明
            this.show_claw();
            //销毁碰撞对象
            other.node.destroy(); 
        } 
    },

    show_claw:function(){
        this.maskNode.opacity = 255;
    },

    Hide_claw:function(){
        this.maskNode.opacity = 0;
    }
});
