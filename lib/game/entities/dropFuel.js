ig.module('game.entities.dropFuel')
.requires('game.entities.dropItem')
.defines(function() {

EntityDropFuel = EntityDropItem.extend( {
	
	name : 'dropFuel',
	
	init : function(x, y, settings) {
		this.addAnim('hover', .2, [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]);
		this.parent(x, y, settings);
	}

});

});