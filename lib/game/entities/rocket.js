ig.module(
    'game.entities.rocket'
    )
.requires(
    'impact.entity',
    'game.entities.explosion'
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
                    ig.game.spawnEntity(EntityExplosion, this.pos.x - this.offset.x + (this.size.x + this.offset.x*2)*Math.random(), this.pos.y - this.offset.y + (this.size.y+this.offset.y)*Math.random());
                    this.deathExplosions--;
                    this.explosionTimer = 15;
                    ig.game.shake(10);

                    if(this.deathExplosions < 5) {
                        this.currentAnim = this.anims.hurt3;
                    }

                    if(this.deathExplosions == 0) {
                        ig.game.spawnEntity(EntityRocketDefeat, 0, 0);

                    }
                } else {
                    this.explosionTimer--;
                }
            }

            if(this.liftOff) {
                this.offset.y++;
                ig.game.shake(10);
                if(this.offset.y -70 > this.flames.pos.y) {
                    this.flames.pos.y--;
                }

                if(this.offset.y > 256) {
                    this.smoke1.kill();
                    this.smoke2.kill();
                    this.liftOff = false;
                    ig.game.spawnEntity(EntityRocketWin, 0, 0);


                    for(var i = 0; i < ig.game.zombies.length; i++) {
                        ig.game.zombies[i].kill();
                    }
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
        },

        blastOff: function() {
            ig.game.getEntitiesByType(EntityPlayer)[0].hide();
            this.flames = ig.game.spawnEntity(EntityRocketFlames, this.pos.x - this.offset.x - 64, this.pos.y - this.offset.y);

            this.smoke1 = ig.game.spawnEntity(EntityRocketSmoke, this.pos.x - this.offset.x - 64 + 16, this.pos.y - this.offset.y, {facing: 1});

            this.smoke2 = ig.game.spawnEntity(EntityRocketSmoke, this.pos.x - this.offset.x - 64 - 16, this.pos.y - this.offset.y, {facint: -1});



            this.flames.zIndex = this.zIndex  - 70;
            this.liftOff = true;
        }
    });

    EntityRocketFlames = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/rocketeffects.png', 256, 128),

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim( 'idle', 0.4, [0, 1] );


        },
    });

    EntityRocketSmoke = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/rocketeffects.png', 256, 128),

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim( 'idle', 0.1, [2, 3] );

            this.vel.x = this.facing * 15;

        },
    });

    EntityRocketWin = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/victory.png', 640, 480),
        size: {x:640, y:480},
        init: function(x, y, settings) {
            this.parent(ig.game.screen.x, ig.game.screen.y, settings);
            this.addAnim( 'idle', 1, [0] );
        },
    });

    EntityRocketDefeat = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/defeat.png', 640, 480),
        size: {x:640, y:480},
        init: function(x, y, settings) {
            this.parent(ig.game.screen.x, ig.game.screen.y, settings);
            this.addAnim( 'idle', 1, [0] );
        },
    });
});