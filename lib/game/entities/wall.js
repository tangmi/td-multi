ig.module('game.entities.wall')
.requires('game.entities.spawnable')
.defines(function() {

EntityWall = EntitySpawnable.extend( {
	
	collides : ig.Entity.COLLIDES.FIXED,
	
	animSheet : new ig.AnimationSheet( 'media/wall.png', 32, 32),
	
	init : function(x, y, settings) {
		this.parent(x , y, settings);
		this.addAnim( 'idle', 1, [0]);	
	}
	
	

});

});