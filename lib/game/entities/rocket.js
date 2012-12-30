ig.module(
    'game.entities.rocket'
    )
.requires(
    'impact.entity'
    )
.defines(function() {
    EntityRocket = ig.Entity.extend({

        size: {x: 32, y: 16},
        offset: {x: 16, y: 80},

        health: 0,
        healthMax: 100,

        animSheet: new ig.AnimationSheet( 'media/rocket.png', 64, 96),

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim( 'idle', 0.4, [0] );
            this.health = this.healthMax * 0.75;
        },

        update: function() {
            this.parent();
            this.zIndex = this.pos.y;

            if(this.health <= 0) {
                this.health = 0;
            } else {
                this.health += 0.005;
            }
        },

        hurt: function(value) {
            this.health -= value;
        },

        draw: function() {
            this.parent();

            if(this.drawHealthbar) {
                var context = ig.system.context;
                var bar = {
                    width: 36,
                    height: 4
                }
                var x = Math.round(this.pos.x + this.size.x/2 - bar.width/2);
                var y = Math.round(this.pos.y + this.size.y + 5);
                context.fillStyle = '#FFFFFF'; // white
                context.strokeStyle = '#FFFFFF'; // white
                context.strokeRect(x, y, bar.width, bar.height);
                context.fillRect(x, y, bar.width * (this.health/this.healthMax), bar.height);
            }

        }
    });
});