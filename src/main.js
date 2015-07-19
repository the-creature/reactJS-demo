var React = require('react')
var App = require('App')

React.initializeTouchEvents(true)

React.render(
	React.createElement(App),
	document.getElementById('mount')
)
