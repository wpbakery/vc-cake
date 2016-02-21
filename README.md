# vcCake
vcCake is a small JavaScript library to use modular approach for building all types of apps.

VcCake application is managed by the *VcCake* object, whose job is to manage *modules* and *services*. It's the combination of objects that allow you to build a scalable Js front-end.

What you can do with it. vcCake allows to communicate modules with each other or even group objects in one scope without tight coupling. 
It is good for tests, because you can substitute any part or the system with a mockups and emulate interaction with modules with another module. 
```
APP
 |__ Services
 |__ Module Scope
 	|__ Module clouser
 	|__ Module clouser
 	|__ ...
```

Application has two ways for interactions:
- request/reply or global scope events
- notify/on or module scope events

Every module recieves has an access to limited api with a list of posible methods.


## Service
Globally accessible object that can be used by all modules in all scopes. Example: key generators, i18n functions, default settings for new elements, template for element.
```javascript
vcCake.addService('service-name', {
	uniqID: function() {...},
	anotherMethod: function(){..},
	listOfData: [1,2,3],
	...
});
```
## Module
A part of the page(not always visible part of the page, but it has owen independent logic from all othe elements of the project). Some modules can be coupled via modules API.

### App API methods for Module clouser

- **request(eventName, data)** - global request to system that module required any reply from any module;
- **reply(eventName, fn)** - subscribe to global request from module, module scope can be the same;
- **addAction(actionName, fn)** - create public function to work with module;
- **notify(eventName, data)** - publish module event;
- **on(eventName, fn)** - subscribe to event inside module scope;
	- **do(actionName, ..atts)** - call module action;
- **once(eventName, fn)** - subscribe to event inside module scope but reacts on event only once; 
- **actions.{actionName}** - accessor to actions function inside module scope;
- **module(moduleName)** - returns another Module API with limited amount of methods;
	- **on(eventName, fn)** - subscribe to module event;
		- **do(actionName, ..atts)** - call module action;
	- **once(eventName, fn)** - subscribe to event but react on event only once;
	- **actions** - get list of accessible actions for a module;

```javascript
vcCake.add('module-scope', function(api){
	
	// Like publish global events
	var data = api.service('service-name').methodToGetData();
	api.request('event-name', data);
	
	// Like subscribe global events
	api.reply('event-name', function(dataIfPassed){
		// ... here comes the event
	});
	
	// Create action of module which can be used to interact with module from another module.
	api.addAction('module-action-name', function(...attrsMaybePassed){
		// ...hre comes the action
	});
	
	// Like publish, module inner events
	api.notify('module-event-name', true); // this event inside module
	

	// Like subscribe, module inner events
	api.module('module-scope').on('module-event-name', function(){
		...
	});
	// or you can just call do to call action
	api
	    .module('module-scope')
	    .on('module-event-name')
	    .do('module-action-name', ...attrsMaybePassed);
});
```
