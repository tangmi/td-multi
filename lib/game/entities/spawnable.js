ig.module('game.entities.spawnable')
.requires('impact.entity')
.defines(function() {

EntitySpawnable = ig.Entity.extend({

	size : {x:32, y:32},
    health: 1,
    healthMax: 10,
    chargeSpeed: 0,
    type: ig.Entity.TYPE.B,
    collides : ig.Entity.COLLIDES.FIXED,

    canUse: false,
    name: "spawnable",
    isDead: false,

    update: function() {
        this.parent();
        this.zIndex = this.pos.y;

        if(this.canUse == false) {
            if(this.health < this.healthMax) {
                this.health += this.chargeSpeed/100 * this.healthMax;
            } else {
                this.canUse = true;
            }
        }
    },

	drawHealthbar: function() {
        if(this.health < this.healthMax) {
            if(this.health < 0) {
                this.health = 0;
                this.kill();
                isDead = true;
            }
            var context = ig.system.context;
            var bar = {
                width: 24,
                height: 4
            }
            var x = Math.round(this.pos.x + this.size.x/2 - bar.width/2);
            var y = Math.round(this.pos.y + this.size.y + 5);
            context.fillStyle = '#FFFFFF'; // white
            context.strokeStyle = '#FFFFFF'; // white
            context.strokeRect(x, y, bar.width, bar.height);
            context.fillRect(x, y, bar.width * (this.health/this.healthMax), bar.height);
        }
    }


});

});