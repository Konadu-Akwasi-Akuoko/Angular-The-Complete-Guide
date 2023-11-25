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

## CSS and Styling in Angular

In Angular, each component has its own CSS file, which means the styles defined in one component won't affect the styles of another component. This is due to a feature called **CSS encapsulation**.

When you attach CSS directly to a component in Angular, the CSS is scoped exclusively to that component. This scoping isolates it from the rest of your application³. This means that the styles you define in a component's CSS file apply only to that component and won't affect other components.

For example, if you have two components, `ComponentA` and `ComponentB`, and `ComponentB` is nested within `ComponentA`, the styles defined in `ComponentA`'s CSS file won't affect `ComponentB`. Each component maintains its own styles.

Angular achieves this by dynamically creating HTML attributes that are only applicable to elements in that component². For instance, if you have two components with the class `.heading`, Angular would transform them to `.heading[_ngcontent-1]` and `.heading[_ngcontent-2]`, ensuring that the styles don't overlap.

This feature allows you to style components individually, making your styles modular and easier to manage.

Angular also supports **global styles**. Global styles are styles that are applicable across your entire application.

By default, Angular includes a `styles.css` file in the `src` folder. This file is considered a global stylesheet. You can put any global styles that you want in this `styles.css` file. These styles are global to every template in your application.

You can also add custom CSS files and external stylesheets to your Angular application. If you have created the Angular App using Angular CLI, then you can add the custom CSS files in `angular.json` under the `styles` array.

For example, if you want to add a global style for all paragraphs to be blue, you can open the `styles.css` and add the following CSS rule:

```css
p {
  color: blue;
}
```

This will apply the style to all `<p>` elements across your application¹.

However, it's important to note that component-specific styles will override these global style¹. So if you have a style defined for a `<p>` element in a component's CSS file, that style will take precedence over the global style.

### 2 Ways of Adding Styles in Angular

In Angular, you can add styles to your components in two ways:

- **Inline Styles**: You can add inline styles directly in the component's decorator using the `styles` property. The `styles` property takes an array of strings, where each string is a CSS rule. Here's an example:

```typescript
@Component({
  selector: 'app-my-component',
  template: `
    <p>This is my component.</p>
  `,
  styles: [`
    p {
      color: blue;
    }
  `]
})
export class MyComponent { }
```

In this example, the `<p>` elements in `MyComponent` will be styled with the color blue.

- **External Stylesheet**: You can also link to an external CSS file using the `styleUrls` property in the component's decorator. The `styleUrls` property takes an array of strings, where each string is a path to a CSS file. Here's an example:

```typescript
@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponent { }
```

In this example, the styles defined in `my-component.component.css` will be applied to `MyComponent`.

Remember, the styles you define in a component's CSS file or inline styles apply only to that component and won't affect other components due to Angular's CSS encapsulation.

## Selectors in Angular

In Angular, a **selector** is like a name or an identifier that you give to your component. It's a way to tell Angular where to insert the component in the HTML.

Think of it like a nickname you give to your friend. Just like how you call your friend by their nickname to get their attention, Angular uses the selector to find and display the component in the HTML.

There are three types of selectors in Angular:

1. **Element selectors**: These are based on the component's tag name. For example, if you have a component with the selector `app-my-component`, you can use it in the HTML like this: `<app-my-component></app-my-component>`.

2. **Attribute selectors**: These are based on the component's attribute. For example, if you have a component with the selector `[app-my-component]`, you can use it in the HTML like this: `<div app-my-component></div>`.

3. **Class selectors**: These are based on the component's class. For example, if you have a component with the selector `.app-my-component`, you can use it in the HTML like this: `<div class="app-my-component"></div>`.

In all these cases, Angular will replace the tag, attribute, or class with the content of the component.

### Element Selectors

An **element selector** in Angular is a way to select a component based on its tag name in the HTML. It's the most common type of selector used in Angular.

When you use an element selector, Angular locates each element in the template that matches the selector and applies the logic of the component to that element.

For example, if you have a component with the selector `app-my-component`, Angular will apply this component to every `<app-my-component>` element in the template.

Here's an example of a component using an element selector:

```typescript
@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponent { }
```

In this example, the component `MyComponent` will be applied to any `<app-my-component>` element in the template.

Element selectors are mainly used for Angular components. They are particularly useful when you want to create reusable components that can be dropped into your templates just like regular HTML elements.

### Attribute Selectors

In Angular, an **attribute selector** is a way to select a component or directive based on its attribute in the HTML. It's one of the ways you can define a selector for your Angular components.

When you use an attribute selector, Angular locates each element in the template that has an attribute matching the selector and applies the logic of the directive or component to that element³.

For example, if you have a directive with the selector `[appHighlight]`, Angular will apply this directive to every element in the template that has an `appHighlight` attribute³.

Here's an example of a component using an attribute selector:

```typescript
@Component({
  selector: '[app-my-component]',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponent { }
```

In this example, the component `MyComponent` will be applied to any element in the template that has an `app-my-component` attribute.

```HTML
<div app-my-component> </div>
```

Attribute selectors are mainly meant to be used for Angular directives, but you can use them as component selectors as well. They can be particularly useful in certain scenarios, such as when you want to apply a component to a specific HTML element without disrupting the DOM structure.

### Class Selectors

A **class selector** in Angular is a way to select a component or directive based on its class in the HTML¹²⁴. It's another way you can define a selector for your Angular components⁴.

When you use a class selector, Angular locates each element in the template that has a class matching the selector and applies the logic of the directive or component to that element⁴.

For example, if you have a directive with the selector `.appHighlight`, Angular will apply this directive to every element in the template that has a `class="appHighlight"`.

Here's an example of a component using a class selector:

```typescript
@Component({
  selector: '.app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponent { }
```

In this example, the component `MyComponent` will be applied to any element in the template that has a `class="app-my-component"`².

Class selectors are mainly meant to be used for Angular directives, but you can use them as component selectors as well. They can be particularly useful in certain scenarios, such as when you want to apply a component to a specific HTML element without disrupting the DOM structure.