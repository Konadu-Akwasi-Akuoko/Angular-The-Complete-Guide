# Section 07 - Directives Deep Dive

## Attribute vs Structural directives

In Angular, directives are used to add behavior to elements in the DOM. There are two main types of directives: attribute directives and structural directives.

1. **Attribute Directives**: These **change the appearance or behavior of an element, component, or another directive**. They are used as attributes of elements. For example, the built-in `NgStyle` and `NgClass` directives in Angular are attribute directives. They alter the style and class of the elements they are used on.

2. **Structural Directives**: These **change the DOM layout by adding and removing DOM elements**. Structural directives are easy to spot in an Angular template because they are always in the form of `*directiveName` or more modernly `@directiveName`. For example, the built-in `*ngFor`, `@ngFor`, `@ngIf` and `*ngIf` directives in Angular are structural directives. They add or remove elements from the DOM.

Here's a simple comparison:

- Attribute Directive: `<div [ngStyle]="{'color': 'red'}">Hello World</div>`
- Structural Directive: `<div *ngIf="true">Hello World</div>`
- Angular 17 Structural Directive: `@if(true) {<div>Hello World</div>}`

In the attribute directive example, the `ngStyle` directive is changing the color of the text to red. In the structural directive example, the `ngIf` or the `@if` directive is conditionally rendering the div in the DOM.

## Creating a basic attribute directive

In Angular, a custom attribute directive is a way to change the behavior or appearance of a DOM element. It's a class with the `@Directive` decorator. Here's a simple breakdown:

1. **@Directive decorator**: This is used to define a directive. It's imported from `@angular/core`.

2. **selector**: This is a CSS selector that identifies the directive in a template. The directive is applied to any element that matches the selector.

3. **Host element**: The DOM element that the directive is attached to is known as the host element.

The Angular CLI can generate a directive for you by using this command:

```bash
ng generate directive [directiveName]

or

ng g d [directiveName]
```

In your project, you have a custom attribute directive defined in the `basic-highlight.directive.ts` file. Let's break it down:

```typescript
import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]',
})
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.style.backgroundColor = `green`;
  }
}
```

In this file, a directive `appBasicHighlight` is defined. This directive changes the background color of the host element to green when the component initializes.

The directive is declared in the `app.module.ts` file:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BasicHighlightDirective } from './basic-highlight/basic-highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    BasicHighlightDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Here, `BasicHighlightDirective` is added to the `declarations` array in the `@NgModule` decorator, making it available for use throughout the application.

In the `app.component.html` file, the directive is used like this:

```html
<p appBasicHighlight>Style me with basic directive</p>
```

The `appBasicHighlight` directive is applied to the `<p>` element, which changes its background color to green.

This is a basic example of a custom attribute directive in Angular. The directive is simple and only changes the background color, but it can be expanded to include more complex logic and behaviors.

## Using the renderer to build better attribute directives

In Angular, `Renderer2` is a built-in service that provides methods to manipulate elements in a way that's safe across different platforms (web worker, server-side rendering, etc.). It's an abstraction offered by Angular to manipulate the UI without directly touching the DOM, which is a security risk.

Using `Renderer2` is considered a good practice because it ensures that your app remains safe. Directly accessing the DOM can make your application more vulnerable to XSS attacks. Furthermore, direct DOM manipulation can break server-side rendering and might not work with Web Workers or Angular Universal.

Here's how you can create a custom attribute directive using `Renderer2`:

In your `better-highlight.directive.ts` file, you have already used `Renderer2`:

```typescript
import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'backgroundColor',
      'blue'
    );
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
  }
}
```

In this directive, `Renderer2` is used to set the background color and text color of the host element. The `setStyle` method is used to set the style of the element. The first argument is the element, the second is the style to be changed, and the third is the new style value.

This directive is used in the `app.component.html` file:

```html
<p appBetterHighlight>Style me with better directive</p>
```

The `appBetterHighlight` directive is applied to the `<p>` element, which changes its background color to blue and text color to white.

The directive is declared in the `app.module.ts` file:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BetterHighlightDirective } from './better-highlight/better-highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    BetterHighlightDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Here, `BetterHighlightDirective` is added to the `declarations` array in the `@NgModule` decorator, making it available for use throughout the application.

<details>
<summary>

**Why set styles in `ngOnInit`?**

</summary>
Setting element styles in the `ngOnInit` lifecycle hook is considered good practice because it ensures that the component's input properties are initialized.
In Angular, the `ngOnInit` lifecycle hook is a callback method that is called once when the directive or component's input properties are set, and it's a safe place to perform complex initializations. When a component/directive is created, Angular first calls the constructor, then it initializes the input properties, and finally it calls the `ngOnInit` method. If you try to access input properties in your constructor, they won't be initialized yet. So, if you're setting styles based on input properties, doing it in the constructor could lead to undefined values. That's why it's better to set styles in the `ngOnInit` method. In your `BetterHighlightDirective`, you're not using input properties, but if you were, `ngOnInit` would be the right place to use them to set styles.

</details>

