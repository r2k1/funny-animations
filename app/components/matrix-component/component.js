import Ember from "ember";

var MatrixComponent = Ember.Component.extend({
  matrix: null,
  array: function () {
    var array = Array.prototype.map.call(this.get('matrix'), function(value) {
      return Math.round(value * 100) / 100;
    });
    var length = Math.sqrt(array.length);
    var anotherArray = [];
    while(array.length) { anotherArray.push(array.splice(0,length)); }
    return anotherArray;
  }.property('matrix')
});

export default MatrixComponent;
