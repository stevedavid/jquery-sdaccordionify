# jQuery.sdAccordionify
Another simple ligh-weight jQuery plugin the makes an accordion out of a list.

## Releases
* **v0.1** - 03/08/2015

## Requirements
`jQuery.sdAccordionify` requires the latest version of [`jQuery`](https://jquery.com/download/) and of [`FontAwesome`](https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css).

## Demo
See this [JSFiddle link](http://jsfiddle.net/D4V1D/zv7fk2qj/) to see the plugin.

## Features
* supports an unlimited number of panels
* animation duration customizable
* panel element centerable
* colors customization

## Usage
* **HTML**

First of all, you would need to make a `<ul>` list populated with `<li>` items containing a `data-title` attribute like so:
```html
<ul id="accordionify">
	<li class="" data-title="Title 1">
		<ul>
			<li>Hello!</li>
			<li>How you doing?</li>
			<li>Hi!</li>
		</ul>
	</li>
	<li class="" data-title="Title 2">
		<p>Hello there</p>
		<p>How are you today?</p>
	</li>
	<li class="" data-title="Title 3">
		<img src="http://lorempixel.com/400/200/" alt="Test"/>
	</li>
</ul>	
```
The list can be filled with whatever you like. Addind the `active` class to a `<li>` item will cause this block to be open at loading.

* **jQuery**

The syntax of `jQuery.sdAccordionify`'s initialization is the following:
```javascript
jQuery(function($) {

  $('#accordionify').sdAccordionify({
  	fixed: true, // boolean, set to true to let all panels open
  	animation: true, // boolean, set to true to slide the pannels
  	duration: 150, // if animation, integer to set the duration in ms
  	width: 450, // width of all the panels in px as an integer
  	centered: false, // boolean, set to true so content in panels are centered
  	colors: { // object, colors of the panels
  		backgroundTitle: '#eee',
  		borderTitle: '#ddd',
  		containerBorder: '#ccc'
  	}
  });

});
```

## Options
Name | Type | Default | Description
------------ | ------------- | ------------- | -------------
fixed | boolean | `true` | If false, when one panel extends, others close.
animation | boolean | `true` | If true, `.slideDown()` and `.slideUp()` will be used to open/close the panels
duration | integer | `500` | The duration in `ms` of the panels sliding animation 
width | integer | `450` | The width in `px` of all the panels
centered | boolean | `false` | If true, all content in panels will be centered
colors | object | `{'#eee', '#ddd', '#ccc'}` | An object containing the following properties : `backgroundTitle` to set the color of the panel background title; `borderTitle` to set to color of the panel border title and `containerBorder` for the each panel border itself

## Licence
Copyright (c) 2015 Steve David

Licensed under the MIT license.
