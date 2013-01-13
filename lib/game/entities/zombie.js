ig.module(
    'game.entities.zombie'
    )
.requires(
    'impact.entity',
    'game.entities.explosion',
    'game.entities.worldEntity',
    'game.entities.dropMetal',
    'game.entities.dropFuel',
    'game.entities.dropItem',
    'game.entities.dropWood'
    )
.defines(function() {
    EntityZombie = EntityWorldEntity.extend({

        size: {x:32, y:24},
        offset: {x: 0, y: 18},

        name: "zombie",
        direction: 0,

        health: 100,
        healthMax: 100,

        targetEntity: null,

        collides : ig.Entity.COLLIDES.PASSIVE,
        type : ig.Entity.TYPE.B,
        checkAgainst : ig.Entity.TYPE.A,

        animSheet: new ig.AnimationSheet( 'media/zombie.png', 32, 42 ),

        targetPos: {x: 0, y: 0},

        canAttack: false,
        attackCounter: 50,

        pathTimer: null,

        speed: 0,
        maxSpeed: 25,


        init: function(x, y, settings) {
            this.parent(x, y, settings);



            this.addAnim( 'idle', 0.5, [0] );
            this.addAnim( 'walk', 0.05, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29] );


            this.pathTimer = new ig.Timer(0.5);

            this.maxSpeed += -5/2 + 5 * Math.random();

        },

        update: function() {
            this.parent();

            this.targetEntity = this.findTarget();
        
            if(this.path) {
                this.followPath(this.speed, true);
            }


            if(this.targetEntity ) {

                this.targetPos = {
                    x: this.targetEntity.pos.x + this.targetEntity.size.x/2 - this.size.x/2,
                    y: this.targetEntity.pos.y + this.targetEntity.size.y
                };

                this.speed = Math.max(0, Math.min(this.distanceTo(this.targetEntity), this.maxSpeed));


                if(this.pathTimer.delta() > 0) {
                    // Get the path to the player
                    this.calculatePath();

                    this.pathTimer.reset();
                }
            }

            //drawing code:
            if(this.headingDirection) {

            }

            if(this.attackCounter > 0) {
                this.attackCounter--;
            } else {
                this.canAttack = true;
            }

        },

        calculatePath: function() {

            this.getPath(this.targetPos.x, this.targetPos.y, true, [], ['EntityTower1Projectile']);

            //calculate a path that is random, and not in a wall
            //this code should probably go in the astar impl
            if(this.path && this.path[0]) {

                var random = 100;
                
                var realPath = {
                    x: this.path[0].x,
                    y: this.path[0].y
                };

                this.path[0].x = this.pos.x;
                this.path[0].y = this.pos.y;

                while(true) {

                    var potential = {
                        x: realPath.x -random/2+random*Math.random(),
                        y: realPath.y -random/2+random*Math.random()
                    };

                    if(!this.checkCollisionAt(potential.x, potential.y)) {

                        //TODO: check if the line between this.pos and potential collide with the map

                        this.path[0].x = potential.x;
                        this.path[0].y = potential.y;
                        break;
                    }

                }

            }

        },


        

        findTarget: function() {
            // return ig.game.getEntitiesByType(EntityRocket)[0];
            var entity = null;
            // entity = ig.game.spawnables[0];
            entity = ig.game.getEntitiesByType(EntityRocket)[0];

            var wallExistsNear = false;

            //set to walls or towers
            for(var i = 0; i < ig.game.spawnables.length; i++) {
                var spawnable = ig.game.spawnables[i];
                if(this.distanceTo(spawnable) < 128) {
                    entity = ig.game.spawnables[i];
                    if(entity.name == "wall") {
                        wallExistsNear = true;
                    }
                }

            }

            if(wallExistsNear) {
                //set to walls
                for(var i = 0; i < ig.game.spawnables.length; i++) {
                    var spawnable = ig.game.spawnables[i];
                    if(this.distanceTo(spawnable) < 128) {
                        if(spawnable.name == "wall") {
                            entity = ig.game.spawnables[i];
                        }
                    }
                }
            }


            return entity;
        },

        kill: function() {

            var dropNum = Math.floor(Math.random() * 2);
            for (var i = 0; i < dropNum; i++) {
                var dropType = Math.floor(Math.random() * 300);
                var velX = Math.floor(Math.random() * 40) - Math.floor(Math.random() * 40);
                var velY = Math.floor(Math.random() * 40) - Math.floor(Math.random() * 40);
                var item;
                if (dropType <= 100) {
                    item = ig.game.spawnEntity(EntityDropFuel, this.pos.x, this.pos.y);
                } else if (dropType < 220) {
                    item = ig.game.spawnEntity(EntityDropWood, this.pos.x, this.pos.y);
                } else {
                    item = ig.game.spawnEntity(EntityDropMetal, this.pos.x, this.pos.y);
                }
                item.vel.x = velX;
                item.vel.y = velY;
            }

            ig.game.spawnEntity(EntityZombieDeath, this.pos.x - this.offset.x, this.pos.y - this.offset.y);
            this.parent();
        },

        draw: function() {

            if(this.headingDirection == 1 ||
                this.headingDirection == 2 ||
                this.headingDirection == 3) {
                this.facing = -1;
            } else if(this.headingDirection == 6 ||
                this.headingDirection == 7 ||
                this.headingDirection == 8) {
                this.facing = 1;
            }



            if(this.speed < this.maxSpeed) {
                this.currentAnim = this.anims.idle;
            } else {
                this.currentAnim = this.anims.walk;
            }
            this.currentAnim = this.anims.walk;

            this.parent();
        },

        collideWith: function( other, axis ) {

            if(other.name == this.targetEntity.name) {
                if(this.canAttack) {

                    sndHit = new ig.Sound( 'sounds/hit.ogg' );
                    sndHit.volume = 0.25;
                    sndHit.play();
                    other.receiveDamage(1);
                    this.canAttack = false;
                    this.attackCounter = Math.round(50 + Math.random()*25);
                }
            }

            this.parent(other, axis);
        }


    });

    EntityZombieDeath = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/zombie.png', 32, 42 ),
        init: function(x, y, settings) {
            this.parent(x,y,settings);

            this.addAnim( 'idle', 0.05, [81,82,83,84,85,86,87,88,89, 90, 91,92,93,94,95,96,97] );


            snd = new ig.Sound( 'sounds/zombiedie.ogg' );
            snd.volume = 0.25;
            snd.play();

        },

        update: function() {
            this.parent();
            this.zIndex = this.pos.y;
            if(this.currentAnim.frame == this.currentAnim.sequence.length -1) {
                this.kill();
            }
        }
    });
});