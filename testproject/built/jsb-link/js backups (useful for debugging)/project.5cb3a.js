window.__require = function e(t, o, c) {
function n(s, a) {
if (!o[s]) {
if (!t[s]) {
var u = s.split("/");
u = u[u.length - 1];
if (!t[u]) {
var d = "function" == typeof __require && __require;
if (!a && d) return d(u, !0);
if (i) return i(u, !0);
throw new Error("Cannot find module '" + s + "'");
}
}
var l = o[s] = {
exports: {}
};
t[s][0].call(l.exports, function(e) {
return n(t[s][1][e] || e);
}, l, l.exports, e, t, o, c);
}
return o[s].exports;
}
for (var i = "function" == typeof __require && __require, s = 0; s < c.length; s++) n(c[s]);
return n;
}({
backgound: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "54bc6q+7PRMo5D68qKInDil", "backgound");
var c = e("game_data").person;
cc.Class({
extends: cc.Component,
properties: {
bg_1: {
default: null,
type: cc.Node
},
bg_2: {
default: null,
type: cc.Node
},
bg_3: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.set_backgound();
},
init: function() {},
set_backgound: function() {
if (c.layer <= 0) console.log("未通关"); else if (c.layer > 3) {
console.log("已通关");
cc.director.loadScene("game_start");
} else if (1 == c.layer) this["bg_" + c.layer].active = !0; else {
this["bg_" + (c.layer - 1)].active = !1;
this["bg_" + c.layer].active = !0;
}
}
});
cc._RF.pop();
}, {
game_data: "game_data"
} ],
claw_action: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "61335DW2X9CKY3RSmj8ANDE", "claw_action");
var c = e("game_data"), n = c.obj, i = c.person;
cc.Class({
extends: cc.Component,
properties: {
maskNode: {
default: null,
type: cc.Node
},
person_act: {
default: null,
type: cc.Node
}
},
init: function() {
this.person_run = this.person_act.getComponent("person_run");
},
onCollisionEnter: function(e, t) {
if ("down" != this.person_run.claw_state) return !1;
e.tag >= 2 && e.tag <= 5 ? i.predict_type = 1 : e.tag > 5 ? i.predict_type = 2 : i.predict_type = 0;
var o = n["tag_" + e.tag];
this.person_run.claw_state = "up";
this.person_run.getAnimation(o);
i.predict_money = o.value;
if (0 !== o.value) {
this.person_run.clawClose();
var c = this.maskNode, s = e.node.getComponent(cc.Sprite);
c.getComponent(cc.Sprite).spriteFrame = s.spriteFrame;
c.width = o.size.x;
c.height = o.size.y;
this.show_claw();
e.node.destroy();
}
},
show_claw: function() {
this.maskNode.opacity = 255;
},
Hide_claw: function() {
this.maskNode.opacity = 0;
}
});
cc._RF.pop();
}, {
game_data: "game_data"
} ],
cloud_act: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "cc819b2ulBDz5F6fylpBLp8", "cloud_act");
var c = e("game_data"), n = c.cloud, i = c.max_score;
cc.Class({
extends: cc.Component,
properties: {
codeNode: {
default: null,
type: cc.Node
},
scoreNode: {
default: null,
type: cc.Node
},
scoreLable: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.move_clound();
},
init: function() {},
move_clound: function() {
var e = cc.sys.localStorage.getItem("max_score");
null != e ? this.scoreLable.getComponent(cc.Label).string = e : cc.sys.localStorage.setItem("max_score", 0);
this.codeNode.setPosition(n.cloud_loc);
this.scoreNode.setPosition(i.cloud_loc);
var t = cc.moveBy(5, cc.v2(4, 0)), o = cc.moveBy(5, cc.v2(2, 0));
this.callback = function() {
1 == n.cloud_stop && this.unschedule(this.callback);
this.codeNode.x >= n.max_distance ? this.codeNode.setPosition(n.cloud_loc) : this.codeNode.runAction(t);
this.scoreNode.x < i.max_distance && this.scoreNode.runAction(o);
};
this.schedule(this.callback, .01);
}
});
cc._RF.pop();
}, {
game_data: "game_data"
} ],
game_data: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "7610dHCJLRD/62MOH/TvdBw", "game_data");
var c = {
layer: 1,
save_money: 0,
predict_money: 0,
predict_type: 0,
face_loc: cc.v2(-182.8, 90.1),
leg_loc: cc.v2(-239, -186),
start_location: cc.v2(-197, -21),
person_location: cc.v2(-560, 225),
game_state: "run",
pause: !0,
runGame: function() {
this.game_state = "run";
},
game_isrun: function() {
return "run" == this.game_state;
},
game_ispause: function() {
return this.pause;
}
}, n = {
tag_1: {
name: "air",
pull_speed: 5,
value: 0,
type: "fast",
size: cc.v2(0, 0)
},
tag_2: {
name: "gold_1",
pull_speed: 4,
value: 50,
type: "light",
size: cc.v2(50, 49)
},
tag_3: {
name: "gold_2",
pull_speed: 3,
value: 100,
type: "light",
size: cc.v2(70, 70)
},
tag_4: {
name: "gold_3",
pull_speed: 2,
value: 150,
type: "light",
size: cc.v2(75, 75)
},
tag_5: {
name: "gold_4",
pull_speed: 1,
value: 200,
type: "heavy",
size: cc.v2(90, 90)
},
tag_6: {
name: "stone_1",
pull_speed: 3,
value: 10,
type: "light",
size: cc.v2(50, 52)
},
tag_7: {
name: "stone_2",
pull_speed: 2,
value: 15,
type: "heavy",
size: cc.v2(60, 52)
}
}, i = {
cloud_loc: cc.v2(-635, 255),
cloud_stop: !1,
max_distance: 600,
out_code: !1
}, s = {
cloud_loc: cc.v2(-559, 226),
max_distance: -300
}, a = {
layer_1: {
limit_time: 60,
goal: 500,
goal_banner_loc: cc.v2(559, 225),
time_banner_loc: cc.v2(-388, 386),
tips_loc: cc.v2(-16, 434),
obj: d({
tag_2: [ [ 500, 282 ], [ 123, 349 ] ],
tag_3: [ [ 670, 123 ], [ 142, 102 ] ],
tag_4: [ [ 250, 240 ], [ 476, 135 ], [ 334, 56 ] ],
tag_5: [ [ 881, 257 ], [ 44, 221 ] ],
tag_6: [ [ 331, 300 ], [ 796, 373 ], [ 760, 32 ] ],
tag_7: [ [ 619, 223 ], [ 150, 248 ], [ 542, 393 ], [ 276, 143 ] ]
})
},
layer_2: {
limit_time: 60,
goal: 1500,
goal_banner_loc: cc.v2(559, 225),
time_banner_loc: cc.v2(-388, 386),
tips_loc: cc.v2(-16, 434),
obj: d({
tag_2: [ [ 129, 374 ], [ 258, 145 ], [ 871, 26 ] ],
tag_3: [ [ 670, 123 ], [ 53, 384 ] ],
tag_4: [ [ 549, 214 ], [ 117, 136 ], [ 913, 371 ], [ 220, 255 ] ],
tag_5: [ [ 394, 72 ], [ 781, 247 ] ],
tag_6: [ [ 336, 209 ], [ 545, 392 ], [ 447, 159 ], [ 681, 185 ] ],
tag_7: [ [ 321, 312 ], [ 81, 220 ], [ 710, 262 ], [ 195, 38 ] ]
})
},
layer_3: {
limit_time: 60,
goal: 2700,
goal_banner_loc: cc.v2(559, 225),
time_banner_loc: cc.v2(-388, 386),
tips_loc: cc.v2(-16, 434),
obj: d({
tag_2: [ [ 258, 145 ], [ 547, 65 ], [ 133, 357 ] ],
tag_3: [ [ 658, 293 ], [ 463, 289 ] ],
tag_4: [ [ 549, 214 ], [ 90, 30 ], [ 868, 137 ], [ 220, 255 ] ],
tag_5: [ [ 394, 72 ], [ 783, 179 ] ],
tag_6: [ [ 60, 374 ], [ 545, 392 ], [ 447, 159 ], [ 886, 237 ] ],
tag_7: [ [ 321, 312 ], [ 60, 162 ], [ 706, 162 ], [ 195, 38 ] ]
})
}
}, u = {
location: {
game_start: cc.v2(552, -325),
game_run: cc.v2(588, -330)
},
menu_open: !1,
music_state: !0,
sound_state: !0
};
function d(e) {
var t, o, c, i, s = [], a = e;
for (c in a) {
t = a[c];
for (i = 0; i < t.length; i++) {
(o = JSON.parse(JSON.stringify(n[c]))).x = t[i][0];
o.y = t[i][1];
s.push(o);
}
}
return s;
}
t.exports = {
person: c,
obj: n,
layer: a,
menu: u,
cloud: i,
max_score: s
};
cc._RF.pop();
}, {} ],
get_gold: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "479486MiIZIdJmd9XGLj0T4", "get_gold");
var c = e("game_data"), n = c.layer, i = c.person;
cc.Class({
extends: cc.Component,
properties: {
gold_1: {
default: null,
type: cc.Prefab
},
gold_2: {
default: null,
type: cc.Prefab
},
gold_3: {
default: null,
type: cc.Prefab
},
gold_4: {
default: null,
type: cc.Prefab
},
stone_1: {
default: null,
type: cc.Prefab
},
stone_2: {
default: null,
type: cc.Prefab
}
},
init: function() {
this.node.removeAllChildren();
for (var e, t, o = n["layer_" + i.layer].obj, c = 0; c < o.length; c++) {
e = o[c];
(t = cc.instantiate(this[e.name])).parent = this.node;
t.setPosition(e.x, e.y);
}
}
});
cc._RF.pop();
}, {
game_data: "game_data"
} ],
layer_menu: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "5e3b0wFC6ZPl4Pe4wg/Fm6Z", "layer_menu");
var c = e("game_data"), n = c.person, i = c.menu, s = c.cloud;
cc.Class({
extends: cc.Component,
properties: {
button_switchNode: {
default: null,
type: cc.Node
},
bodyNode: {
default: null,
type: cc.Node
},
music_switchNode: {
default: null,
type: cc.AudioSource
},
openmusicNode: {
default: null,
type: cc.Node
},
closemusicNode: {
default: null,
type: cc.Node
},
sound_switch: {
default: null,
type: cc.Node
},
opensoundNode: {
default: null,
type: cc.Node
},
closesoundNode: {
default: null,
type: cc.Node
},
touchNode: {
default: null,
type: cc.AudioSource
},
closeNode: {
default: null,
type: cc.AudioSource
},
returnNode: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.open_music();
},
init: function() {},
open_music: function() {
if (1 == i.music_state) {
this.music_switchNode.play();
this.openmusicNode.active = !0;
this.closemusicNode.active = !1;
} else {
this.openmusicNode.active = !1;
this.closemusicNode.active = !0;
}
if (1 == i.sound_state) {
this.opensoundNode.active = !0;
this.closesoundNode.active = !1;
} else {
this.opensoundNode.active = !1;
this.closesoundNode.active = !0;
}
},
change_music_state: function() {
1 == i.sound_state && this.touchNode.play();
if (1 == i.music_state) {
this.music_switchNode.pause();
i.music_state = !1;
this.closemusicNode.active = !0;
this.openmusicNode.active = !1;
} else {
this.music_switchNode.play();
i.music_state = !0;
this.openmusicNode.active = !0;
this.closemusicNode.active = !1;
}
},
change_sound_state: function() {
0 == i.sound_state && this.touchNode.play();
if (1 == i.sound_state) {
this.touchNode.active = !1;
this.closeNode.active = !1;
i.sound_state = !1;
this.opensoundNode.active = !1;
this.closesoundNode.active = !0;
} else {
this.touchNode.active = !0;
this.closeNode.active = !0;
i.sound_state = !0;
this.opensoundNode.active = !0;
this.closesoundNode.active = !1;
}
},
open_menu: function() {
this.button_switchNode.getComponent(cc.Button).interactable = !0;
},
pop_menu: function() {
1 == i.sound_state && this.touchNode.play();
n.pause = !0;
this.button_switchNode.getComponent(cc.Button).interactable = !1;
var e = cc.moveBy(.5, cc.v2(-770, 0)), t = cc.moveBy(.25, cc.v2(30, 0));
this.bodyNode.setPosition(i.location.game_run);
this.bodyNode.runAction(e);
this.scheduleOnce(function() {
this.bodyNode.runAction(t);
}, .5);
},
close_menu: function() {
1 == i.sound_state && this.closeNode.play();
var e = cc.moveBy(.5, cc.v2(30, 0)), t = cc.moveBy(.25, cc.v2(-750, 0));
this.bodyNode.runAction(e);
this.scheduleOnce(function() {
this.bodyNode.runAction(t);
}, .5);
n.pause = !1;
this.scheduleOnce(function() {
this.button_switchNode.getComponent(cc.Button).interactable = !0;
this.bodyNode.setPosition(i.location.game_run);
}, 1.5);
},
return_start: function() {
n.pause = !0;
1 == i.sound_state && this.touchNode.play();
cc.sys.localStorage.getItem("max_score") < n.save_money && cc.sys.localStorage.setItem("max_score", n.save_money);
this.scheduleOnce(function() {
s.cloud_stop = !1;
n.save_money = 0;
cc.director.loadScene("game_start");
}, .5);
},
endGame: function() {
1 == i.sound_state && this.closeNode.play();
cc.sys.localStorage.getItem("max_score") < n.save_money && cc.sys.localStorage.setItem("max_score", n.save_money);
this.scheduleOnce(function() {
cc.director.end();
}, .5);
}
});
cc._RF.pop();
}, {
game_data: "game_data"
} ],
person_act: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "8a2daJ5/WVH85R5nSdlqPWs", "person_act");
var c = e("game_data").person;
cc.Class({
extends: cc.Component,
properties: {
bodyNode: {
default: null,
type: cc.Node
},
faceNode: {
default: null,
type: cc.Node
},
legNode: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.person_move();
},
init: function() {},
person_move: function() {
var e = cc.moveBy(1, cc.v2(400, 0)), t = cc.moveBy(1, cc.v2(400, 0)), o = cc.moveBy(1, cc.v2(400, 0));
this.bodyNode.setPosition(c.start_location);
this.faceNode.setPosition(c.face_loc);
this.legNode.setPosition(c.leg_loc);
this.bodyNode.runAction(e);
this.faceNode.runAction(t);
this.legNode.runAction(o);
}
});
cc._RF.pop();
}, {
game_data: "game_data"
} ],
person_run: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "91904i9y5FI2bv5mVn9Vk/a", "person_run");
var c = e("game_data"), n = c.obj.tag_1, i = c.person, s = c.menu;
cc.Class({
extends: cc.Component,
properties: {
ropeNode: {
default: null,
type: cc.Node
},
clawNode: {
default: null,
type: cc.Node
},
claw_leftNode: {
default: null,
type: cc.Node
},
claw_rightNode: {
default: null,
type: cc.Node
},
menuNode: {
default: null,
type: cc.Node
},
state_Node: {
default: null,
type: cc.Node
},
gold_musicNode: {
default: null,
type: cc.AudioSource
},
stone_musicNode: {
default: null,
type: cc.AudioSource
}
},
onLoad: function() {
this.person_toRight();
},
init: function() {
this.animation = this.node.getComponent(cc.Animation);
this.claw = this.clawNode.getComponent("claw_action");
this.menu = this.menuNode.getComponent("layer_menu");
this.state_act = this.state_Node.getComponent("state_data");
this.texture = this.node.getComponent(cc.Sprite).spriteFrame;
},
person_toRight: function() {
var e = i.person_location, t = cc.moveTo(2, cc.v2(0, e.y));
this.node.setPosition(e);
this.scheduleOnce(function() {
this.node.runAction(t);
}, 1);
this.animation.play("miner-appear");
this.scheduleOnce(function() {
this.animation.stop();
this.getComponent(cc.Sprite).spriteFrame = this.texture;
this.ropeRotate();
i.runGame();
this.scheduleOnce(function() {
i.pause = !1;
this.menu.open_menu();
}, 1);
}, 3);
},
person_toLeft: function() {
this.ropeNode.angle = this.rope_save;
var e = cc.callFunc(function(e) {
this.animation.stop();
this.goNext();
}, this), t = cc.moveTo(1.5, i.person_location);
this.node.runAction(cc.sequence(t, e));
},
goNext: function() {
this.state_act.goNext();
},
getAnimation: function(e) {
this.animationType = "miner-pull-" + e.type;
this.animation.play(this.animationType);
this.speed_num = e.pull_speed;
},
clawOpen: function() {
var e = cc.rotateTo(.2, 0), t = cc.rotateTo(.2, 0);
this.claw_leftNode.runAction(e);
this.claw_rightNode.runAction(t);
},
clawClose: function() {
var e = cc.rotateTo(.1, -15), t = cc.rotateTo(.1, 15);
this.claw_leftNode.runAction(e);
this.claw_rightNode.runAction(t);
},
ropeRotate: function() {
var e = this.ropeNode;
this.rope_save = this.ropeNode.angle;
var t = 75, o = 1, c = this.clawNode.y, a = this.ropeNode.height, u = !1, d = !1;
this.claw_state = "rotate";
this.claw.Hide_claw();
this.callback = function() {
if (i.game_isrun()) if (i.game_ispause()) {
if ("up" == this.claw_state) {
this.animation.pause();
u = !0;
}
} else switch (this.claw_state) {
case "up":
if (1 == u) {
this.animation.play(this.animationType);
u = !1;
}
l.call(this);
break;

case "down":
(function() {
this.ropeNode.height += 10;
this.clawNode.y -= 10;
}).call(this);
break;

default:
(function() {
e.angle += o;
e.angle > t && (o = -1);
e.angle < -t && (o = 1);
}).call(this);
} else if ("rotate" == this.claw_state) {
i.predict_money = 0;
i.pause = !0;
this.person_toLeft();
this.unschedule(this.callback);
} else {
if (!d) {
this.clawOpen();
this.claw_state = "up";
this.animation.stop();
this.getAnimation(n);
d = !0;
}
l.call(this);
}
};
this.schedule(this.callback, .01);
function l() {
var e = this.speed_num;
this.ropeNode.height -= e;
this.clawNode.y += e;
if (this.clawNode.y >= c) {
this.claw_state = "rotate";
this.clawNode.y = c;
this.ropeNode.height = a;
this.animation.stop();
this.getComponent(cc.Sprite).spriteFrame = this.texture;
this.clawOpen();
this.claw.Hide_claw();
this.state_act.get_score();
1 == s.sound_state && (1 == i.predict_type ? this.gold_musicNode.play() : 2 == i.predict_type && this.stone_musicNode.play());
i.predict_type = 0;
}
}
}
});
cc._RF.pop();
}, {
game_data: "game_data"
} ],
running: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "1b628c8mCJDcbHqFTV3ckwu", "running");
var c = e("game_data").person;
cc.Class({
extends: cc.Component,
properties: {
backgoundNode: {
default: null,
type: cc.Node
},
perosonNode: {
default: null,
type: cc.Node
},
objs: {
default: null,
type: cc.Node
},
state: {
default: null,
type: cc.Node
},
clawNode: {
default: null,
type: cc.Node
},
menuNode: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.init();
this.backgound_init();
this.get_gold_init();
this.setCollision();
this.listen_mouse();
this.menu_init();
this.set_state_init();
this.person_run_init();
this.claw_init();
},
init: function() {
this.backgound = this.backgoundNode.getComponent("backgound");
this.person_run = this.perosonNode.getComponent("person_run");
this.get_gold = this.objs.getComponent("get_gold");
this.state_data = this.state.getComponent("state_data");
this.claw = this.clawNode.getComponent("claw_action");
this.menu = this.menuNode.getComponent("layer_menu");
},
backgound_init: function() {
this.backgound.init();
},
get_gold_init: function() {
this.get_gold.init();
},
setCollision: function() {
cc.director.getCollisionManager().enabled = !0;
},
listen_mouse: function() {
this.node.on("touchend", function(e) {
c.pause || "rotate" != this.person_run.claw_state || (this.person_run.claw_state = "down");
}, this);
},
menu_init: function() {
this.menu.init();
},
set_state_init: function() {
this.state_data.init();
},
person_run_init: function() {
this.person_run.init();
},
claw_init: function() {
this.claw.init();
},
reload_state: function() {
this.state_data.set_layer_num();
this.state_data.set_goal_num();
this.state_data.move_goad_scoreNode();
this.state_data.move_countdownNode();
this.state_data.change_time();
},
reload_person_act: function() {
this.person_run.person_toRight();
},
ToNext_layer: function() {
this.backgound.set_backgound();
this.get_gold_init();
this.set_state_init();
this.reload_state();
this.menu_init();
this.person_run_init();
this.reload_person_act();
this.claw_init();
}
});
cc._RF.pop();
}, {
game_data: "game_data"
} ],
start_game: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "687f493MEhL9YBS/BpsmRV3", "start_game");
var c = e("game_data"), n = c.menu, i = c.cloud;
cc.Class({
extends: cc.Component,
properties: {
starttouchNode: {
default: null,
type: cc.AudioSource
},
faceNode: {
default: null,
type: cc.Node
},
legNode: {
default: null,
type: cc.Node
}
},
init: function() {},
playgame: function() {
if (!n.menu_open) {
1 == n.sound_state && this.starttouchNode.play();
this.scheduleOnce(function() {
i.cloud_stop = !0;
cc.director.loadScene("running");
}, .5);
}
}
});
cc._RF.pop();
}, {
game_data: "game_data"
} ],
start_menu: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "b504cmZuZtKTKtHQOWAbc/D", "start_menu");
var c = e("game_data"), n = c.menu, i = c.cloud;
cc.Class({
extends: cc.Component,
properties: {
button_switchNode: {
default: null,
type: cc.Node
},
bodyNode: {
default: null,
type: cc.Node
},
musicNode: {
default: null,
type: cc.AudioSource
},
music_labelNode: {
default: null,
type: cc.Node
},
music_switchNode: {
default: null,
type: cc.Node
},
openmusicNode: {
default: null,
type: cc.Node
},
closemusicNode: {
default: null,
type: cc.Node
},
sound_labelNode: {
default: null,
type: cc.Node
},
sound_switch: {
default: null,
type: cc.Node
},
opensoundNode: {
default: null,
type: cc.Node
},
closesoundNode: {
default: null,
type: cc.Node
},
out_gameNode: {
default: null,
type: cc.Node
},
touchNode: {
default: null,
type: cc.AudioSource
},
closeNode: {
default: null,
type: cc.AudioSource
},
codeNode: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.open_music();
},
init: function() {},
open_music: function() {
if (1 == n.music_state) {
this.musicNode.play();
this.openmusicNode.active = !0;
this.closemusicNode.active = !1;
} else {
this.openmusicNode.active = !1;
this.closemusicNode.active = !0;
}
if (1 == n.sound_state) {
this.opensoundNode.active = !0;
this.closesoundNode.active = !1;
} else {
this.opensoundNode.active = !1;
this.closesoundNode.active = !0;
}
},
change_music_state: function() {
1 == n.sound_state && this.touchNode.play();
if (1 == n.music_state) {
this.musicNode.pause();
n.music_state = !1;
this.closemusicNode.active = !0;
this.openmusicNode.active = !1;
} else {
this.musicNode.play();
n.music_state = !0;
this.openmusicNode.active = !0;
this.closemusicNode.active = !1;
}
},
change_sound_state: function() {
0 == n.sound_state && this.touchNode.play();
if (1 == n.sound_state) {
this.touchNode.active = !1;
this.closeNode.active = !1;
n.sound_state = !1;
this.opensoundNode.active = !1;
this.closesoundNode.active = !0;
} else {
this.touchNode.active = !0;
this.closeNode.active = !0;
n.sound_state = !0;
this.opensoundNode.active = !0;
this.closesoundNode.active = !1;
}
},
pop_menu: function() {
1 == n.sound_state && this.touchNode.play();
n.menu_open = !0;
this.button_switchNode.getComponent(cc.Button).interactable = !1;
var e = cc.moveBy(.5, cc.v2(-750, 0)), t = cc.moveBy(.25, cc.v2(30, 0));
this.bodyNode.setPosition(n.location.game_run);
this.bodyNode.runAction(e);
this.scheduleOnce(function() {
this.bodyNode.runAction(t);
}, .5);
},
close_menu: function() {
1 == n.sound_state && this.closeNode.play();
var e = cc.moveBy(.5, cc.v2(-30, 0)), t = cc.moveBy(.25, cc.v2(750, 0));
this.bodyNode.runAction(e);
this.scheduleOnce(function() {
this.bodyNode.runAction(t);
}, .5);
n.menu_open = !1;
this.scheduleOnce(function() {
this.button_switchNode.getComponent(cc.Button).interactable = !0;
this.bodyNode.setPosition(n.location.game_start);
if (1 == i.out_code) {
i.out_code = !1;
this.codeNode.active = !1;
this.music_labelNode.active = !0;
this.music_switchNode.active = !0;
this.sound_labelNode.active = !0;
this.sound_switch.active = !0;
this.out_gameNode.active = !0;
}
}, 1.5);
},
endGame: function() {
1 == n.sound_state && this.closeNode.play();
this.scheduleOnce(function() {
cc.director.end();
}, .5);
},
pop_code: function() {
if (this.button_switchNode.getComponent(cc.Button).interactable) {
this.music_labelNode.active = !1;
this.music_switchNode.active = !1;
this.sound_labelNode.active = !1;
this.sound_switch.active = !1;
this.out_gameNode.active = !1;
i.out_code = !0;
this.codeNode.active = !0;
this.pop_menu();
}
}
});
cc._RF.pop();
}, {
game_data: "game_data"
} ],
start: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "3607c5jADVEf7WOwF2dOa0N", "start");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.init();
},
init: function() {
cc.debug.setDisplayStats(!1);
}
});
cc._RF.pop();
}, {} ],
state_data: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f0c95GadXVLw4iG+BxHVLQx", "state_data");
var c = e("game_data"), n = c.layer, i = c.person, s = c.cloud;
cc.Class({
extends: cc.Component,
properties: {
goad_scoreNode: {
default: null,
type: cc.Node
},
countdownNode: {
default: null,
type: cc.Node
},
save_moneyNode: {
default: null,
type: cc.Node
},
goal_moneyNode: {
default: null,
type: cc.Node
},
layerNode: {
default: null,
type: cc.Node
},
timeNode: {
default: null,
type: cc.Node
},
runningNode: {
default: null,
type: cc.Node
},
tipsNode: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.set_layer_num();
this.set_goal_num();
this.move_goad_scoreNode();
this.move_countdownNode();
this.change_time();
},
init: function() {
this.running = this.runningNode.getComponent("running");
this.tips = this.tipsNode.getComponent("tips_act");
},
set_layer_num: function() {
this.layerNode.getComponent(cc.Label).string = i.layer;
this.timeNode.getComponent(cc.Label).string = n["layer_" + i.layer].limit_time;
},
set_goal_num: function() {
this.goal_moneyNode.getComponent(cc.Label).string = n["layer_" + i.layer].goal;
this.save_moneyNode.getComponent(cc.Label).string = i.save_money;
},
move_goad_scoreNode: function() {
var e = cc.moveBy(1, cc.v2(-200, 0));
this.goad_scoreNode.setPosition(n["layer_" + i.layer].goal_banner_loc);
this.goad_scoreNode.runAction(e);
},
move_countdownNode: function() {
var e = cc.moveBy(2, cc.v2(0, -120));
this.countdownNode.setPosition(n["layer_" + i.layer].time_banner_loc);
this.scheduleOnce(function() {
this.countdownNode.runAction(e);
}, 1);
},
change_time: function() {
var e = n["layer_" + i.layer].limit_time;
this.callback = function() {
if (!i.pause) {
e -= 1;
this.timeNode.getComponent(cc.Label).string = e;
if (e <= 0) {
this.time_out();
this.unschedule(this.callback);
}
}
};
this.schedule(this.callback, 1);
},
time_out: function() {
i.game_state = "end";
},
get_score: function() {
i.save_money += i.predict_money;
this.save_moneyNode.getComponent(cc.Label).string = i.save_money;
},
goNext: function() {
var e = "";
cc.sys.localStorage.getItem("max_score") < i.save_money && cc.sys.localStorage.setItem("max_score", i.save_money);
if (parseInt(this.save_moneyNode.getComponent(cc.Label).string) >= n["layer_" + i.layer].goal) {
e = "通关成功";
this.tips.move_tips(e);
this.scheduleOnce(function() {
if (3 == i.layer) {
s.cloud_stop = !1;
cc.director.loadScene("game_start");
}
++i.layer;
this.running.ToNext_layer();
}, 5);
} else {
e = "通关失败";
this.tips.move_tips(e);
this.scheduleOnce(function() {
s.cloud_stop = !1;
cc.director.loadScene("game_start");
}, 5);
}
}
});
cc._RF.pop();
}, {
game_data: "game_data"
} ],
tips_act: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f263dphMI1PKK15nd0prsnC", "tips_act");
var c = e("game_data"), n = c.layer, i = c.person;
cc.Class({
extends: cc.Component,
properties: {
wordNode: {
default: null,
type: cc.Node
}
},
init: function() {},
move_tips: function(e) {
if ("通关成功" == e) {
var t = cc.moveBy(1, cc.v2(0, -450)), o = cc.moveBy(.75, cc.v2(0, 30)), c = cc.moveBy(.75, cc.v2(0, -20)), s = cc.moveBy(.75, cc.v2(0, 700));
this.wordNode.getComponent(cc.Label).string = e;
this.node.setPosition(n["layer_" + i.layer].tips_loc);
this.node.runAction(t);
this.scheduleOnce(function() {
this.node.runAction(o);
}, 1);
this.scheduleOnce(function() {
this.node.runAction(c);
}, 1.75);
this.scheduleOnce(function() {
this.node.runAction(s);
}, 3.5);
} else {
t = cc.moveBy(.5, cc.v2(0, -450)), o = cc.rotateTo(.5, 2340), c = cc.moveBy(.5, cc.v2(0, 45)), 
s = cc.rotateTo(.5, 360);
var a = cc.moveBy(.5, cc.v2(0, -15));
this.wordNode.getComponent(cc.Label).string = e;
this.node.setPosition(n["layer_" + i.layer].tips_loc);
this.node.runAction(t);
this.node.runAction(o);
this.scheduleOnce(function() {
this.node.runAction(c);
this.node.runAction(s);
}, 2);
this.scheduleOnce(function() {
this.node.runAction(a);
}, 3);
}
}
});
cc._RF.pop();
}, {
game_data: "game_data"
} ]
}, {}, [ "backgound", "claw_action", "game_data", "get_gold", "layer_menu", "person_run", "running", "state_data", "tips_act", "cloud_act", "person_act", "start", "start_game", "start_menu" ]);