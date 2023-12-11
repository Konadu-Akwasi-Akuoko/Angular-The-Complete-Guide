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

## Data Binding

**Data binding** in Angular is a technique that keeps your data in sync between your TypeScript code (component) and your view (DOM) or HTML template. It allows you to define a communication between your component and the DOM.

**NB: In all data binding simple javascript expressions like ternary operators, arithmetic operations, string concatenation, logical operations, equality checks, relational operations, nullish coalescing operators, and other will all work. But remember it is scoped to simple expressions, complex logic must go into the components.**

There are four forms of data binding in Angular:

1. **String Interpolation**: Uses the template expression in double curly braces `{{}}` to display data from the component to the view.

2. **Property Binding**: Helps to bind values to DOM properties of HTML elements.

3. **Event Binding**: Allows your app to respond to user input in the target environment.

4. **Two-Way Data Binding**: Combines property and event binding in a single notation using the `ngModel` directive¹. Here, the data property value flows from the component to the input box as well as from the input box to the component.

In contrast, React uses a concept called **"controlled components"** for data binding. In React, the state of the component controls the input elements, and changes to the input element update the state. This is often referred to as **"one-way data binding"** because the data flows in a single direction, from the component's state (source of truth) to the view.

To achieve **two-way data binding** in React, you can use an `onChange` event handler to update the state when the user changes the input value. This makes it seem like two-way data binding, but under the hood, it's still one-way data binding happening twice (from the component to the view and from the view to the component).

In summary, while both Angular and React allow for data binding, they approach it in slightly different ways. Angular provides built-in directives for various types of data binding, whereas React achieves this using its state and props with controlled components.

### String Interpolation

**String interpolation** is a one-way data binding technique in Angular that is used to output the data from a TypeScript code to an HTML template (view). It uses the template expression in double curly braces `{{ }}` to display the data from the component to the view. The only condition for the curly braces is that whatever you call inside them must resolve to a string, so it can be a function, or a property of the class, or you can even hardcode a string in there.

