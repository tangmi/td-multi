ig.module(
    'game.entities.zombieSpecial'
    )
.requires(
    'game.entities.zombie'
    // 'impact.entity'
    )
.defines(function() {
    EntityZombieSpecial = EntityZombie.extend({


        maxSpeed: 45.5,
        health: 300,
        healthMax: 300,


        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim( 'idle', 0.5, [40] );
            this.addAnim( 'walk', 0.03, [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69] );

        }




    });
});