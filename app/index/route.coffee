`import Ember from "ember";`

ApplicationRoute = Ember.Route.extend(
  redirect: ->
   @transitionTo 'gallery'
)

`export default ApplicationRoute`