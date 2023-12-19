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
