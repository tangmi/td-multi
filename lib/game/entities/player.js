
ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'game.entities.placer',
	'game.entities.wall'
)
.defines(function() {

EntityPlayer = ig.Entity.extend({

	wallCost: {wood: 2, metal:0},
	towerCost: {wood: 2, metal: 5},
	bombCost : {wood: 5, metal: 2},
	nukeCost : {wood: 20, metal: 20},

	name : 'player',
	placementBox : {},
	directionFacing : 0,
	placementMode : false,
	type : ig.Entity.TYPE.A,
	nukeTimer : new ig.Timer(),

	//Inventory
	wood : 19,
	fuel : 5,
	metal : 19,

	checkAgainst : ig.Entity.TYPE.B,
	font: new ig.Font( 'media/04b03.font.png' ),

	hide: false,
	size : {x:6, y:24},
	offset: {x: 13, y: 18},
	facing: 0,

	collides : ig.Entity.COLLIDES.ACTIVE,

	animSheet : new ig.AnimationSheet( 'media/spaceman.png', 32, 42),

	init : function(x, y, settings) {
		this.parent(x , y, settings);
		this.addAnim( 'idle', 0.69, [10, 10, 10, 10, 7, 8, 9]);
		this.addAnim( 'walk', 0.08, [0, 1, 2, 3, 4, 5, 6]);
		this.addAnim( 'gone', 1, [999]);
		this.addAnim( 'detonate', .5, [16, 17, 18, 19, 20, 21, 22, 23, 24, 17]);

		if(typeof(ig.game.spawnEntity) == "function") {
			this.placementBox = ig.game.spawnEntity( EntityPlacer, 0, 0);
		}
	},
	hide: function() {
		this.hide = true;
	},

	update : function() {
		this.parent();
		if (this.nukeTimer.delta() >= 0) {
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
		}
		/*if (ig.input.state('wall')) {
			this.font.draw("Metal: " + this.wallCost.metal + " Wood: " + this.wallCost.wood, 20, ig.system.height - 40, ig.Font.ALIGN.LEFT );
		}
		if (ig.input.state('tower1')) {
			this.font.draw("Metal: " + this.metal, 20, ig.system.height - 40, ig.Font.ALIGN.LEFT );
		}
		if (ig.input.state('bomb')) {
			this.font.draw("Metal: " + this.metal, 20, ig.system.height - 40, ig.Font.ALIGN.LEFT );
		}
		if (ig.input.state('nuke')) {
			this.font.draw("Metal: " + this.metal, 20, ig.system.height - 40, ig.Font.ALIGN.LEFT );
		}*/
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
			this.placementBox.pos.x = this.pos.x - this.placementBox.size.x - this.offset.x;
		}
		if (this.directionFacing == Direction.RIGHT) {
			this.placementBox.pos.y = this.pos.y - this.placementBox.size.y + this.size.y;
			this.placementBox.pos.x = this.pos.x + this.size.x + this.offset.x;
		}
		this.placementBox.setVisible(this.placementMode);

	},

	attemptPlacement : function() {
		//Little bit of a hack to get aroung broken canPlace resetting in placer
		if (this.placementBox.currentAnim != this.placementBox.anims.unplacable) {

			if (ig.input.pressed('wall') && this.wallCost.wood <= this.wood && this.wallCost.metal <= this.metal) {
				ig.game.spawnEntity( EntityWall, this.placementBox.pos.x + 2, this.placementBox.pos.y + 8);
				this.wood -= this.wallCost.wood;
				this.metal -= this.wallCost.metal;

				snd = new ig.Sound( 'sounds/place.ogg' );
				snd.volume = 0.25;
				snd.play();
			}
			else if (ig.input.state('tower1') && this.towerCost.wood <= this.wood && this.towerCost.metal <= this.metal) {
				ig.game.spawnEntity( EntityTower1, this.placementBox.pos.x, this.placementBox.pos.y);
				this.wood -= this.towerCost.wood;
				this.metal -= this.towerCost.metal;

				snd = new ig.Sound( 'sounds/place.ogg' );
				snd.volume = 0.25;
				snd.play();
			}
			else if (ig.input.state('bomb') && this.bombCost.wood <= this.wood && this.bombCost.metal <= this.metal) {
				ig.game.spawnEntity( EntityBomb, this.placementBox.pos.x, this.placementBox.pos.y);

				snd = new ig.Sound( 'sounds/place.ogg' );
				snd.volume = 0.25;
				snd.play();

				this.wood -= this.bombCost.wood;
				this.metal -= this.bombCost.metal;
			}
			else if (ig.input.state('nuke') && this.nukeCost.wood <= this.wood && this.nukeCost.metal <= this.metal) {
				this.nuke();

				this.wood -= this.nukeCost.wood;
				this.metal -= this.nukeCost.metal;

			}
		}
		this.wallUpdate();
	},

	check : function( other ) {
		if (other.name == 'dropWood') {
			other.kill();
			this.wood+=2;

			snd = new ig.Sound( 'sounds/pickup.ogg' );
			snd.volume = 0.25;
			snd.play();
		}
		if (other.name == 'dropFuel') {
			other.kill();
			this.fuel+=2;

			snd = new ig.Sound( 'sounds/pickup.ogg' );
			snd.volume = 0.25;
			snd.play();
		}
		if (other.name == 'dropMetal') {
			other.kill();
			this.metal+=2;

			snd = new ig.Sound( 'sounds/pickup.ogg' );
			snd.volume = 0.25;
			snd.play();
		}
		if (other.name == 'rocket') {
			other.transferFuel(this.fuel);
			ig.game.getEntitiesByType(EntityStatBar)[0].changeFuel(this.fuel);
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

		if(this.hide == true) {
			this.currentAnim = this.anims.gone;
		} else if(this.nukeTimer.delta() > 0) {
			// set the walk animation if the player is moving and pressing a movement key
			if(ig.input.state('right') || ig.input.state('left') || ig.input.state('up') || ig.input.state('down')) {
				this.currentAnim = this.anims.walk;
			} else {
				this.currentAnim = this.anims.idle;
			}
		}

		this.currentAnim.flip.x = this.facing == -1 ? true : false;

		this.font.draw("Metal: " + this.metal, 20, ig.system.height - 40, ig.Font.ALIGN.LEFT );
		this.font.draw("Wood: " + this.wood, 20, ig.system.height - 30, ig.Font.ALIGN.LEFT );
		this.font.draw("Fuel: " + this.fuel, 20, ig.system.height - 20, ig.Font.ALIGN.LEFT );
		this.parent();
	},

	kill: function() {
		this.placementBox.kill();
		this.parent();
	},

	nuke : function() {
		ig.game.shake(50);
		this.nukeTimer.set(2);
		this.currentAnim = this.anims.detonate;
		var zombies = ig.game.getEntitiesByType(EntityZombie);
		for ( var i =0; i < zombies.length; i++) {
			zombies[i].kill();
		}
	}

});

});