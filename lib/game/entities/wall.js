ig.module('game.entities.wall')
.requires('impact.entity')
.defines(function() {

EntityWall = ig.Entity.extend({
	
	name : 'wall',
	
	size : {x:32, y:32},
	
	collides : ig.Entity.COLLIDES.FIXED,
	
	animSheet : new ig.AnimationSheet( 'media/wall.png', 32, 32),
	
	init : function(x, y, settings) {
	
		this.parent(x , y, settings);
		
		this.addAnim( 'idle', 1, [0]);
		
	}
	
});

});