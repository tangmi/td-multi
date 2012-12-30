ig.module(
    'game.entities.rocket'
    )
.requires(
    'impact.entity'
    )
.defines(function() {
    EntityRocket = ig.Entity.extend({

        size: {x: 96, y: 16},
        offset: {x: 16, y: 48},

        name: "rocket",

        collides : ig.Entity.COLLIDES.FIXED,
        type : ig.Entity.TYPE.B,

        fuel : 0,
        
        font: new ig.Font( 'media/04b03.font.png' ),

        health: 0,
        healthMax: 100,

        animSheet: new ig.AnimationSheet( 'media/rocket.png', 128, 64),

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim( 'idle', 0.4, [0] );
            this.addAnim( 'hurt1', 0.4, [0] );
            this.addAnim( 'hurt2', 0.4, [0] );
            this.addAnim( 'hurt3', 0.4, [0] );

            this.health = this.healthMax * 0.75; //set health to whatever
        },

        update: function() {
            this.parent();
            this.zIndex = this.pos.y;

            if(this.health > 0) {
                this.health += 0.005;
            }

            if(this.health >= this.healthMax) {
                this.health = this.healthMax;
                this.drawHealthbar = false;
            } else {
                this.drawHealthbar = true;
            }

            if(this.health < 50 && this.currentAnim == this.anims.idle) {
                this.currentAnim = this.anims.hurt1;
            }

            if(this.health < 15 && this.currentAnim == this.anims.hurt1) {
                this.currentAnim = this.anims.hurt2;
            }

        },

        kill: function() {
            this.currentAnim = this.anims.hurt3;
        },

        draw: function() {
            this.parent();

            if(this.health <= 0) {
                this.health = 0;
            }
            this.font.draw(this.fuel + " fluid moon pounds", this.pos.x + 50, this.pos.y, ig.Font.ALIGN.RIGHT );
        },
        
        transferFuel : function(amount) {
	        	this.fuel += amount;
        }
    });
});