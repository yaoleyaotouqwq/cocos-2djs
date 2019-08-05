var game_data = require("game_data");
var person = game_data.person;

cc.Class({
    extends: cc.Component,

    properties: {
        bodyNode:{
            default:null,
            type:cc.Node
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

    onLoad(){
        this.person_move();
    },

    init:function(){
        
    },
    person_move:function(){
        var delay = 1;
        var action1 = cc.moveBy(delay,cc.v2(400,0));
        var action2 = cc.moveBy(delay,cc.v2(400,0));
        var action3 = cc.moveBy(delay,cc.v2(400,0));
        //设置各部位起始位置
        this.bodyNode.setPosition(person.start_location);
        this.faceNode.setPosition(person.face_loc);
        this.legNode.setPosition(person.leg_loc);

        //进行移动
        this.bodyNode.runAction(action1);
        this.faceNode.runAction(action2);
        this.legNode.runAction(action3);
    }
});
