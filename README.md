# VC Cake
Module administration lib for javascript based projects from WPBakery

## Main structure
Contains two main parts: **Service, Module Scope**

## Service
Globally accessible object that can be used by all modules in all scopes. Example: key generators, i18n functions, default settings for new elements, template for element. But serviss cann't be added by the 

## Module
Part of page(not always visible part of the page, but it has owen independent logic from all othe elements of the project), some modules can be coupled via modules API but it works via actions that works on events of requested module.
API object passed to callback function via 


// Service
VcCake.addService('service-name', function(){
	return {};
});

// Modules module-scope can be used simultanious.

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
		m.service('service-name')
		m.do('module-action-name', ...attrsMaybePassed);
	});
	api.module('module-scope').once('module-event-name', function(m){
		m.service('service-name')
		m.do('module-action-name', ...attrsMaybePassed);
	});
	// or you can just call do to call action
	api('module-scope').do('module-action-name', ...attrsMaybePassed);
});