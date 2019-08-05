var game_data = require('game_data');
var layer = game_data.layer;
var person = game_data.person;

cc.Class({
    extends: cc.Component,

    properties: {
        gold_1:{
            default:null,
            type:cc.Prefab
        },
        gold_2:{
            default:null,
            type:cc.Prefab
        },
        gold_3:{
            default:null,
            type:cc.Prefab
        },
        gold_4:{
            default:null,
            type:cc.Prefab
        },
        stone_1:{
            default:null,
            type:cc.Prefab
        },
        stone_2:{
            default:null,
            type:cc.Prefab
        }
    },

    init:function(){
        
        //删除所有的节点
        this.node.removeAllChildren();
        var all_objs = layer["layer_"+person.layer].obj;   
        var item,point;

       
        for(var temp = 0;temp < all_objs.length;temp++){
            item = all_objs[temp];
            point = cc.instantiate(this[item.name]);
            point.parent = this.node;
            point.setPosition(item.x,item.y);
        }
        
    },   
});
