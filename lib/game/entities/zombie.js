ig.module(
    'game.entities.zombie'
    )
.requires(
    'impact.entity'
    )
.defines(function() {
    EntityZombie = ig.Entity.extend({


        name: "zombie",

        init: function(x, y, settings) {
            this.parent(x, y, settings);

        },

        update: function() {

        },


    });
});