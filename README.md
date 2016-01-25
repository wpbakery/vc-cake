# VC Cake
Module administration lib for javascript based projects from WPBakery

## Main structure
Contains tree main parts: **Service, Module, Behavior**

Service can be accessed anywhere in the system.

Module can access only services and no other modules or behavior. Module can publish an event, which will be linked to the modules name.

Behavior can access to limited list of modules(no more then 2). Behavior can subscribe on event of modules.

## App callbacks
App can call any function before,after and on initialization of the app. You can control with callbasks when and what should I call.

ToDo: need to think about ability of app callbacks to control modules.
