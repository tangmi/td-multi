ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.zombie',
	'game.entities.zombieSpecial',


	'game.entities.player',
	'game.entities.wall',
	'game.entities.spawnable',
	'game.entities.placer',
	'game.entities.rocket',
	'game.entities.tower1',
	'game.entities.spawner',
	'game.entities.dropMetal',
	'game.entities.dropFuel',
	'game.entities.dropItem',
	'game.entities.dropWood',
	'game.entities.explosion',
	'game.entities.bomb',



	'impact.debug.debug',
	'plugins.astar-for-entities-debug',
	'plugins.astar-for-entities',


	'game.levels.test',
	'game.levels.level1'




)
.defines(function(){

MyGame = ig.Game.extend({

	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),

	spawnables: [],
	zombies: [],

	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind(ig.KEY.UP_ARROW, 'up');
		ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
		ig.input.bind(ig.KEY.SPACE, 'place');
		ig.input.bind(ig.KEY.A, 'wall');
		ig.input.bind(ig.KEY.S, 'tower1');
		ig.input.bind(ig.KEY.D, 'bomb');
		ig.input.bind(ig.KEY.F, 'tower3');


		this.loadLevel( LevelTest );
		this.loadLevel( LevelLevel1 );

		this.player = ig.game.getEntitiesByType('EntityPlayer')[0];
	},

	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		this.spawnables = this.getEntitiesByType(EntitySpawnable);
		this.spawnables.push(ig.game.getEntitiesByType(EntityRocket)[0]);
		this.zombies = this.getEntitiesByType(EntityZombie);

		this.sortEntities();


		if(this.shakeTimer) {
			var num = this.shakeTimer / 3;
			this.screen.x = this.savedScreen.x - num/2 + num*Math.random();
			this.screen.y = this.savedScreen.y - num/2 + num*Math.random();
			this.shakeTimer--;
		} else {

			this.scrollCamera();
		}

		// Add your own, additional update code here
	},

	endGame : function(isWon) {
		//Do stuff once the game is over
		alert("end");
	},

	scrollCamera: function() {
		player = this.getEntitiesByType( EntityPlayer )[0];
		mapSize = {width: ig.game.collisionMap.width, height: ig.game.collisionMap.height};
		tileSize = ig.game.collisionMap.tilesize;

		//find where the screen wants to be
		screenIdeal = {x: player.pos.x - (ig.system.width / 2) + player.animSheet.width/4, y: player.pos.y - (ig.system.height / 2)};

		//adjust the ideal position so it never shows outside the level
		if(screenIdeal.x < 0) {
			screenIdeal.x = 0;
		} else if(screenIdeal.x > mapSize.width * tileSize - ig.system.width) {
			screenIdeal.x = mapSize.width * tileSize - ig.system.width;
		}
		if(screenIdeal.y < 0) {
			screenIdeal.y = 0;
		} else if(screenIdeal.y > mapSize.height * tileSize - ig.system.height) {
			screenIdeal.y = mapSize.height * tileSize - ig.system.height;
		}

		//smooth the camera panning
		cameraSpeedFactor = 10; //for smooth panning
		this.screen.x += (screenIdeal.x - this.screen.x) / cameraSpeedFactor;
		this.screen.y += (screenIdeal.y - this.screen.y) / cameraSpeedFactor;
	},


	savedScreen: {},
	shakeTimer: 0,
	shake: function(num) {
		this.savedScreen.x = this.screen.x;
		this.savedScreen.y = this.screen.y;
		this.shakeTimer = num;
	},

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();

		for(var i = 0; i < this.spawnables.length; i++) {
			var spawnable = this.spawnables[i];
			if(spawnable.name != "rocket") {
				spawnable.drawHealthbar();
			}
		}

		var rocket = this.getEntitiesByType(EntityRocket)[0];
		if(rocket.drawHealthbar) {
		    var context = ig.system.context;
		    var bar = {
		        width: 36,
		        height: 4
		    }
		    var x = Math.round(rocket.pos.x + rocket.size.x/2 - bar.width/2);
		    var y = Math.round(rocket.pos.y + rocket.size.y + 5);
		    context.fillStyle = '#FFFFFF'; // white
		    context.strokeStyle = '#FFFFFF'; // white
		    context.strokeRect(x - this.screen.x, y - this.screen.y, bar.width, bar.height);
		    context.fillRect(x - this.screen.x, y - this.screen.y, bar.width * (rocket.health/rocket.healthMax), bar.height);
		}
	}

});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 640, 480, 1 );

});


Direction = {
	LEFT: 0,
	RIGHT: 1,
	UP: 2,
	DOWN: 3
}