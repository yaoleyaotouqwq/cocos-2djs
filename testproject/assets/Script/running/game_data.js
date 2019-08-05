const person = 
{
    //人物所在关卡
    layer:1,
    //现有
    save_money:0,
    //将有
    predict_money:0,
    //0-air,1-gold,2-stone
    predict_type:0,
    face_loc:cc.v2(-182.8,90.1),
    leg_loc:cc.v2(-239,-186),
    //开始游戏前的位置
    start_location:cc.v2(-197,-21),
    //矿工过场前的起始坐标
    person_location:cc.v2(-560,225),
    //run 或 end
    game_state:'run',
    //过场前暂停，过场后开启
    pause:true,

    runGame:function(){
        this.game_state = 'run';
    },
    game_isrun:function(){
        return this.game_state == 'run';
    },
    game_ispause:function(){
        return this.pause;
    }
}

//对象类型及其属性
var obj = {
    tag_1:{
        name:"air",
        pull_speed:5,
        value:0,
        //指定动画加载类型，拼凑成文件名，同下
        type:'fast',
        size:cc.v2(0,0)
    },
    tag_2:{
        name:"gold_1",
        pull_speed:4,
        value:50,
        type:'light',
        size:cc.v2(50,49)
    },
    tag_3:{
        name:"gold_2",
        pull_speed:3,
        value:100,
        type:'light',
        size:cc.v2(70,70)
    },
    tag_4:{
        name:"gold_3",
        pull_speed:2,
        value:150,
        type:'light',
        size:cc.v2(75,75)
    },
    tag_5:{
        name:"gold_4",
        pull_speed:1,
        value:200,
        type:'heavy',
        size:cc.v2(90,90)
    },
    tag_6:{
        name:"stone_1",
        pull_speed:3,
        value:10,
        type:'light',
        size:cc.v2(50,52)
    },
    tag_7:{
        name:"stone_2",
        pull_speed:2,
        value:15,
        type:'heavy',
        size:cc.v2(60,52)
    }
}

//关卡内对象放置的位置
var obj_location_1 = {
    tag_2:[[500,282],[123,349]],
    tag_3:[[670,123],[142,102]],
    tag_4:[[250,240],[476,135],[334,56]],   
    tag_5:[[881,257],[44,221]],
    tag_6:[[331,300],[796,373],[760,32]],
    tag_7:[[619,223],[150,248],[542,393],[276,143]]
}

var obj_location_2 = {
    tag_2:[[129,374],[258,145],[871,26]],
    tag_3:[[670,123],[53,384]],
    tag_4:[[549,214],[117,136],[913,371],[220,255]],   
    tag_5:[[394,72],[781,247]],
    tag_6:[[336,209],[545,392],[447,159],[681,185]],
    tag_7:[[321,312],[81,220],[710,262],[195,38]]
}

var obj_location_3 = {
    tag_2:[[258,145],[547,65],[133,357]],
    tag_3:[[658,293],[463,289]],
    tag_4:[[549,214],[90,30],[868,137],[220,255]],   
    tag_5:[[394,72],[783,179]],
    tag_6:[[60,374],[545,392],[447,159],[886,237]],
    tag_7:[[321,312],[60,162],[706,162],[195,38]]
}

var cloud = {
    cloud_loc:cc.v2(-635,255),
    cloud_stop:false,
    max_distance:600,
    out_code:false
}

var max_score = {
    cloud_loc:cc.v2(-559,226),
    max_distance:-300
}

var layer = {
    layer_1:{
        //限制事件
        limit_time:60,
        //最低通关得分
        goal:500,
        //分数标牌位置
        goal_banner_loc:cc.v2(559,225),
        //剩余时间及关卡数标牌位置
        time_banner_loc:cc.v2(-388,386),
        //提示栏位置
        tips_loc:cc.v2(-16,434),
        //可钩对象全部位置获取
        obj:get_obj_location(obj_location_1)
    },
    layer_2:{
        //限制事件
        limit_time:60,
        //最低通关得分
        goal:1000+500,
        //分数标牌位置
        goal_banner_loc:cc.v2(559,225),
        //剩余时间及关卡数标牌位置
        time_banner_loc:cc.v2(-388,386),
        //提示栏位置
        tips_loc:cc.v2(-16,434),
        //可钩对象全部位置获取
        obj:get_obj_location(obj_location_2)
    },
    layer_3:{
        //限制事件
        limit_time:60,
        //最低通关得分
        goal:1200+1000+500,
        //分数标牌位置
        goal_banner_loc:cc.v2(559,225),
        //剩余时间及关卡数标牌位置
        time_banner_loc:cc.v2(-388,386),
        //提示栏位置
        tips_loc:cc.v2(-16,434),
        //可钩对象全部位置获取
        obj:get_obj_location(obj_location_3)
    }
}

var menu = {
    location:{
        game_start:cc.v2(552,-325),
        game_run:cc.v2(588,-330)
    },
    menu_open:false,
    music_state:true,
    sound_state:true,
}

function get_obj_location(obj_location){
    
    var location_list = [];
    var loc_item_list,loc_item,temp_x,temp_y;
    
    var layer_infor = obj_location;

    // 得到关卡对应的对象位置，打包返回
    for(temp_x in layer_infor){
        loc_item_list = layer_infor[temp_x];
        
        for(temp_y = 0;temp_y < loc_item_list.length;temp_y++){
            
                loc_item = JSON.parse(JSON.stringify(obj[temp_x]))
                loc_item.x = loc_item_list[temp_y][0];
                loc_item.y = loc_item_list[temp_y][1];
                location_list.push(loc_item);
        }
    }
    return location_list;
}

module.exports = {
    person:person,
    obj:obj,
    layer:layer,
    menu:menu,
    cloud:cloud,
    max_score:max_score
}