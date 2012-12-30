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
		this.parent(res);
	},

	check : function(other) {
		this.canPlace = false;
		this.parent();
	}



});

});
