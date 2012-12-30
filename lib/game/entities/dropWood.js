ig.module('game.entities.dropWood')
.requires('game.entities.dropItem')
.defines(function() {

EntityDropWood = EntityDropItem.extend( {
	
	name : 'dropWood',
	
	init : function(x, y, settings) {
		this.addAnim('hover', .2, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
		this.parent(x, y, settings);
	}

});

});