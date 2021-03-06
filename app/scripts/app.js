define(
  ['marionette','vent','collections/TodoList','views/Header','views/TodoListCompositeView','views/Footer'],
  function(marionette, vent, TodoList, Header, TodoListCompositeView, Footer){
    "use strict";

    var app = new marionette.Application(),
        todoList = new TodoList();

    todoList.fetch();

    app.addRegions({
      header : '#header',
      main   : '#main',
      footer : '#footer'
    });

    app.addInitializer(function(){

      var viewOptions = {
        collection : todoList
      };

      app.header.show(new Header(viewOptions));
      app.main.show(new TodoListCompositeView(viewOptions));
      app.footer.show(new Footer(viewOptions));

      app.bindTo(viewOptions.collection, 'all', updateVisibility);
      updateVisibility();
    });

    function updateVisibility() {
      if (todoList.length === 0) {
        app.main.$el.hide();
        app.footer.$el.hide();
      } else {
        app.main.$el.show();
        app.footer.$el.show();
      }
    }

    vent.on('todoList:clear:completed',function(){
      function destroy(todo)     { todo.destroy(); }

      todoList.getCompleted().forEach(destroy);
    });

    return app;

  }
);
