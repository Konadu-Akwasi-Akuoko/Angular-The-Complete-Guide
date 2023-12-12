# Section 1: Getting Started

## Table of Content

1. [What is Angular](#what-is-angular)
2. [Angular vs Angular 2 vs Latest Angular](#angular-vs-angular-2-vs-latest-angular)

## What is Angular?

Angular is a javascript framework that allows you to create **reactive** single page applications. Reactive in this sense means Angular applications can continue to run even when waiting for a data fetching or any other asynchronous thing to be done, rather than blocking the whole application from running, thus the web app is designed to react to changes in the data flow and events rather than blocking and waiting for these events.

## Angular vs Angular 2 vs Latest Angular

The first version of Angular was Angular 1 or AngularJS, and the next version of Angular came out in 2016 which was Angular 2. Angular 2 was a completely rewritten version of Angular compared to Angular 1 or AngularJS. Now the latest version of Angular is Angular 17 (as of writing) which was built on top of Angular 2, 3, 4, ..., and so on, ever since it was released in 2016. But you can just call it Angular.

To create a new angular project use:

```bash
ng new my-first-app
```

To run an angular app use:

```bash
ng serve
```

An angular component have 3 main files, and they are:

* [name].module.ts
* [name].component.ts
* [name].component.html

And in most cases you can also find these two files attached to them:

* [name].component.css
* [name].component.spec.ts

1. **app.component.ts**: This is the main class file for your application’s root component. It contains the logic for the component, including properties and methods that your component can use. The `@Component` decorator is used to define metadata for the component, such as its selector (which is used to identify the component in templates) and the location of its template and style files.

2. **app.component.html**: This is the HTML template for your root component. It defines the structure and layout of the view that is associated with your root component. The template can include bindings to properties and methods of the component class defined in `app.component.ts`.

3. **app.module.ts**: This is the main module file for your application. Angular applications are modular, and they use modules to organize code into cohesive blocks of functionality3. The AppModule is the root module, and it tells Angular how to assemble the application. It identifies the application’s root component, which is typically AppComponent, and can also import other modules that the application needs, such as FormsModule.

### The `ngModel`

The ng-model directive binds the value of HTML controls (input, select, textarea) to application data. So for the below code the `ngModel` binds the `name` component from the app.component.ts file to the input field, thus making it a controlled input(just like in React):

```HTML
<input
  type="text"
  placeholder="Enter your name"
  [(ngModel)]="name"
/>
```

In Angular, `ngModel` is used for two-way data binding, binding the value of an input field to a variable created in Angular. This means that the input field’s value is always driven by the Angular component’s state.

This is similar to how controlled components work in React. In a controlled component, the component’s state is the single source of truth for the input element’s value. Any changes to the input element’s value are reflected in the component’s state, and any changes to the component’s state are reflected in the input element’s value.
