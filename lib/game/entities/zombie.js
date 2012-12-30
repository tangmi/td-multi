ig.module(
    'game.entities.zombie'
    )
.requires(
    'impact.entity'
    )
.defines(function() {
    EntityZombie = ig.Entity.extend({

        size : {x:16, y:8},
        offset: {x: 0, y: 24},

        name: "zombie",

        rocketEntity: {},

        collides : ig.Entity.COLLIDES.ACTIVE,
        type : ig.Entity.TYPE.B,
        checkAgainst : ig.Entity.TYPE.A,

        animSheet: new ig.AnimationSheet( 'media/zombie.png', 16, 32 ),

        targetPos: {x: 0, y: 0},


        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim( 'idle', 0.4, [0] );


        },

        update: function() {
            this.parent();
            this.zIndex = this.pos.y;
            this.rocketEntity = ig.game.getEntitiesByType(EntityRocket)[0];

            this.targetPos = {
                x: this.rocketEntity.pos.x + this.rocketEntity.size.x/2,
                y: this.rocketEntity.pos.y + this.rocketEntity.size.y
            };

            var speed = 25;
            if(this.pos.x < this.targetPos.x) {
                this.vel.x = speed;
            } else {
                this.vel.x = -speed;
            }

            if(this.pos.y < this.targetPos.y) {
                this.vel.y = speed;
            } else {
                this.vel.y = -speed;
            }


        },


    });
});