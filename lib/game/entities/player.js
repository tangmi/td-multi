ig.module('game.entities.player')
.requires('impact.entity')
.defines(function() {

EntityPlayer = ig.Entity.extend({

	type : ig.Entity.TYPE.A,
	
	checkAgainst : ig.Entity.TYPE.B,
	
	size : {x:16, y:32},
	
	collides : ig.Entity.COLLIDES.ACTIVE,
	
	animSheet : new ig.AnimationSheet( 'media/player.png', 16, 32),
	
	init : function(x, y, settings) {
	
		this.parent(x , y, settings);
		
		this.addAnim( 'idle', 1, [0]);	
	},
	
	update : function() {
		
		this.vel.x = 0;
		this.vel.y = 0;
	
		if (ig.input.state('up')) {
			this.vel.y = -100;
		}
		if (ig.input.state('down')) {
			this.vel.y = 100;
		}
	
		if (ig.input.state('left')) {
			this.vel.x = -100;
		} 
		if (ig.input.state('right')) {
			this.vel.x = 100;
		} 
		
		this.parent();
	},
	
	check : function( other ) {
		this.parent(other);
	}
	
});

});