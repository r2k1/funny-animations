// Convert image to bitmap array
export default Ember.Object.extend({
  width: 0,
  height: 0,
  data: [],

  createImage: function() {
    var image = new Image();
    image.src = 'world-map200.png';
    image.onload = this.loadImage.bind(this, image);
  }.on('init'),

  loadImage: function(image) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    this.set('width', image.width);
    this.set('height', image.height);
    context.drawImage(image, 0, 0);
    var pixelData = context.getImageData(0, 0, image.width, image.height).data;
    var data = this.dataFromCanvas(pixelData, this.get('width'));
    this.set('data', data);
  },

  dataFromCanvas: function(rawData, width) {
    var data = [[]];
    var x = 0, y = 0;
    for (var i = 0; i < rawData.length;  i += 4) {
      if (x >= width) {
        y++;
        x = 0;
        data[y] = [];
      }
      var red = rawData[i];
      if (red < 120)
        data[y][x] = true;
      x++;
    }
    return data;
  }
});