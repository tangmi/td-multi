ig.module(
  'game.entities.spawner'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntitySpawner = ig.Entity.extend({
    init: function(x, y, settings) {
      this.parent(x, y, settings);

    }
  });
});