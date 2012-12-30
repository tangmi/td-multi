ig.module('game.entities.placer')
.requires('game.entities.spawnable')
.defines(function() {
	
EntityPlacer = EntitySpawnable.extend( {
	
	collides : ig.Entity.COLLIDES.NEVER,
	
	animSheet : new ig.AnimationSheet( 'media/wall.png', 32, 32),
	
	init : function(x, y, settings) {
		this.parent(x , y, settings);
		this.addAnim( 'idle', 1, [0]);	
	}
	
	

});

});
