ig.module('game.entities.placer')
.requires('game.entities.spawnable')
.defines(function() {
	
EntityPlacer = EntitySpawnable.extend( {
	
	collides : ig.Entity.COLLIDES.NEVER,
	
	canPlace : false,
	
	animSheet : new ig.AnimationSheet( 'media/dottedbox.png', 32, 32),
	
	init : function(x, y, settings) {
		this.parent(x , y, settings);	
		this.addAnim( 'unplacable', 1, [0]);
		this.addAnim( 'placable', 1, [1]);
		this.addAnim( 'invisible', 1, [2]);
	},
	
	update : function() {
		this.setPlacableAnim();
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
	
	check : function(other) {
		this.canPlace = true;
		if (other.name != 'player') {
			this.canPlace = false;
			console.log("Asdf");
		}
		this.parent(other);
	}
	
	

});

});
