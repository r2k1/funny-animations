`import Ember from "ember";`

AnimatedSvg = Ember.Component.extend(
  tagName: 'svg',
  svg:     null,
  width:   1000,
  height:   600,

  xScale: ->
    d3.scale.linear().range([0, @get 'width'])

  yScale: ->
    d3.scale.linear().range([0, @get 'height'])

  didInsertElement: ->
    xScale = @xScale()
    yScale = @yScale()

    points = (@_data().map (coords) ->
      xScale(coords[0]) + ',' + yScale(coords[1])
    ).join(' ')

    svg = d3.select(@element)
      .attr('width', @get 'width')
      .attr('height', @get 'height')
    .append('g')
      .attr('class', 'polygon')
    .append('polygon')
      .attr('points', points )


  _data: ->
    return [[0.5, 0], [0, 1], [1, 1]]
)

`export default AnimatedSvg`