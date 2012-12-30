ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.zombie',
	'game.entities.player',
	'game.entities.wall',
	'game.entities.spawnable',
	'game.entities.placer',
	'game.entities.rocket',
	'game.entities.spawner',




	'impact.debug.debug',
	'plugins.astar-for-entities-debug',
	'plugins.astar-for-entities',


	'game.levels.test'



)
.defines(function(){

MyGame = ig.Game.extend({

	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),



	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind(ig.KEY.UP_ARROW, 'up');
		ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
		ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
		ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');

		this.loadLevel( LevelTest );

		this.player = ig.game.getEntitiesByType('EntityPlayer')[0];
	},

	update: function() {
		// Update all entities and backgroundMaps
		this.parent();

		this.sortEntities();

		// Add your own, additional update code here
	},

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();

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
		    context.strokeRect(x, y, bar.width, bar.height);
		    context.fillRect(x, y, bar.width * (rocket.health/rocket.healthMax), bar.height);
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