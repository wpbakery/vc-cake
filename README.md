# vcCake
vcCake is a small JavaScript library to use modular approach for building all types of apps.

A VcCake application is managed by the *VcCake* object, whose job is to manage *modules* and *services*. It's the combination of objects that allow you to build a scalable Js front-end.

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

Every module recieves app api with a list of posible method.


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
Part of page(not always visible part of the page, but it has owen independent logic from all othe elements of the project), some modules can be coupled via modules API but it works via actions that works on events of requested module.
API object passed to callback function via 

### App API methods for Module clouser

- **request(eventName, data)** - global request to another modules to make interaction with a data send with this f
- **reply(eventName, fn)**
- **addAction(actionName, fn)**
- **notify(eventName, data)**
- **on(eventName, fn)**
- **once(eventName, fn)**
- **actions.{actionName}**
- **module(moduleName)** - returns another Module API with limited amount of methods:
	- **on(eventName, fn)**
		- **do(actionName, ..atts)**
	- **once(eventName, fn)**



// Modules module-scope can be used simultanious.
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
	api.module('module-scope').on('module-event-name', function(m){
		...
	});
	// or you can just call do to call action
	api
	    .module('module-scope')
	    .on('module-event-name')
	    .do('module-action-name', ...attrsMaybePassed);
});
```
