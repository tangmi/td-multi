ig.module('game.entities.dropFuel')
.requires('game.entities.dropItem')
.defines(function() {

EntityDropFuel = EntityDropItem.extend( {
	
	animSheet : new ig.AnimationSheet( 'media/pickup.png', 10, 10),
	
	name : 'dropFuel',
	
	init : function(x, y, settings) {
		this.addAnim('idle', 1, [0]);
		this.parent(x, y, settings);
	}

});

});