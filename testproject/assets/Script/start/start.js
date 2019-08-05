cc.Class({
    extends: cc.Component,

    properties: {
        
    },  

    onLoad(){
        this.init();
    },  

    init:function(){
        //将参数信息屏蔽
        cc.debug.setDisplayStats(false);
    },
});
