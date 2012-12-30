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

        health: 0,
        healthMax: 100,

        animSheet: new ig.AnimationSheet( 'media/rocket.png', 128, 64),

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim( 'idle', 0.4, [0] );
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
        },

        hurt: function(value) {
            this.health -= value;
        },

        draw: function() {
            this.parent();

            if(this.health <= 0) {
                this.health = 0;
            }



        }
    });
});