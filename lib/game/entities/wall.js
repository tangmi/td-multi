ig.module('game.entities.wall')
.requires('game.entities.spawnable')
.defines(function() {

EntityWall = EntitySpawnable.extend( {

	name: "wall",
	chargeSpeed: 5,
	healthMax: 25,

	size: {x:28, y:24},
	offset: {x:2, y:8},


	animSheet : new ig.AnimationSheet( 'media/wall.png', 32, 32),

	init : function(x, y, settings) {
		this.parent(x , y, settings);
		this.addAnim( 'idle', 1, [0]);
	}



});

});