ig.module(
    'game.entities.worldEntity'
    )
.requires(
    'impact.entity',
    'game.entities.explosion'
    )
.defines(function() {
    EntityWorldEntity = ig.Entity.extend({

        name: "entity",
        facing: 1,


        init: function(x, y, settings) {
            this.parent(x, y, settings);

        },

        update: function() {
            this.parent();
            this.zIndex = this.pos.y + this.size.y;
        },

        draw: function() {
            this.currentAnim.flip.x = this.facing == -1 ? true : false;
            this.parent();
        },

        checkCollisionAt: function(x, y, radius) {

            //radius is superficial, and block-ish

            var collisionMap = ig.game.collisionMap;
            var tilesize = collisionMap.tilesize;

            var boundaries = {
                left: x,
                right: x + this.size.x,
                top: y,
                bottom: y + this.size.y
            };

            var collisionCell = {
                topLeft: {
                    x: Math.floor(boundaries.left / collisionMap.tilesize) - radius,
                    y: Math.floor(boundaries.top / collisionMap.tilesize) - radius
                },
                bottomRight: {
                    x: Math.floor(boundaries.right / collisionMap.tilesize) + radius,
                    y: Math.floor(boundaries.bottom / collisionMap.tilesize) + radius
                }
            };


            for(var celly = collisionCell.topLeft.y; celly < collisionCell.bottomRight.y; celly++) {
                for(var cellx = collisionCell.topLeft.x; cellx < collisionCell.bottomRight.x; cellx++) {
                    
                    if( collisionMap.data[celly] && collisionMap.data[celly][cellx] ) {
                        // ig.game.spawnEntity(EntityExplosion, x, y);
                        return true;
                    }
                    
                }
            }
            return false;

        },

    });
});