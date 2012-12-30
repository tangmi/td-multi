ig.module(
    'game.entities.bomb'
    )
.requires(
    'impact.entity',
    'game.entities.explosion'
    )
.defines(function() {
    EntityBomb = EntitySpawnable.extend({

        name: "bomb",

        size: {x:32, y:32},

        timer : new ig.Timer(),

        animSheet : new ig.AnimationSheet( 'media/bomb.png', 32, 32),

        init : function(x, y, settings) {
            this.parent(x , y, settings);
            this.addAnim( 'idle', 1, [0, 1, 2, 3, 4]);
            
            //5 seconds
            this.timer.set(5);
        },

        update: function() {
            this.parent();
            if (this.timer.delta() >= 0) {
	            this.kill();
            }

        },

        kill: function() {
        	ig.game.spawnEntity(EntityExplosion, this.pos.x + 10, this.pos.y + 10);
        	ig.game.spawnEntity(EntityExplosion, this.pos.x + -10, this.pos.y + 10);
        	ig.game.spawnEntity(EntityExplosion, this.pos.x + 10, this.pos.y - 10);
        	ig.game.spawnEntity(EntityExplosion, this.pos.x - 10, this.pos.y - 10);
        	ig.game.spawnEntity(EntityExplosion, this.pos.x, this.pos.y);
        	var zombies = ig.game.getEntitiesByType( EntityZombie );
        	for (var i = 0; i < zombies.length; i++) {
        		var dist = zombies[i].distanceTo(this);
	        	if (dist < 200) {
		        	var xDiff = zombies[i].pos.x - this.pos.x;
		        	var yDiff = zombies[i].pos.y - this.pos.y;
		        	
		        	zombies[i].vel.x = xDiff;
		        	zombies[i].vel.y = yDiff; 	
	        	}
        	}
        	this.parent();
        }

    });


});