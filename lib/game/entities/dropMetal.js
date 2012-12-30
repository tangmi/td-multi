ig.module('game.entities.dropMetal')
.requires('game.entities.dropItem')
.defines(function() {

EntityDropMetal = EntityDropItem.extend( {
	
	name : 'dropMetal',
	
	init : function(x, y, settings) {
		this.addAnim('hover', .2, [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
		this.parent(x, y, settings);
	}

});

});