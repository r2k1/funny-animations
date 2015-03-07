import Ember from "ember";

var MatrixComponent = Ember.Component.extend({
  matrix: null,
  array: function () {
    var array = Array.prototype.slice.call(this.get('matrix'));
    var length = Math.sqrt(array.length);
    var anotherArray = [];
    while(array.length) { anotherArray.push(array.splice(0,length)); }
    return anotherArray;
  }.property('matrix')
});

export default MatrixComponent;
