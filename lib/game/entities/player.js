ig.module('game.entities.player')
.requires('impact.entity', 'game.entities.placer')
.defines(function() {

EntityPlayer = ig.Entity.extend({

	name : 'player',
	placementBox : {},
	directionFacing : 0,
	placementMode : false,
	type : ig.Entity.TYPE.A,

	//Inventory
	wood : 0,
	fuel : 0,
	metal : 0,
	
	checkAgainst : ig.Entity.TYPE.B,

	size : {x:16, y:8},
	offset: {x: 0, y: 24},
	facing: 0,

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
			this.directionFacing = Direction.UP;
		}
		if (ig.input.state('down')) {
			this.vel.y = 100;
			this.directionFacing = Direction.DOWN;
		}

		if (ig.input.state('left')) {
			this.vel.x = -100;
			this.directionFacing = Direction.LEFT;
		}
		if (ig.input.state('right')) {
			this.vel.x = 100;
			this.directionFacing = Direction.RIGHT;
		}
		if (ig.input.state('place')) {
			this.placementMode = true;
			this.attemptPlacement();
		} else {
			this.placementMode = false;
		}
		this.wallUpdate();
		
		
	},

	wallUpdate : function() {
		if (this.directionFacing == Direction.DOWN) {
			this.placementBox.pos.y = this.pos.y + this.size.y;
			this.placementBox.pos.x = this.pos.x + this.size.x / 2 - this.placementBox.size.x / 2;
		}
		if (this.directionFacing == Direction.UP) {
			 this.placementBox.pos.y = this.pos.y - this.placementBox.size.y;
			this.placementBox.pos.x = this.pos.x + this.size.x / 2 - this.placementBox.size.x / 2;
		}
		if (this.directionFacing == Direction.LEFT) {
			this.placementBox.pos.y = this.pos.y - this.placementBox.size.y + this.size.y;
			this.placementBox.pos.x = this.pos.x - this.placementBox.size.x;
		}
		if (this.directionFacing == Direction.RIGHT) {
			this.placementBox.pos.y = this.pos.y - this.placementBox.size.y + this.size.y;
			this.placementBox.pos.x = this.pos.x + this.size.x;
		}
		this.placementBox.setVisible(this.placementMode);

	},

	attemptPlacement : function() {
		//Little bit of a hack to get aroung broken canPlace resetting in placer
		if (this.placementBox.currentAnim != this.placementBox.anims.unplacable) {
			
			if (ig.input.pressed('wall')) {
				ig.game.spawnEntity( EntityWall, this.placementBox.pos.x, this.placementBox.pos.y);
			}
			/*else if (ig.input.state('tower1')) {
				ig.game.spawnEntity( EntityTower1, this.placementBox.pos.x, this.placementBox.pos.y);
			}
			else if (ig.input.state('tower2')) {
				ig.game.spawnEntity( EntityTower2, this.placementBox.pos.x, this.placementBox.pos.y);
			}
			else if (ig.input.state('tower3')) {
				ig.game.spawnEntity( EntityTower3, this.placementBox.pos.x, this.placementBox.pos.y);
			}*/
		}
		this.wallUpdate();
	},
	
	check : function( other ) {
		if (other.name == 'dropWood') {
			other.kill();
			this.wood++;
		}
		if (other.name == 'dropFuel') {
			other.kill();
			this.fuel++;
		}
		if (other.name == 'dropMetal') {
			other.kill();
			this.metal++;
		}
		this.parent(other);
	},

	draw: function() {

		if(this.vel.x > 0) {
			this.facing = 1;
		}
		if(this.vel.x < 0) {
			this.facing = -1;
		}

		this.currentAnim.flip.x = this.facing == -1 ? true : false;

		this.parent();
	}

});

});