ig.module('game.entities.dropItem')
.requires('impact.entity')
.defines(function() {

EntityDropItem = ig.Entity.extend({

	friction : { x : 12, y : 12},
	size : {x:20, y:20},
	offset : {x:-4, y: -4},
	type : ig.Entity.TYPE.A,
	animSheet : new ig.AnimationSheet( 'media/pickup.png', 12, 12),
	collides : ig.Entity.COLLIDES.PASSIVE,


    update: function() {
        this.parent();
        this.zIndex = this.pos.y;
    }

});

});