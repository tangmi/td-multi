ig.module(
    'game.entities.tower1'
    )
.requires(
    'game.entities.spawnable',
    'game.entities.explosion'
    )
.defines(function() {
    EntityTower1 = EntitySpawnable.extend({

        name: "tower",

        size: {x:32, y:23},
        offset: {x: 0, y: 20},

        chargeSpeed: 1,

        canAttack: true,
        targetZombie: null,
        top: null,

        animSheet : new ig.AnimationSheet( 'media/tower1.png', 32, 42),

        init : function(x, y, settings) {
            this.parent(x , y, settings);
            this.addAnim( 'idle', 0.1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
        },

        update: function() {
            this.parent();

            if(this.top == null) {
                this.top = ig.game.spawnEntity(EntityTower1Top, this.pos.x + this.offset.x, this.pos.y -this.offset.y, {bottom: this});
            }

            this.targetZombie = null;

            if(this.canUse) {
                for(var i = 0; i < ig.game.zombies.length; i++) {
                    var zombie = ig.game.zombies[i];
                    if(this.distanceTo(zombie) < 128) {
                        this.targetZombie = zombie;
                    }
                }

                if(this.canAttack && this.targetZombie) {

                    this.top.shoot(this.targetZombie);

                    this.canAttack = false;
                    this.attackTimer = 69;
                }

                if(this.attackTimer) {
                    this.attackTimer--;
                } else {
                    this.canAttack = true;
                }
            }

        },

        kill: function() {
            ig.game.spawnEntity(EntityExplosion, this.pos.x - this.offset.x + this.size.x/2, this.pos.y - this.offset.y + this.size.y/2);

            this.parent();
            this.top.kill();
        }

    });

    EntityTower1Top = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/tower1.png', 32, 42 ),

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim( 'left', 0.1, [20, 21, 22, 23, 24, 25 ,26, 27, 28, 29,20]);
            this.addAnim( 'right', 0.1, [30, 31,32,33,34,35,36,37,38,39,30]);
            this.addAnim( 'up', 0.1, [40]);
            this.addAnim( 'down', 0.1, [41,42,43,44,45,46,47,48,49,41]);

            this.currentAnim = this.anims.right;
        },

        shoot: function(target) {

            snd = new ig.Sound( 'sounds/laser.ogg' );
            snd.volume = 0.25;
            snd.play();

            var angle = this.angleTo(target);
            ig.game.spawnEntity(EntityTower1Projectile, this.pos.x + this.size.x/2, this.pos.y + this.size.y/2, {angle: angle});
            var dir = Math.floor(( angle + 2*Math.PI + (2*Math.PI/8) )/(2*Math.PI /4)) % 4;

            switch(dir) {
                case 0: this.currentAnim = this.anims.right; break;
                case 1: this.currentAnim = this.anims.down; break;
                case 2: this.currentAnim = this.anims.left; break;
                case 3: this.currentAnim = this.anims.up; break;
            }
        },
        update: function() {
            this.parent();
            this.zIndex = this.bottom.zIndex + 1;
        }
    });

    EntityTower1Projectile = ig.Entity.extend({


        size: {x: 13, y: 13},
        offset: {x: 0, y: 0},
        maxVel: {x: 200, y: 200},

        collides: ig.Entity.COLLIDES.NONE,
        checkAgainst : ig.Entity.TYPE.B,


        animSheet: new ig.AnimationSheet( 'media/laserbolt.png', 13, 13 ),

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim( 'idle', 0.01, [0, 1, 2, 3, 4, 5, 6, 7] );


            this.vel = {
                x: Math.cos(this.angle) * 200,
                y: Math.sin(this.angle) * 200
            };
        },

        handleMovementTrace : function(res) {

            this.pos.x += this.vel.x * ig.system.tick;
            this.pos.y += this.vel.y * ig.system.tick;
            //this.parent(res);

        },

        check: function( other ) {
            if(other.name == "zombie") {
                other.receiveDamage(49);

                snd = new ig.Sound( 'sounds/zombiehurt.ogg' );
                snd.volume = 0.25;
                snd.play();

                this.kill();
            }
        },


        update: function() {
            this.parent();
            this.zIndex = this.pos.y;




            this.currentAnim.gotoFrame(  Math.floor(( this.angle + 2*Math.PI + (2*Math.PI/16) )/(2*Math.PI /8)) % 8   );



        }
    });

});