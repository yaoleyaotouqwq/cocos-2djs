var game_data = require("game_data");
var speed_data = game_data.obj["tag_1"];
var person = game_data.person;
var menu_state = game_data.menu;

cc.Class({
    extends: cc.Component,

    properties: {
        ropeNode:{
            default:null,
            type:cc.Node
        },
        clawNode:{
            default:null,
            type:cc.Node
        },
        claw_leftNode:{
            default:null,
            type:cc.Node
        },
        claw_rightNode:{
            default:null,
            type:cc.Node
        },
        menuNode:{
            default:null,
            type:cc.Node
        },
        state_Node:{
            default:null,
            type:cc.Node
        },
        gold_musicNode:{
            default:null,
            type:cc.AudioSource
        },
        stone_musicNode:{
            default:null,
            type:cc.AudioSource
        }
    },

    onLoad:function(){
        //人物过场动作
        this.person_toRight();
    },

    init:function(){
        //得到节点上挂载的组件引用
        this.animation = this.node.getComponent(cc.Animation);
        this.claw = this.clawNode.getComponent('claw_action');
        this.menu = this.menuNode.getComponent("layer_menu");
        this.state_act = this.state_Node.getComponent("state_data");
        //获取精灵组件的属性值
        this.texture = this.node.getComponent(cc.Sprite).spriteFrame;
    },

    person_toRight:function(){
        //创建一秒内移动到相应坐标点的动作
        var delay = 1;
        //获取人物过场前坐标
        var location = person.person_location;
        
        //开场矿工走动动画，定点目的坐标
        var person_act = cc.moveTo(delay+1,cc.v2(0,location.y));
   
        //设置起始坐标
        this.node.setPosition(location);
        
        //延时让goal标牌先出现
        this.scheduleOnce(function(){
            //执行移动
            this.node.runAction(person_act);
        },delay);
        
        //播放动画
        this.animation.play('miner-appear');
        
        //计时器,delay+2时间后停止过场动画
        this.scheduleOnce(function(){
            this.animation.stop();
            //用初始动作的精灵属性替换停止后的渲染属性
            this.getComponent(cc.Sprite).spriteFrame = this.texture;
            //开启钩子动作
            this.ropeRotate();
            //改变人物游戏状态为run
            person.runGame();

            this.scheduleOnce(function(){
                //暂停状态松开，开始计时，给与玩家一秒的反应时间
                person.pause = false;
                //开启菜单功能
                this.menu.open_menu();
            },delay);
        },delay+2);
    },

    person_toLeft:function(){

        //恢复默认的钩子方向
        this.ropeNode.angle = this.rope_save;
        var delay = 1.5;
        //cc.callFunc从一个动作中调用另一个方法
        var next = cc.callFunc(function(target) {
            //结束人物动作
            this.animation.stop(); 
            this.goNext();
        }, this); 

        //回到初始位置
        var person_run =cc.moveTo(delay,person.person_location);
        //先回到初始位置再连贯进行关卡结束动作
        this.node.runAction(cc.sequence(person_run,next));
    },
    
    goNext:function(){
        this.state_act.goNext();
    },

    getAnimation:function(speed){ 
        //根据速度切换动画
        this.animationType='miner-pull-'+speed.type;
        
        this.animation.play(this.animationType);
        //回钩速度获取
        this.speed_num=speed.pull_speed;
   },

    //钩子松开金块恢复初始化状态动作
    clawOpen:function(){ 
        //0.2秒内旋转0°，同下
        var action1 = cc.rotateTo(0.2, 0); 
        var action2 = cc.rotateTo(0.2, 0); 
        this.claw_leftNode.runAction(action1);
        this.claw_rightNode.runAction(action2);
    },
    
    //钩子抓取金块动作
    clawClose:function(){ 
         var action1 = cc.rotateTo(0.1, -15); 
         var action2 = cc.rotateTo(0.1, 15); 
         this.claw_leftNode.runAction(action1);
         this.claw_rightNode.runAction(action2);
    },
    
    ropeRotate:function(){
        //钩绳指针
        var rope=this.ropeNode;
        //存储钩子初始状态
        this.rope_save = this.ropeNode.angle;
        //钩绳摇摆程度
        var rote_extent = 75;
        //钩绳摇摆单位数值
        var drictive=1;
        
        //获取钩子和钩绳初始值,用于重新开始钩金块
        var y=this.clawNode.y; 
        var height=this.ropeNode.height;

        //用于重启动画
        var Pause = false;

        //钩子状态非rotate则必定正在下钩或回钩，需等待动作结束才可进行关卡结束动作
        var endAnimation=false;
        //钩子开始摇摆
        this.claw_state='rotate';
        this.claw.Hide_claw();
        
        //回调计时器
        this.callback = function(){
            //关卡结束，state为end
            if(!person.game_isrun()){
                //人物未进行下钩回钩动作时
                if(this.claw_state == "rotate"){
                    //清零即将获得的金币
                    person.predict_money = 0;
                    //人物暂停游戏
                    person.pause = true;
                    //关卡结束，人物离开
                    
                    this.person_toLeft();
                    //取消此计时器
                    this.unschedule(this.callback);
                }
                else{
                    //正在进行下沟或回钩操作
                    if(!endAnimation){
                        //张开钩子
                        this.clawOpen();
                        
                        //强行回钩
                        this.claw_state = "up";
                        //结束回钩人物动作
                        this.animation.stop();
                        //获取
                        this.getAnimation(speed_data);
                        endAnimation=true;
                    }
                    //上钩
                    up.call(this); 
                }
            }
            else{
                //矿工未喊暂停
                if(!person.game_ispause()){
                    switch(this.claw_state){
                        //钩子状态三部曲
                        case 'up':
                            //恢复暂停时只有回钩才有矿工动作，需要恢复动画的播放
                            if(Pause == true){
                                this.animation.play(this.animationType);
                                Pause = false;
                            }
                            //传入this可使用其他函数定义的this属性，没有这个而使用this的任何属性都会未定义，同下
                            up.call(this);
                            break;
                        case 'down':
                            //下钩
                            down.call(this);
                            break;
                        default:
                            //钩子旋转
                            roate.call(this);
                    }
                }
                else{
                    //暂停时的回钩动作需要暂停矿工动画
                    if(this.claw_state == 'up'){
                        this.animation.pause();
                        Pause = true;
                    }
                }
            }
        }
        //开启计时器，并使用回调来取消
        this.schedule(this.callback,0.01);
        
        function up(){
            var speed_temp = this.speed_num;
            this.ropeNode.height -= speed_temp;
            this.clawNode.y += speed_temp;
            if(this.clawNode.y >= y){
                this.claw_state = 'rotate';
                //恢复原来的位置
                this.clawNode.y = y;
                this.ropeNode.height=height;
                this.animation.stop();
                //恢复人物摇摆钩子的精灵组件配置
                this.getComponent(cc.Sprite).spriteFrame = this.texture;
                //恢复钩子开钩状态
                this.clawOpen();
                //透明掩盖对象的显示
                this.claw.Hide_claw();
                //获得相应的分数
                this.state_act.get_score();
                //得分音效
                if(menu_state.sound_state == true){
                    if(person.predict_type == 1){
                        this.gold_musicNode.play();
                    }
                    else if(person.predict_type == 2){
                        this.stone_musicNode.play();
                    }
                }
                
                //钩回金块放好后默认钩子抓空
                person.predict_type = 0;
            }
        }

        //钩子下抓方法
        function down(){ 
            //超级出钩
            var speed_temp=10;
            //钩绳的height属性是自顶向下为正方向
            this.ropeNode.height+=speed_temp;
            //钩子的y属性是对照平面直角坐标系，纵坐标向下为负方向
            this.clawNode.y-=speed_temp;
        }

        //钩子旋转方法
        function roate(){
            rope.angle+=drictive;
            if(rope.angle>rote_extent){
                drictive=-1;
            }
            if(rope.angle<-rote_extent){
                drictive=1;
            } 
        }
    }

 });
