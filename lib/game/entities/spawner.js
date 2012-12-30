ig.module(
    'game.entities.spawner'
    )
.requires(
    'impact.entity',
    'impact.font',
    'game.entities.zombie'

    )
.defines(function() {
    EntitySpawner = ig.Entity.extend({

        animSheet: new ig.AnimationSheet( 'media/spawner.png', 16, 32),
        timer: -1,
        zombieCount: 0,
        font: new ig.Font( 'media/04b03.font.png' ),

        type : ig.Entity.TYPE.B,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim( 'idle', 0.4, [0] );
            this.timer = 300;
        },

        update: function() {
            this.parent();
            this.zombieCount = ig.game.getEntitiesByType(EntityZombie).length;

            if(this.timer < 0) {
                if(this.zombieCount < 10) {
                    ig.game.spawnEntity(EntityZombie, this.pos.x, this.pos.y, {});
                }
                this.timer = Math.round(375 + Math.random()*50)
            } else {
                this.timer--;
            }


        },

        draw: function() {
            this.parent();

            this.font.draw( 'count: ' + this.timer + ", " + this.zombieCount + " zombies", this.pos.x, this.pos.y, ig.Font.ALIGN.CENTER );

        }

    });
});