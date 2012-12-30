ig.module(
    'game.entities.zombie'
    )
.requires(
    'impact.entity'
    )
.defines(function() {
    EntityZombie = ig.Entity.extend({

        size: {x:32, y:24},
        offset: {x: 0, y: 18},

        name: "zombie",
        direction: 0,

        health: 100,
        healthMax: 100,

        targetEntity: {},

        collides : ig.Entity.COLLIDES.PASSIVE,
        type : ig.Entity.TYPE.B,
        checkAgainst : ig.Entity.TYPE.A,

        animSheet: new ig.AnimationSheet( 'media/zombie.png', 32, 42 ),

        targetPos: {x: 0, y: 0},

        canAttack: false,
        attackCounter: 50,

        pathTimer: null,

        speed: 0,
        maxSpeed: 15,


        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim( 'idle', 0.5, [0] );
            this.addAnim( 'walk', 0.05, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29] );


            this.pathTimer = new ig.Timer(0.5);

            this.maxSpeed += -5/2 + 5 * Math.random();

        },

        update: function() {
            this.parent();
            this.zIndex = this.pos.y;
            this.targetEntity = this.findTarget();



            this.targetPos = {
                x: this.targetEntity.pos.x + this.targetEntity.size.x/2 - this.size.x/2,
                y: this.targetEntity.pos.y + this.targetEntity.size.y
            };


            this.speed = Math.max(0, Math.min(this.distanceTo(this.targetEntity), this.maxSpeed));




            this.followPath(this.speed, true);




            if(this.pathTimer.delta() > 0) {
                // Get the path to the player
                this.getPath(this.targetPos.x, this.targetPos.y, true, ['EntityTower1'], ['EntityTower1Projectile']);

                if(this.path) {
                    for(var i = 0; i < this.path.length -1; i++) {
                        var random = 100;
                        this.path[i].x += -random/2+random*Math.random();
                        this.path[i].y += -random/2+random*Math.random();
                    }
                }

                this.pathTimer.reset();
            }



            //drawing code:
            if(this.headingDirection) {

            }

            if(this.attackCounter > 0) {
                this.attackCounter--;
            } else {
                this.canAttack = true;
            }

        },


        findTarget: function() {
            // return ig.game.getEntitiesByType(EntityRocket)[0];
            var entity = ig.game.getEntitiesByType(EntityRocket)[0];

            for(var i = 0; i < ig.game.spawnables.length; i++) {
                var spawnable = ig.game.spawnables[i];
                if(this.distanceTo(spawnable) < 128 && entity.name != "wall") {
                    entity = ig.game.spawnables[i];
                }
            }

            return entity;
        },

        draw: function() {

            if(this.headingDirection == 1 ||
                this.headingDirection == 2 ||
                this.headingDirection == 3) {
                this.facing = -1;
            } else if(this.headingDirection == 6 ||
                this.headingDirection == 7 ||
                this.headingDirection == 8) {
                this.facing = 1;
            }



            if(this.speed < this.maxSpeed) {
                this.currentAnim = this.anims.idle;
            } else {
                this.currentAnim = this.anims.walk;
            }
            this.currentAnim = this.anims.walk;


            this.currentAnim.flip.x = this.facing == -1 ? true : false;

            this.parent();
        },

        collideWith: function( other, axis ) {

            if(other.name == this.targetEntity.name) {
                if(this.canAttack) {
                    other.receiveDamage(1);
                    this.canAttack = false;
                    this.attackCounter = Math.round(50 + Math.random()*25);
                }
            }

            this.parent(other, axis);
        },


    });
});