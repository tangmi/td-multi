ig.module(
    'game.entities.zombie'
    )
.requires(
    'impact.entity'
    )
.defines(function() {
    EntityZombie = ig.Entity.extend({
        init: function(x, y, settings) {
            this.parent(x, y, settings);

        },

        update: function() {

        }
    });
});