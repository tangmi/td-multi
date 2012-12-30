
ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'game.entities.placer'
)
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

	size : {x:6, y:24},
	offset: {x: 13, y: 18},
	facing: 0,

	collides : ig.Entity.COLLIDES.ACTIVE,

	animSheet : new ig.AnimationSheet( 'media/spaceman.png', 32, 42),

	init : function(x, y, settings) {
		this.parent(x , y, settings);
		this.addAnim( 'idle', 0.69, [10, 10, 10, 10, 7, 8, 9]);
		this.addAnim( 'walk', 0.08, [0, 1, 2, 3, 4, 5, 6]);

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
				ig.game.spawnEntity( EntityWall, this.placementBox.pos.x + 2, this.placementBox.pos.y + 8);
			}
			else if (ig.input.state('tower1')) {
				ig.game.spawnEntity( EntityTower1, this.placementBox.pos.x, this.placementBox.pos.y);
			}
			/*else if (ig.input.state('tower2')) {
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
		if (other.name == 'rocket') {
			other.transferFuel(this.fuel);
			this.fuel = 0;
		}

		this.parent(other);
	},

	draw: function() {

		//set animation direction if pressing the corrosoponding key
		if(this.vel.x > 0 && ig.input.state('right')) {
			this.facing = 1;
		}
		if(this.vel.x < 0 && ig.input.state('left')) {
			this.facing = -1;
		}

		// set the walk animation if the player is moving and pressing a movement key
		if(ig.input.state('right') || ig.input.state('left') || ig.input.state('up') || ig.input.state('down')) {
			this.currentAnim = this.anims.walk;
		} else {
			this.currentAnim = this.anims.idle;
		}

		this.currentAnim.flip.x = this.facing == -1 ? true : false;

		this.parent();
	}

});

});