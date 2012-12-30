ig.module('game.entities.dropMetal')
.requires('game.entities.dropItem')
.defines(function() {

EntityDropMetal = EntityDropItem.extend( {
	
	animSheet : new ig.AnimationSheet( 'media/pickup.png', 10, 10),
	
	name : 'dropMetal',
	
	init : function(x, y, settings) {
		this.addAnim('idle', 1, [0]);
		this.parent(x, y, settings);
	}

});

});