ig.module(
    'game.entities.spawner'
    )
.requires(
    'impact.entity',
    'impact.font',
    'game.entities.zombie',
    'game.entities.zombieSpecial'

    )
.defines(function() {
    EntitySpawner = ig.Entity.extend({

        size: {x:32, y:24},
        offset: {x:0, y: 30},
        animSheet: new ig.AnimationSheet( 'media/spawner.png', 32, 64),
        timer: -1,
        zombieCount: 0,
        font: new ig.Font( 'media/04b03.font.png' ),

        type : ig.Entity.TYPE.B,

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim( 'idle', 0.4, [0, 1, 2, 3, 4, 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19] );
            this.addAnim( 'spawn', 0.05, [21,22,23,24,25,26,27,28] );
            this.timer = 50;
            this.zIndex = this.pos.y;
        },

        update: function() {
            this.parent();
            this.zombieCount = ig.game.getEntitiesByType(EntityZombie).length;

            if(this.timer < 0) {
                if(this.zombieCount < 50) {
                    this.currentAnim = this.anims.spawn;
                    this.currentAnim.rewind();

                    ig.game.spawnEntity(EntityZombie, this.pos.x, this.pos.y, {});
                    if(Math.random() < 0.1) {
                        if(ig.game.getEntitiesByType(EntityZombieSpecial).length < 2) {
                            ig.game.spawnEntity(EntityZombieSpecial, this.pos.x, this.pos.y, {});
                        }
                    }
                }
                // this.timer = Math.round(375 + Math.random()*50)
                this.timer = Math.random()*50 + this.zombieCount/50 * 40 + 60;
            } else {
                this.timer--;
            }

            if(this.currentAnim == this.anims.spawn) {
                if(this.currentAnim.frame == this.currentAnim.sequence.length-1) {
                    this.currentAnim.gotoFrame(0);
                    this.currentAnim = this.anims.idle;
                }
            }

        },

        draw: function() {
            this.parent();

            this.font.draw( 'count: ' + this.timer + ", " + this.zombieCount + " zombies", this.pos.x - ig.game.screen.x, this.pos.y - ig.game.screen.y, ig.Font.ALIGN.CENTER );

        }

    });
});