## Using `HostListener` to listen to host events

The `@HostListener` is a decorator in Angular that declares a DOM event to listen for and provides a handler method to run when that event occurs. It's part of Angular's event binding feature, which allows you to respond to any DOM event.

The syntax is as follows:

```typescript
@HostListener('event_name') methodName(args) {...}
```

- `event_name`: The name of the DOM event to which you want to respond.
- `methodName`: The method to call when the event occurs.
- `args`: Optional argument(s) to pass into the handler method.

The `@HostListener` decorator is useful for handling events directly from the host element of the directive. This makes your code more modular and reusable, as the directive encapsulates the event handling logic.

In your `better-highlight.directive.ts` file, you're using `@HostListener` to listen for `mouseenter` and `mouseleave` events:

```typescript
@HostListener('mouseenter') mouseover(eventData: Event) {
  this.renderer.setStyle(
    this.elementRef.nativeElement,
    'background-color',
    'blue'
  );
  this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
}

@HostListener('mouseleave') mouseleave(eventData: Event) {
  this.renderer.setStyle(
    this.elementRef.nativeElement,
    'background-color',
    'transparent'
  );
  this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'black');
}
```

In this example, when the mouse enters the host element, the `mouseover` method is called, changing the background color to blue and the text color to white. When the mouse leaves the host element, the `mouseleave` method is called, changing the background color to transparent and the text color to black.

In your `app.component.html` file, you're using the `appBetterHighlight` directive:

```html
<p appBetterHighlight>Style me with better directive</p>
```

In this case, the `p` element is the host of the `appBetterHighlight` directive. When you hover over this paragraph, it will change its background color to blue and its text color to white due to the `mouseover` method in the directive. When you move the mouse away, it will change its background color to transparent and its text color to black due to the `mouseleave` method.

And no, the `@HostListener` decorator is not limited to directive classes. It can also be used in component classes in Angular.

When used in a component, `@HostListener` will listen for events on the component's host element. Here's an example:

```typescript
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `<p>Move your mouse over this paragraph.</p>`
})
export class ExampleComponent {
  @HostListener('mouseenter') onMouseEnter() {
    console.log('Mouse entered');
  }

  @HostListener('mouseleave') onMouseLeave() {
    console.log('Mouse left');
  }
}
```

In this example, the `ExampleComponent` listens for `mouseenter` and `mouseleave` events on its host element. When the mouse enters or leaves the area of the paragraph, the corresponding method is called, logging a message to the console.

## Using `HostBinding` to bind to host properties

The `@HostBinding` decorator in Angular is used to bind a host element property (the element where the directive is applied) to a directive property. This allows you to change properties of the element from within the directive.

The syntax is as follows:

```typescript
@HostBinding('property_name') directivePropertyName;
```

- `property_name`: The name of the host element's property you want to bind.
- `directivePropertyName`: The name of the directive's property.

The `@HostBinding` decorator is important because it provides a way to change the properties of the host element directly from the directive, making your code more modular and reusable.

In your `better-highlight.directive.ts` file, you're using `@HostBinding` to bind the `style.backgroundColor` property of the host element to the `backgroundColor` property of the directive:

```typescript
@HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
```

This means that whenever the `backgroundColor` property of the directive changes, the `style.backgroundColor` property of the host element will also change.

For example, in the `mouseover` and `mouseleave` methods, you're changing the `backgroundColor` property:

```typescript
@HostListener('mouseenter') mouseover(eventData: Event) {
  this.backgroundColor = 'blue';
}

@HostListener('mouseleave') mouseleave(eventData: Event) {
  this.backgroundColor = 'transparent';
}
```

When the mouse enters the host element, the `backgroundColor` property is set to 'blue', which changes the background color of the host element to blue. When the mouse leaves the host element, the `backgroundColor` property is set to 'transparent', which changes the background color of the host element to transparent.

## Binding to directive properties

Binding to directive properties in Angular allows you to pass values from the parent context (like a component) into the directive. This is done using the `@Input` decorator in the directive.

This is important because it allows for reusability and configurability of directives. Instead of hardcoding values within the directive, you can pass them in as inputs, making the directive more flexible and reusable in different contexts.

In your `better-highlight.directive.ts` file, you have two properties bound using the `@Input` decorator:

```typescript
@Input() defaultColor: string = 'transparent';
@Input('appBetterHighlight') highlightColor: string = 'blue';
```

The `defaultColor` property is bound to the `defaultColor` attribute of the host element, and the `highlightColor` property is bound to the `appBetterHighlight` attribute of the host element.

In your `app.component.html` file, you're using the `appBetterHighlight` directive and passing in values for `defaultColor` and `appBetterHighlight`:

```html
<p [appBetterHighlight]="'red'" [defaultColor]="'yellow'">
  Style me with better directive
</p>
```

In this case, the `defaultColor` is set to 'yellow', and the `highlightColor` (which is aliased as `appBetterHighlight`) is set to 'red'. These values are passed into the directive and used to set the background color of the paragraph element when the mouse enters or leaves it.

