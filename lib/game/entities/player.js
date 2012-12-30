	ig.module('game.entities.player')
.requires('impact.entity',
					'game.entities.placer')
.defines(function() {

EntityPlayer = ig.Entity.extend({

	placementBox : {},

	type : ig.Entity.TYPE.A,

	checkAgainst : ig.Entity.TYPE.B,

	size : {x:16, y:8},
	offset: {x: 0, y: 24},

	collides : ig.Entity.COLLIDES.ACTIVE,

	animSheet : new ig.AnimationSheet( 'media/player.png', 16, 32),

	init : function(x, y, settings) {
		this.parent(x , y, settings);
		this.addAnim( 'idle', 1, [0]);

		if(typeof(ig.game.spawnEntity) == "function") {
			this.placementBox = ig.game.spawnEntity( EntityPlacer, 0, 0);
		}
	},

	update : function() {
		this.parent();
		this.zIndex = this.pos.y;

		this.vel.x = 0;
		this.vel.y = 0;

		if (ig.input.state('up')) {
			this.vel.y = -100;
			this.placementBox.pos.y = this.pos.y - this.placementBox.size.y;
			this.placementBox.pos.x = this.pos.x + this.size.x / 2 - this.placementBox.size.x / 2;
		}
		if (ig.input.state('down')) {
			this.vel.y = 100;
			this.placementBox.pos.y = this.pos.y + this.size.y;
			this.placementBox.pos.x = this.pos.x + this.size.x / 2 - this.placementBox.size.x / 2;
		}

		if (ig.input.state('left')) {
			this.vel.x = -100;
			this.placementBox.pos.y = this.pos.y - this.placementBox.size.y + this.size.y;
			this.placementBox.pos.x = this.pos.x - this.placementBox.size.x;
		}
		if (ig.input.state('right')) {
			this.vel.x = 100;
			this.placementBox.pos.y = this.pos.y - this.placementBox.size.y + this.size.y;
			this.placementBox.pos.x = this.pos.x + this.size.x;
		}

	},

	wallHold : function() {

	},

	buildWall : function() {

	},

	check : function( other ) {
		this.parent(other);
	}

});

});