ig.module(
    'game.entities.tower1'
    )
.requires(
    'impact.entity'
    )
.defines(function() {
    EntityTower1 = EntitySpawnable.extend({

        collides : ig.Entity.COLLIDES.FIXED,
        name: "tower",
        chargeSpeed: 1,

        canAttack: true,
        targetZombie: null,

        animSheet : new ig.AnimationSheet( 'media/tower1.png', 32, 32),

        init : function(x, y, settings) {
            this.parent(x , y, settings);
            this.addAnim( 'idle', 1, [0]);
        },

        update: function() {
            this.parent();

            if(this.canUse) {
                if(!this.targetZombie) {
                    for(var i = 0; i < ig.game.zombies.length; i++) {
                        var zombie = ig.game.zombies[i];
                        if(this.distanceTo(zombie) < 128) {
                            this.targetZombie = zombie;
                        }
                    }
                }
                if(this.canAttack && this.targetZombie) {
                    var angle = this.angleTo(this.targetZombie);
                    ig.game.spawnEntity(EntityTower1Projectile, this.pos.x + this.size.x/2, this.pos.y + this.size.y/2, {angle: angle});
                    this.canAttack = false;
                    this.attackTimer = 69;
                }

                if(this.attackTimer) {
                    this.attackTimer--;
                } else {
                    this.canAttack = true;
                }
            }

        }

    });

    EntityTower1Projectile = ig.Entity.extend({


        size: {x: 13, y: 13},
        offset: {x: 4, y: 4},
        maxVel: {x: 200, y: 200},

        collides: ig.Entity.COLLIDES.NONE,
        checkAgainst : ig.Entity.TYPE.B,


        animSheet: new ig.AnimationSheet( 'media/laserbolt.png', 13, 13 ),

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim( 'idle', 0.01, [0, 1, 2, 3, 4, 5, 6, 7] );

            this.currentAnim.gotoFrame(Math.floor(this.angle + (2*Math.pi/8))/8);

            this.vel = {
                x: Math.cos(this.angle) * 200,
                y: Math.sin(this.angle) * 200
            };

        },

        handleMovementTrace : function(res) {

            if (res.collision.y || res.collision.x) {
                this.kill();
            }
            this.parent(res);

        },

        check: function( other ) {
            if(other.name == "zombie") {
                other.receiveDamage(51);
                this.kill();
            }
        },


        update: function() {
            this.parent();



        }
    });

});