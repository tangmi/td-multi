ig.module('game.entities.placer')
.requires('impact.entity')
.defines(function() {

EntityPlacer = ig.Entity.extend( {


	collides : ig.Entity.COLLIDES.NEVER,

	canPlace : false,

	size : {x:32, y:32},
	
	checkAgainst : ig.Entity.TYPE.B,
	
	animSheet : new ig.AnimationSheet( 'media/dottedbox.png', 32, 32),

	init : function(x, y, settings) {
		this.parent(x , y, settings);
		this.addAnim( 'unplacable', 1, [0]);
		this.addAnim( 'placable', 1, [1]);
		this.addAnim( 'invisible', 1, [2]);
	},

	update : function() {
		this.setPlacableAnim();
		this.canPlace = true;
		this.parent();
	},

	setVisible : function(visible) {
		if (visible && this.currentAnim == this.anims.invisible) {
			this.setPlacableAnim();
		} else if (!visible && this.currentAnim != this.anims.invisible) {
			this.currentAnim = this.anims.invisible;
		}
	},

	setPlacableAnim : function() {
		if (this.canPlace) {
			this.currentAnim = this.anims.placable;
		} else {
			this.currentAnim = this.anims.unplacable;
		}
	},
	
	handleMovementTrace : function(res) {
		var res1 = ig.game.collisionMap.trace(this.pos.x + 2, this.pos.y + 1, .5, .5, this.size.x - 2, this.size.y - 2);
		var res2 = ig.game.collisionMap.trace(this.pos.x + 1, this.pos.y + 1, -.5, -.5, this.size.x - 2, this.size.y - 2);
		if (res2.collision.x || res2.collision.y || res1.collision.x || res1.collision.y) {
			this.canPlace = false;
		}
		this.parent(res);
	},

	check : function(other) {
		console.log("lol");
		this.canPlace = false;
		this.parent();
	}



});

});
