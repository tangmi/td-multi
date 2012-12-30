ig.module('game.entities.statBar')
.requires('game.entities.spawnable')
.defines(function() {

EntityStatBar = ig.Entity.extend( {

	name: "statBar",
	
	collides : ig.Entity.COLLIDES.NEVER,

	size: {x:96, y:48},

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
			this.font.draw(this.fuel + " fluid moon pounds", this.pos.x + 50, this.pos.y, ig.Font.ALIGN.RIGHT );
		}
		else if (ig.input.state('tower1')) {
			this.currentAnim = this.anims.tower;
			this.font.draw(this.fuel + " fluid moon pounds", this.pos.x + 50, this.pos.y, ig.Font.ALIGN.RIGHT );
		}
		else if (ig.input.state('bomb')) {
			this.currentAnim = this.anims.bomb;	
			this.font.draw(this.fuel + " fluid moon pounds", this.pos.x + 50, this.pos.y, ig.Font.ALIGN.RIGHT );
		}
		else if (ig.input.state('nuke')) {
			this.currentAnim = this.anims.nuke;
			this.font.draw(this.fuel + " fluid moon pounds", this.pos.x + 50, this.pos.y, ig.Font.ALIGN.RIGHT );
		} else {
			this.currentAnim = this.anims.idle;
			this.font.draw(this.fuel + " fluid moon pounds", this.pos.x + 50, this.pos.y, ig.Font.ALIGN.RIGHT );
		}
	},
	
	draw: function() {
            this.parent();

            if(this.health <= 0) {
                this.health = 0;
            }
            this.font.draw(this.fuel + " fluid moon pounds", this.pos.x + 50, this.pos.y, ig.Font.ALIGN.RIGHT );
        },
	



});

});