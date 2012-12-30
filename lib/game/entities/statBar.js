ig.module('game.entities.statBar')
.requires('game.entities.spawnable')
.defines(function() {

EntityStatBar = ig.Entity.extend( {

	name: "statBar",
	
	collides : ig.Entity.COLLIDES.NEVER,

	size: {x:96, y:48},
	
	fuel : 0,
	
	fuelMax : 100,

	font: new ig.Font( 'media/04b03.font.png' ),

	animSheet : new ig.AnimationSheet( 'media/menu.png', 96, 48),

	init : function(x, y, settings) {
		this.parent(x , y, settings);
		this.addAnim( 'idle', .5, [0, 1, 2, 3, 4, 5, 6]);
		this.addAnim( 'tower', 1, [8]);
		this.addAnim( 'bomb', 1, [9]);
		this.addAnim( 'nuke', 1, [10]);
		this.addAnim( 'wall', 1, [7]);
	},
	
	update : function() {
		this.pos.x = ig.game.screen.x + 40;
		this.pos.y = ig.game.screen.y + 40;
		if (ig.input.state('wall')) {
			this.currentAnim = this.anims.wall;
		}
		else if (ig.input.state('tower1')) {
			this.currentAnim = this.anims.tower;
		}
		else if (ig.input.state('bomb')) {
			this.currentAnim = this.anims.bomb;	
		}
		else if (ig.input.state('nuke')) {
			this.currentAnim = this.anims.nuke;
		} else {
			this.currentAnim = this.anims.idle;
		}
	},
	
	changeFuel : function (amt) {
		this.fuel += amt;
		if (this.fuel > this.fuelMax) {
			this.fuel = this.fuelMax;
		}
	},
	
	drawHealthBar: function() {
          var context = ig.system.context;
          var bar = {
              width: 96,
              height: 10
          }
          var x = Math.round(this.pos.x + this.size.x/2 - bar.width/2);
          var y = Math.round(this.pos.y + this.size.y + 5);
          context.fillStyle = '#FFFFFF'; // white
          context.strokeStyle = '#FFFFFF'; // white
          context.strokeRect(x - ig.game.screen.x, y - ig.game.screen.y, bar.width, bar.height);
          context.fillRect(x - ig.game.screen.x, y - ig.game.screen.y, bar.width * (this.fuel/this.fuelMax), bar.height);
  },
  
  draw : function() {
	  this.parent();
	  this.drawHealthBar();
  }
  
  



});

});