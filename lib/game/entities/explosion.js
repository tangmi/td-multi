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

            this.zIndex = this.pos.y + this.size.y + this.size.y/2;

            snd = new ig.Sound( 'sounds/explosion.ogg' );
            snd.volume = 0.25;
            snd.play();
        },

        update: function() {
            this.parent();

            if(this.currentAnim.frame == this.currentAnim.sequence.length-1) {
                this.kill();
            }
        }
    });
});