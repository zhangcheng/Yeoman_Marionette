require.config({
  paths : {
    underscore : 'vendor/underscore',
    backbone   : 'vendor/backbone',
    marionette : 'vendor/backbone.marionette',
    jquery     : 'vendor/jquery.min',
    tpl        : 'vendor/tpl'
  },
  shim : {
    'vendor/backbone-localStorage' : ['backbone'],
    underscore : {
      exports : '_'
    },
    backbone : {
      exports : 'Backbone',
      deps : ['jquery','underscore']
    },
    marionette : {
      exports : 'Backbone.Marionette',
      deps : ['backbone']
    }
  },
  deps : ['jquery','underscore']
});

require(['app','backbone','routers/index','controllers/index'],function(app,Backbone,Router,Controller){
  "use strict";

  app.start();
  new Router({
    controller : Controller
  });
  Backbone.history.start();
});