For example, if you have a component with a property `title`:

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Interpolation Example';
}
```

You can use string interpolation in your HTML template to display the value of `title`:

```html
<h1>{{ title }}</h1>
```

In this example, the `{{ title }}` in the HTML is replaced by the value of the `title` property from the component, and "Angular Interpolation Example" is displayed on the screen.

If the value of `title` changes in the component, Angular automatically updates the view to reflect the new value. This is the essence of one-way data binding - the data flows in one direction, from the component to the view.

<details>
<summary>

**Sidetracking: `ngOnInit`**
</summary>
<br>

`ngOnInit` is a lifecycle hook in Angular that is called after the constructor is called and after the component’s inputs have been initialized. It is used to perform any additional initialization that is required for the component. `ngOnInit` is commonly used to call services or to set up subscriptions².

In terms of React, `ngOnInit` is somewhat similar to using `useEffect` with an empty dependency array. When you pass an empty array (`[]`) as the second argument to `useEffect`, it ensures that the effect function only runs once after the initial render, similar to how `ngOnInit` runs once after the component's inputs have been initialized.

However, there are some differences between the two. In Angular, `ngOnInit` is a lifecycle hook that is a part of the component's class, whereas in React, `useEffect` is a Hook that's used inside functional components. Also, `useEffect` can be used for running side effects after every render or when certain props/state values change, not just after the initial render.
</details>

<details>
<summary>

**Sidetracking: `extend` vs `implements` in OOP**
</summary>
<br>

In Object-Oriented Programming (OOP), `implements` and `extends` are used for different purposes:

- `extends`: This keyword is used for class inheritance. When a class `extends` another class, it inherits all of the parent class's methods and properties. The child class can then add new methods and properties or override the inherited ones. This is a way to create a specialized version of a class. For example, if you have a Vehicle class, you might have Car and Motorcycle classes that extend Vehicle. They would inherit properties like speed and color, and they could add their own properties like numberOfWheels.

- `implements`: This keyword is used with interfaces. An interface is a structure that defines the contract for a class, without implementing any functionality itself. When a class `implements` an interface, it promises to provide the functionality defined by that interface. For example, you might have an interface Drivable with a method drive(). Any class that `implements` Drivable must have a drive() method. This is a way to ensure that a class meets a certain contract.

In summary, `extends` is about inheritance (a "is a" relationship: a Car is a Vehicle), and `implements` is about fulfilling a contract (a "can do" relationship: a Car can Drive).
</details>

### Property Binding

Property binding in Angular is a one-way data binding technique which is used to set the property of a view/HTML element. The value of a property of the html element is set to a property of a component class. Property binding is done using square brackets `[]`.

For example, if you have a property in your component:

```TypeScript
export class AppComponent {
  isDisabled = true;
}
```

You can bind this property to the disabled property of a button in your view:

```HTML
<button [disabled]="isDisabled">Click me</button>
```

In this case, the button's disabled property is bound to the isDisabled property of the component. The button will be disabled or enabled based on the value of isDisabled in the component.

Property binding can be used with a `<p>` tag to set the `innerText` property. This is similar to how it works with other HTML elements. Here's an example:

```HTML
<p [innerText]="'Hello ' + name"></p>
In your component:
```

In your component:

```TypeScript
export class AppComponent {
  name = 'John';
}
```

In this case, the innerText of the `<p>` tag is bound to the expression `'Hello ' + name`. The `innerText` will be updated whenever the name property changes in the component.

This is a one-way data binding because the data flows from the component to the view, but not the other way around. Changes in the view (like user input) do not affect the component property.

### Property Binding vs String Interpolation

In Angular, both property binding and string interpolation are used to bind data from the component to the template, but they work in slightly different ways:

**Property Binding**:

- Property binding uses `[html-property]` to send values from the component to the template.
- It binds a property of a DOM element to a field, which is a defined property in the component TypeScript code.
- Property binding does not convert the expression result to a string. So if you need to bind something other than a string to your directive/component property, you must use property binding.
- Example: `<button [disabled]='isDisabled'>Try Me</button>`.

**String Interpolation**:

- String interpolation uses `{{ expression }}` to render the bound value to the component’s template.
- It is a special syntax that Angular converts into a property binding.
- Angular evaluates all expressions in double curly braces, converts the expression results to strings, and concatenates them with neighboring literal strings.
- When you need to concatenate strings, you must use interpolation instead of property binding.
- Example: `<button disabled='{{isDisabled}}'>Try Me</button>`.

In summary, **use property binding when you want to bind a property to a non-string data value, and use string interpolation when you want to render a bound value to the template or need to concatenate strings.**

### Event Binding

Event binding in Angular is a technique that allows you to respond to user actions or other asynchronous events like mouse clicks, key presses, or data received from a network. It's a way to define how user interactions with the DOM (Document Object Model) result in changes to your application state.

Event binding is defined in the template and is enclosed in parentheses `()`. The target event is placed within the parentheses on the left side of an equal sign, and a template statement is on the right.

Here's an example of event binding in Angular:

```HTML
<button (click)="onButtonClick()">Click me</button>
```

In this example, `(click)` is the target event, and `onButtonClick()` is the template statement. When the button is clicked, the `onButtonClick()` method in the component is executed.

In your component TypeScript file, you would define the `onButtonClick()` method:

```TypeScript
export class AppComponent {
  onButtonClick() {
    console.log('Button clicked!');
  }
}
```

In this case, when the button is clicked, "Button clicked!" is logged to the console.

This is a one-way data binding because the data flows from the view to the component (from the DOM event to the component method), but not the other way around. Changes in the component do not affect the view.

Also in Angular, `$event` is a special keyword that refers to the event object associated with the event that has just been triggered. The type of `$event` depends on the target event.

For example, if the target event is a native DOM element event, then `$event` is an object representing the event, such as a `MouseEvent` or `KeyboardEvent`.

Here's an example of how it's used:

```html
<button (click)="clicked($event)"></button>
```

```typescript
@Component(...)
class MyComponent {
  clicked(event : Event) {
    event.preventDefault();
  }
}
```

In this example, `$event` is passed to the `clicked` method when the button is clicked. Inside the `clicked` method, `event.preventDefault()` is called to prevent the default action associated with the event.

If you don't pass `$event` like in `(click)="clicked()"`, then the event value is not passed. So, `$event` allows you to access and manipulate the event object within your component methods.

### Two-way data binding

Two-way data binding in Angular is a mechanism that allows automatic synchronization of data between the model (component) and the view. This means that changes made to the model in the component are propagated to the view, and any changes made in the view are immediately updated in the underlying component data.

Two-way data binding is useful in data entry forms. Whenever a user makes changes to a form field, we would like to update our model. Similarly, when we update the model with new data, we would like to update the view as well.

The two-way data binding is nothing but both property binding and event binding applied together. Property Binding is one way from component to view. The event binding is one way from view to component. If we combine both we will get the Two-way binding.

Here's an example of how it's used:

```html
<input type="text" [(ngModel)]="name">
```

In this example, `[(ngModel)]` is a built-in directive and is part of the `FormsModule`. It binds to a form element like input, select, selectarea, etc. Internally, it uses the `ngModel` in property binding to bind to the value property and `ngModelChange` which binds to the input event.

If you want to use `[(ngModel)]` for two-way data binding in Angular, you need to import the `FormsModule` into your Angular module.

Here's how you can do it:

```typescript
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule
    // other imports here
  ],
  // declarations, providers, bootstrap, etc. here
})
export class AppModule { }
```

By adding `FormsModule` to the `imports` array in the `@NgModule` decorator, Angular will know to look for and enable the `[(ngModel)]` directive when it runs your code. This is a necessary step for two-way data binding to work properly in your Angular application.

## Angular Directives

Directives are simply, instructions in the DOM.

When Angular renders the template, it looks for these directives and follows their instructions. This could mean manipulating the structure of the DOM, changing styles, handling events, or even transforming data.

Here's a simple comparison:

- **Components** are like **blueprints** for a house. They describe the structure and appearance of the house.
- **Directives**, on the other hand, are like **instructions** for the construction workers. They tell the workers what to do - paint the walls, install the doors, lay the roof, etc.

There are three types of Angular directives:

1. **Components**: These are used with a template and are the most common directive type.
2. **Attribute Directives**: These change the appearance or behavior of an element, component, or another directive.
3. **Structural Directives**: These change the DOM layout by adding and removing DOM elements.

Here are some examples of built-in attribute directives:

- **NgClass**: Adds and removes a set of CSS classes.
- **NgStyle**: Adds and removes a set of HTML styles.
- **NgModel**: Adds two-way data binding to an HTML form element.

These directives use only public APIs and do not have special access to any private APIs that other directives can't access. You can also define your own directives to attach custom behavior to elements in the DOM.