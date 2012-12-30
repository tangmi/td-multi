ig.module(
    'game.entities.bomb'
    )
.requires(
    'impact.entity',
    'game.entities.explosion'
    )
.defines(function() {
    EntityBomb = EntitySpawnable.extend({

	    	healthMax : 300,

        name: "bomb",

        size: {x:32, y:32},

        animSheet : new ig.AnimationSheet( 'media/bomb.png', 32, 32),

        init : function(x, y, settings) {
            this.parent(x , y, settings);
            this.addAnim( 'idle', 1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

        },

        update: function() {
            this.parent();
            this.health++;
            if (this.health == this.healthMax) {
	            this.explode();
            }
        },

        explode: function() {
	        ig.game.spawnEntity(EntityExplosion, this.pos.x + 10, this.pos.y + 10);

        	var zombies = ig.game.getEntitiesByType( EntityZombie );
        	for (var i = 0; i < zombies.length; i++) {
        		var dist = zombies[i].distanceTo(this);
	        	if (dist < 200) {
		        	zombies[i].receiveDamage(200 - dist)

	        	}
        	}
        	this.kill();
        }

    });


});