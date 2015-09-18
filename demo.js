requirejs.config({
  paths: {
    "jquery": "bower_components/jquery/dist/jquery.min"
  }
});

define(["main"], function(Overlay) {
  new Overlay('test', {classes: ['bg-black-transparent']});
});
