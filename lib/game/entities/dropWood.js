ig.module('game.entities.dropWood')
.requires('game.entities.dropItem')
.defines(function() {

EntityDropWood = EntityDropItem.extend( {
	
	animSheet : new ig.AnimationSheet( 'media/pickup.png', 10, 10),
	
	name : 'dropWood',
	
	init : function(x, y, settings) {
		this.addAnim('idle', 1, [0]);
		this.parent(x, y, settings);
	}

});

});