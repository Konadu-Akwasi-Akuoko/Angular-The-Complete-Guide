# Section 07 - Directives Deep Dive

## Attribute vs Structural directives

In Angular, directives are used to add behavior to elements in the DOM. There are two main types of directives: attribute directives and structural directives.

1. **Attribute Directives**: These change the appearance or behavior of an element, component, or another directive. They are used as attributes of elements. For example, the built-in `NgStyle` and `NgClass` directives in Angular are attribute directives. They alter the style and class of the elements they are used on.

2. **Structural Directives**: These change the DOM layout by adding and removing DOM elements. Structural directives are easy to spot in an Angular template because they are always in the form of `*directiveName` or more modernly `@directiveName`. For example, the built-in `*ngFor`, `@ngFor`, `@ngIf` and `*ngIf` directives in Angular are structural directives. They add or remove elements from the DOM.

Here's a simple comparison:

- Attribute Directive: `<div [ngStyle]="{'color': 'red'}">Hello World</div>`
- Structural Directive: `<div *ngIf="true">Hello World</div>`
- Angular 17 Structural Directive: `@if(true) {<div>Hello World</div>}`

In the attribute directive example, the `ngStyle` directive is changing the color of the text to red. In the structural directive example, the `ngIf` directive is conditionally rendering the div in the DOM.
