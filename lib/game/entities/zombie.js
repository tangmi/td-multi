ig.module(
    'game.entities.zombie'
    )
.requires(
    'impact.entity'
    )
.defines(function() {
    EntityZombie = ig.Entity.extend({

        size: {x:16, y:8},
        offset: {x: 0, y: 24},

        name: "zombie",
        direction: 0,

        targetEntity: {},

        collides : ig.Entity.COLLIDES.ACTIVE,
        type : ig.Entity.TYPE.B,
        checkAgainst : ig.Entity.TYPE.A,

        animSheet: new ig.AnimationSheet( 'media/zombie.png', 16, 32 ),

        targetPos: {x: 0, y: 0},

        canAttack: false,
        attackCounter: 50,

        pathTimer: null,


        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim( 'idle', 0.4, [0] );


            this.pathTimer = new ig.Timer(0.1);

        },

        update: function() {
            this.parent();
            this.zIndex = this.pos.y;
            this.targetEntity = ig.game.getEntitiesByType(EntityRocket)[0];



            this.targetPos = {
                x: this.targetEntity.pos.x + this.targetEntity.size.x/2 - this.size.x/2,
                y: this.targetEntity.pos.y + this.targetEntity.size.y
            };

            var speed = 100;


            this.followPath(speed, true);
            this.currentAnim.gotoFrame(this.headingDirection);


            if(this.pathTimer.delta() > 0) {
                // Get the path to the player
                this.getPath(this.targetPos.x, this.targetPos.y, true, [], []);

                this.pathTimer.reset();
            }



            if(this.attackCounter > 0) {
                this.attackCounter--;
            } else {
                this.canAttack = true;
            }

        },

        collideWith: function( other, axis ) {

            if(other.name == "rocket") {
                if(this.canAttack) {
                    other.hurt(1);
                    this.canAttack = false;
                    this.attackCounter = Math.round(50 + Math.random()*25);
                }
            }

            this.parent(other, axis);
        },


    });
});