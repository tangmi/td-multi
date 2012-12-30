ig.module('game.entities.dropItem')
.requires('impact.entity')
.defines(function() {

EntityDropItem = ig.Entity.extend({
	
	friction : { x : 12, y : 12},
	size : {x:12, y:12},
	type : ig.Entity.TYPE.B,
	animSheet : new ig.AnimationSheet( 'media/pickup.png', 12, 12),
	collides : ig.Entity.COLLIDES.NEVER
	


});

});