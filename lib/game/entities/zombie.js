ig.module(
    'game.entities.zombie'
    )
.requires(
    'impact.entity'
    )
.defines(function() {
    EntityZombie = ig.Entity.extend({


        name: "zombie",

        animSheet: new ig.AnimationSheet( 'media/zombie.png', 16, 32 ),


        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim( 'idle', 0.4, [0] );


        },

        update: function() {

        },


    });
});