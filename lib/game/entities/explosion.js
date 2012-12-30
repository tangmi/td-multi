ig.module(
    'game.entities.explosion'
    )
.requires(
    'impact.entity'
    )
.defines(function() {
    EntityExplosion = ig.Entity.extend({

        size: {x: 1, y: 1},
        offset: {x: 29, y: 29},


        animSheet: new ig.AnimationSheet( 'media/EXPLOSIONS.png', 79, 79 ),

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim( 'idle', 0.1, [0, 1, 2, 3] );

            this.zIndex = 99999999;
        },

        update: function() {
            this.parent();

            if(this.currentAnim.frame == this.currentAnim.sequence.length-1) {
                this.kill();
            }
        }
    });
});