This makes your work easier because you can reuse the `appBetterHighlight` directive in different contexts with different colors. You just need to pass in the desired colors as inputs when you use the directive.

## What happens behind the scenes on structural directives

The `*` symbol in Angular is a shorthand syntax for a structural directive. Structural directives are responsible for HTML layout. They shape or reshape the DOM's structure, typically by adding, removing, or manipulating elements.

When you see a directive with the `*` prefix, such as `*ngIf`, `*ngFor`, or `*ngSwitch`, it's a structural directive.

The `*` syntax is a shorthand that expands into a longer form. For example, the following binding:

```html
<div *ngIf="condition">Content</div>
```

Expands into:

```html
<ng-template [ngIf]="condition">
  <div>Content</div>
</ng-template>
```

In the expanded form, Angular's `<ng-template>` element defines a block of HTML that a directive can add or remove. The `[ngIf]` property binding to the `ngIf` directive is still present. The `ngIf` directive then uses the HTML within the `<ng-template>` for its own purposes, adding or removing the template content based on the truthiness of the `condition`.

The `*` syntax simplifies the use of structural directives in your templates, making them easier to read and maintain. Also this means that if you want to create your own structural directive you need to use the `ng-template` provided by Angular.

## Building a structural directive

Creating a structural directive in Angular involves creating a directive that manipulates the DOM structure, typically by adding, removing, or manipulating elements. This is done using the `TemplateRef` and `ViewContainerRef` classes.

Here's a step-by-step guide on how to create a basic structural directive:

1. **Import necessary classes**: Import the `Directive`, `Input`, `TemplateRef`, and `ViewContainerRef` classes from `@angular/core`.

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
```

2. **Create the directive class**: Declare a class with the `@Directive` decorator and a CSS attribute selector. The class should implement the `OnInit` interface.

```typescript
@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective implements OnInit {
  // ...
}
```

3. **Declare an input property**: Declare an input property for the directive. This property will be used to pass a condition to the directive.

```typescript
@Input() set appUnless(condition: boolean) {
  // ...
}
```

4. **Inject `TemplateRef` and `ViewContainerRef`**: Inject `TemplateRef` and `ViewContainerRef` into the directive's constructor. `TemplateRef` represents the `<ng-template>` element and allows you to instantiate it. `ViewContainerRef` represents a container where one or more views can be attached.

```typescript
constructor(
  private templateRef: TemplateRef<any>,
  private vcRef: ViewContainerRef
) { }
```

5. **Implement the `OnInit` method**: In the `ngOnInit` method, use the `createEmbeddedView` or `clear` method of `ViewContainerRef` to add or remove the template based on the condition.

```typescript
ngOnInit() {
  if (!this.condition) {
    this.vcRef.createEmbeddedView(this.templateRef);
  } else {
    this.vcRef.clear();
  }
}
```

Here's the complete code for a basic `UnlessDirective`:

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective implements OnInit {
  private condition: boolean;

  @Input() set appUnless(condition: boolean) {
    this.condition = condition;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) { }

  ngOnInit() {
    if (!this.condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }
}
```

This `UnlessDirective` works opposite to Angular's built-in `*ngIf`. It adds the template to the DOM when the condition is `false` and removes it when the condition is `true`.

To use this directive in your `app.component.html`, you can do:

```html
<p *appUnless="true">This paragraph will not be displayed because the condition is true.</p>
<p *appUnless="false">This paragraph will be displayed because the condition is false.</p>
```

Remember to declare the `UnlessDirective` in your module:

```typescript
@NgModule({
  declarations: [
    AppComponent,
    UnlessDirective
    // other components, directives, and pipes
  ],
  // ...
})
export class AppModule { }
```

This is a basic example. Real-world structural directives can be more complex, with more inputs and more sophisticated DOM manipulations.

<details>

<summary>
Setter and Getter methods in typescript
</summary>

<br/>

In TypeScript, `set` is an accessor used to create a setter method in a class. A setter method allows you to control how a property of an object is set.

Here's a basic example:

```typescript
class MyClass {
  private _name: string;

  set name(value: string) {
    if (value.length > 0) {
      this._name = value;
    } else {
      console.log('Invalid name');
    }
  }

  get name(): string {
    return this._name;
  }
}

let obj = new MyClass();
obj.name = 'John'; // sets the name
console.log(obj.name); // gets the name
```

In this example, `name` is a property with a getter and a setter. The setter (`set name`) checks if the value being set is valid (in this case, it checks if the string length is greater than 0). If the value is valid, it sets the `_name` property; otherwise, it logs an error message.

This allows you to encapsulate the internal state of an object and control how it can be accessed or modified, which is a key principle of object-oriented programming known as encapsulation.

In your Angular code, you're using `set` in the `appUnless` directive:

```typescript
@Input() set appUnless(condition: boolean) {
  // ...
}
```

In this case, `appUnless` is a setter for an `@Input` property. When the `appUnless` property is set in a parent component, the setter method is called, allowing you to run additional code (like checking the condition and manipulating the DOM).

</details>
