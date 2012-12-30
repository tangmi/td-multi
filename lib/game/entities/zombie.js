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
        direction: Direction.RIGHT,

        rocketEntity: {},

        collides : ig.Entity.COLLIDES.ACTIVE,
        type : ig.Entity.TYPE.B,
        checkAgainst : ig.Entity.TYPE.A,

        animSheet: new ig.AnimationSheet( 'media/zombie.png', 16, 32 ),

        targetPos: {x: 0, y: 0},

        canAttack: false,
        attackCounter: 50,

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim( 'idle', 0.4, [0] );

        },

        update: function() {
            this.parent();
            this.zIndex = this.pos.y;
            this.rocketEntity = ig.game.getEntitiesByType(EntityRocket)[0];

            this.targetPos = {
                x: this.rocketEntity.pos.x + this.rocketEntity.size.x/2 - this.size.x/2,
                y: this.rocketEntity.pos.y + this.rocketEntity.size.y
            };

            var speed = 100;
            if(this.pos.x < this.targetPos.x) {
                this.vel.x = speed;
            } else if(this.pos.x > this.targetPos.x) {
                this.vel.x = -speed;
            }

            if(this.pos.y < this.targetPos.y) {
                this.vel.y = speed;
            } else if(this.pos.y > this.targetPos.y) {
                this.vel.y = -speed;
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