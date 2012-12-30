ig.module('game.entities.dropItem')
.requires('impact.entity')
.defines(function() {

EntityDropItem = ig.Entity.extend({

	size : {x:10, y:10},
	type : ig.Entity.TYPE.B,
	
	collides : ig.Entity.COLLIDES.NEVER

	



});

});