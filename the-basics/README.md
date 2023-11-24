# Section 2: The Basics

**Decorators in Angular**: In simple terms, decorators in TypeScript and Angular can be thought of as a way to “decorate” or “annotate” a class, method, property, or parameter with additional metadata. This metadata can then influence how the class or its members behave. So, you could say it’s like passing parameters to a class to add extra features or behavior to it. This makes decorators a powerful tool for managing and organizing code in larger applications. For example, the `AppComponent` must know where to find its template. We do that by using the`templateUrl` parameter of the `@Component` directive. The `@Component` decorator also accepts the values for styleUrls, encapsulation, changeDetection, etc, which Angular uses to configure the component.

```TypeScript
@Component({
  templateUrl: './app.component.html',
})
export class AppComponent {
  // ...
}

```

## How an Angular project gets loaded and started

1. **src/index.html**: This is the main HTML file that is served when someone visits your site. The `<app-root>` tag within this file is a placeholder for your root Angular component. The text "Loading..." inside this tag is a fallback for older browsers that do not support Angular.

2. **src/main.ts**: This is the main entry point for your Angular application. The `platformBrowserDynamic().bootstrapModule(AppModule)` line of code initializes the app and starts it running in your browser.

3. **src/app/app.module.ts**: This is the root module of your Angular application, known as `AppModule`. The `@NgModule` decorator defines it as an Angular module and sets its metadata. The `declarations` array is where you define which components belong to this module. The `imports` array is where you import other modules that your app needs. The `providers` array is where you list the services your app uses. The `bootstrap` array is where you define the root component of your application. Typically in an Angular application, there is one root module which is usually named `AppModule`. This module bootstraps and launches the application. However, an Angular application can have more than one module.

4. **src/app/app.component.ts**: This is the root component of your Angular application, known as `AppComponent`. The `@Component` decorator defines it as an Angular component and sets its metadata. The `selector` property is the name of the HTML tag where this component will be displayed. The `templateUrl` property is the location of the component's HTML template. The `styleUrl` property is the location of the component's private CSS styles.

5. **src/app/app.component.html**: This is the HTML template for the `AppComponent`. Whatever you put here will be displayed wherever you use the `<app-root>` tag in your `index.html` file.

When you start your Angular application with a command like `ng serve`, the `main.ts` file is executed first. This file bootstraps (or starts) the `AppModule`. The `AppModule` then initializes and inserts the `AppComponent` into the `<app-root>` tag in the `index.html` file.

## Angular Components

Angular components are like individual LEGO blocks. Each block (component) has a specific look and can perform a specific task. You can combine these blocks in various ways to build a larger structure (your application).

From a React developer's perspective, Angular components are similar to React components. They both encapsulate part of the user interface and can maintain their own state and properties. However, there are some differences:

1. **Decorators**: In Angular, components are classes that are decorated with the `@Component` decorator. The decorator adds metadata to the class, such as the template to use, the CSS styles to apply, and more. This is different from React, where components are just functions or classes without decorators.

2. **Templates**: Angular uses HTML templates for the component's view. These templates look like regular HTML, with additional syntax for data binding, event binding, etc. In contrast, React uses JSX, which is a syntax extension for JavaScript, allowing you to write HTML-like code in your JavaScript.

3. **Services**: Angular components can inject services, which are classes that provide specific functionality not directly related to views. Services can be injected into components as dependencies, making your code modular, reusable, and efficient. While React doesn't have an exact equivalent, you might use various patterns or libraries to achieve similar results (like Redux for state management).

4. **Lifecycle hooks**: Angular provides lifecycle hooks that allow you to run code at specific times in a component's life, such as initialization, data changes, and destruction. React has similar concepts with lifecycle methods in class components and hooks in function components.

You can either create a new Angular component by manually creating your `[name].component.html` and `[name].component.ts` file or create it with the cli.

To use the cli, type:

```bash
ng generate component [component-name]

or

ng g c [component-name]
```