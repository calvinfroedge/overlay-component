#overlay-component

This is a simple jquery overlay which can act as a modal. You can use it with commonjs or regularly including script tags.

No CSS required...just add the JS file! If you want a black, transparent background with nice rounded corners and a drop shadow, as is commonly seen, this can be added easily (the default is a white screen which covers the existing screen):

Create modal instance with:
```
new Overlay('my text or dom element', {classes: ['bg-black-transparent']});
```

Add this CSS:
```
.overlay.bg-black-transparent .overlay-bg {
  background-color:rgba(0,0,0,0.5);
}

.overlay.bg-black-transparent .overlay-content {
  border-radius: 1em;
  -webkit-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
}
```

##options
- noShow: Don't show the overlay when the instance is created
- classes: Add additional classes
- close: A callback function on close

##api
- show: show the overlay
- close: close the overlay
- position: reposition the modal (center, sizing)
