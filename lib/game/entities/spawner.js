ig.module(
    'game.entities.spawner'
    )
.requires(
    'impact.entity'
    )
.defines(function() {
    EntitySpawner = ig.Entity.extend({

        animSheet : new ig.AnimationSheet( 'media/spawner.png', 16, 32),

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim( 'idle', 0.4, [0] );

        }
    });
});