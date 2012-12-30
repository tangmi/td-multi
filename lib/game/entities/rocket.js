ig.module(
    'game.entities.rocket'
    )
.requires(
    'impact.entity'
    )
.defines(function() {
    EntityRocket = ig.Entity.extend({

        size: {x: 96, y: 120},
        offset: {x: 16, y: 0},

        name: "rocket",

        collides : ig.Entity.COLLIDES.FIXED,
        type : ig.Entity.TYPE.B,

        fuel : 0,

        font: new ig.Font( 'media/04b03.font.png' ),

        health: 0,
        healthMax: 100,
        deathExplosions: 10,
        explosionTimer: 0,

        animSheet: new ig.AnimationSheet( 'media/rocket.png', 128, 128),

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim( 'idle', 0.4, [0] );
            this.addAnim( 'hurt1', 0.4, [1] );
            this.addAnim( 'hurt2', 0.4, [2] );
            this.addAnim( 'hurt3', 0.4, [3] );

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

            if(this.isDead && this.deathExplosions) {
                if(this.explosionTimer <= 0) {
                    ig.game.spawnEntity(EntityExplosion, this.pos.x - this.offset.x + (this.size.x + this.offset.x*2)*Math.random() -79/2, this.pos.y - this.offset.y + (this.size.y+this.offset.y)*Math.random() -79/2);
                    this.deathExplosions--;
                    this.explosionTimer = 15;

                    if(this.deathExplosions < 5) {
                        this.currentAnim = this.anims.hurt3;
                    }
                } else {
                    this.explosionTimer--;
                }
            }

        },

        kill: function() {
            if(!this.isDead) {
                this.isDead = true;
            }
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


    EntityExplosion = ig.Entity.extend({

        size: {x: 79, y: 79},
        offset: {x: 0, y: 0},


        animSheet: new ig.AnimationSheet( 'media/EXPLOSIONS.png', 79, 79 ),

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim( 'idle', 0.1, [0, 1, 2, 3] );

            this.zIndex = 99999999;
        },

        update: function() {
            this.parent();

            if(this.currentAnim.frame == this.currentAnim.sequence.length-1) {
                this.kill();
            }
        }
    });
});