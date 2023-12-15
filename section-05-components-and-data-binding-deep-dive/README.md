# Section 05: Components & Data Binding Deep Dive

## Binding to custom properties

In Angular, custom property binding allows you to bind data from a parent component to a child component. This is done using the `@Input` decorator in the child component.

Let's break down how it works:

- **@server-element.component.ts**: This is the child component. The `@Input` decorator is used to make the `element` property bindable from outside this component. This means that when you use the `app-server-element` selector in a parent component, you can bind data to this `element` property.

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
})
export class ServerElementComponent {
  @Input() element: { type: string; name: string; content: string };
}
```

- **@app.component.html**: This is the template of the parent component. Here, the `app-server-element` selector is used to include the `ServerElementComponent` in the template. The `[element]="element"` part is where the custom property binding happens. The `element` inside the square brackets is the property in the child component that you want to bind to, and the `element` on the right side of the equals sign is the data in the parent component that you want to bind.

```html
<div class="container">
  <app-cockpit />
  <hr />
  <div class="row">
    <div class="col-xs-12">
      @for (element of serverElements; track $index) {
      <app-server-element [element]="element" />
      }
    </div>
  </div>
</div>
```

- **@app.component.ts**: This is the parent component. The `serverElements` array is the data that you want to bind to the `element` property in the `ServerElementComponent`. Each object in the `serverElements` array will be passed to a `ServerElementComponent` instance.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  serverElements = [
    { type: 'server', name: 'Testserver', content: 'Just a test!' },
  ];
}
```

In summary, custom property binding with the `@Input` decorator allows you to pass data from a parent component to a child component in Angular. The parent binds data to a property in the child component that is decorated with `@Input`, and the child component can then use that data as needed.

## Assigning alias to custom properties

In Angular, you can assign an alias to a custom property when you want to provide a public API for a property, but you want to use a different, internal name for that property in your component's code. This can be useful for avoiding naming conflicts or for improving code readability.

You can assign an alias to a custom property using the `@Input` decorator. You provide the alias as an argument to the `@Input` decorator, and then you use that alias when you bind to the property in a parent component.

Let's modify the `ServerElementComponent` from your code to demonstrate this. We'll assign the alias `srvElement` to the `element` property:

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
})
export class ServerElementComponent {
  @Input('srvElement') element: { type: string; name: string; content: string };
}
```

In the parent component's template, you would then use the `srvElement` alias instead of `element` when you bind to the property:

```html
<app-server-element [srvElement]="element" />
```

In this way, the `element` property in the `ServerElementComponent` is now publicly known as `srvElement`, but internally within the `ServerElementComponent`, it's still referred to as `element`.

## Binding to custom events

In Angular, `@Output()` is a decorator that marks a property in a child component as a doorway through which data can travel from the child to the parent. This decorator allows a child component to emit custom events to its parent component. The parent can then respond to those events.

Let's take a look at how it's used:

- In `cockpit.component.ts`, you have an `@Output()` decorator applied to the `onCreateServer` property. This property is an instance of `EventEmitter`, which is a class used to emit custom events in Angular.

```typescript
@Output() onCreateServer = new EventEmitter<{
  server: string;
  name: string;
  content: string;
}>();
```

- The `EventEmitter` instance can emit events using its `emit()` method. In your `onAddServer` method, you're emitting an event with an object as its payload:

```typescript
onAddServer({ server }: { server: 'server' | 'blueprint' }) {
  this.onCreateServer.emit({
    server: server,
    name: this.newServerName,
    content: this.newServerContent,
  });
}
```

- In `cockpit.component.html`, when the "Add Server" or "Add Server Blueprint" button is clicked, the `onAddServer` method is called, which in turn emits the `onCreateServer` event:

```html
<button class="btn btn-primary" (click)="onAddServer({ server: 'server' })">
  Add Server
</button>
<button
  class="btn btn-primary"
  (click)="onAddServer({ server: 'blueprint' })"
>
  Add Server Blueprint
</button>
```

- In `app.component.html`, the parent component listens for the `onCreateServer` event using the `(onCreateServer)` syntax. When the event is emitted, the `onCreateServer` method in the parent component is called with the event payload:

```html
<app-cockpit (onCreateServer)="onCreateServer($event)" />
```

- In `app.component.ts`, the `onCreateServer` method receives the event payload and uses it to add a new server to the `serverElements` array:

```typescript
onCreateServer({
  server,
  name,
  content,
}: {
  server: string;
  name: string;
  content: string;
}) {
  this.serverElements.push({
    type: server,
    name: name,
    content: content,
  });
}
```

So, in summary, `@Output()` allows a child component to emit events to its parent component. The parent component can listen for these events and respond to them.

Also the `$event` object is a special keyword in Angular that represents the data emitted by an event. When an event is emitted from a child component using an `EventEmitter` with the `@Output()` decorator, the data associated with that event can be captured in the parent component using `$event`.

In the context of your code, when the `onCreateServer` event is emitted in the `cockpit.component.ts` file:

```typescript
this.onCreateServer.emit({
  server: server,
  name: this.newServerName,
  content: this.newServerContent,
});
```

The emitted data (an object with `server`, `name`, and `content` properties) can be captured in the parent component (`app.component.html`) using `$event`:

```html
<app-cockpit (onCreateServer)="onCreateServer($event)" />
```

Here, `$event` is passed as an argument to the `onCreateServer` method in the parent component. Inside the `onCreateServer` method in `app.component.ts`, `$event` corresponds to the object that was emitted:

```typescript
onCreateServer({
  server,
  name,
  content,
}: {
  server: string;
  name: string;
  content: string;
}) {
  this.serverElements.push({
    type: server,
    name: name,
    content: content,
  });
}
```

So, in summary, `$event` is used to capture the data emitted by an event in the parent component.

## Assigning alias to custom events

In Angular, you can assign an alias to custom events using the `@Output()` decorator. This can be useful when you want the event name in the template to be different from the property name in the component class.

Here's how you can do it:

In your `cockpit.component.ts` file, you can assign an alias to the `onCreateServer` event like this:

```typescript
@Output('serverCreated') onCreateServer = new EventEmitter<{
  server: string;
  name: string;
  content: string;
}>();
```

In this case, `serverCreated` is the alias for the `onCreateServer` event.

Then, in your `app.component.html` file, you can listen for the `serverCreated` event instead of `onCreateServer`:

```html
<app-cockpit (serverCreated)="onCreateServer($event)" />
```

Now, whenever the `onCreateServer` event is emitted in the `cockpit.component.ts` file, the `onCreateServer` method in the `app.component.ts` file will be called, just like before. The difference is that in the template, you're using the `serverCreated` alias instead of the original `onCreateServer` name.

This can be useful for improving readability or avoiding naming conflicts.

## View encapsulation in Angular

View Encapsulation in Angular is a feature that allows for the scoping of CSS styles to specific components. This means that the styles defined in a component's CSS file will only apply to that component's template, and won't affect other components in the application.

Angular provides three strategies for View Encapsulation:

1. **Emulated (default):** Styles are scoped to the component but still remain inside the global CSS. Angular achieves this by adding unique attributes to the HTML tags and adjusting the CSS selectors to match these attributes.

2. **None:** Styles are not scoped and are globally available. Any styles applied in this component can affect the entire application.

3. **ShadowDom:** Styles are scoped to the component and use the browser's native shadow DOM implementation to isolate styles. This encapsulation strategy is only available in browsers that support the shadow DOM API.

You can set the encapsulation strategy in the `@Component` decorator like this:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None // or Emulated, ShadowDom
})
export class AppComponent {
  // ...
}
```

Remember that the choice of encapsulation strategy can have significant effects on how your styles are applied and should be chosen based on the needs of your project.

Let's use the `app.component.ts` and `app.component.css` files to explain view encapsulation.

In your `app.component.ts` file, you have set the encapsulation strategy to `ViewEncapsulation.None`:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  // ...
}
```

This means that the styles defined in `app.component.css` will not be scoped to the `AppComponent` only, but will be globally available to the entire application. Any styles defined in `app.component.css` can affect other components in your application.

Now, let's look at your `app.component.css` file:

```css
.container {
  margin-top: 30px;
}

p {
  color: blue;
}
```

With `ViewEncapsulation.None`, these styles will be applied globally. So, any `<p>` tag in your application, not just in `AppComponent`, will have the color blue. Similarly, any element with the class `.container` in your application will have a top margin of 30px.

If you had set the encapsulation to `ViewEncapsulation.Emulated` (the default), these styles would only apply to `AppComponent`. Angular would achieve this by adding unique attributes to the HTML tags in the `AppComponent` template and adjusting the CSS selectors in `app.component.css` to match these attributes.

If you had set the encapsulation to `ViewEncapsulation.ShadowDom`, Angular would use the browser's native shadow DOM to isolate the styles to `AppComponent`. This would also make the styles only apply to `AppComponent`, but this strategy is only available in browsers that support the shadow DOM API.

## Using local references in templates

In Angular, local references (also known as template reference variables) are a way to access DOM properties within your templates. They are defined using the `#` symbol in your HTML.

Let's look at the `cockpit.component.html` file:

```html
<input type="text" class="form-control" #serverNameInput />
<input type="text" class="form-control" #serverContentInput />
```

Here, `#serverNameInput` and `#serverContentInput` are local references. They hold a reference to their respective `<input>` elements.

You can use these local references anywhere inside the same template. For example, you can pass the value of the input field to a method when a button is clicked:

```html
<button
  class="btn btn-primary"
  (click)="onAddServer({
    server: 'server',
    serverName: serverNameInput.value,
    serverContent: serverContentInput.value
  })"
>
  Add Server
</button>
```

In this case, when the button is clicked, the `onAddServer` method is called with an object. The `serverName` and `serverContent` properties of this object are set to the values of the `serverNameInput` and `serverContentInput` input fields, respectively.

Now, let's look at your `cockpit.component.ts` file:

```typescript
onAddServer({
  server,
  serverName,
  serverContent,
}: {
  server: 'server' | 'blueprint';
  serverName: string;
  serverContent: string;
}) {
  this.onCreateServer.emit({
    server: server,
    name: serverName,
    content: serverContent,
  });
}
```

Here, the `onAddServer` method takes an object with `server`, `serverName`, and `serverContent` properties. This method emits an event with the same object, which can be listened to by a parent component.

In summary, local references in Angular provide a way to access DOM properties within your templates. They can be used to get the values of form fields, to call methods on child components, or even to access the child components themselves.

## `@ViewChild` in Angular

The `@ViewChild` decorator in Angular is used to access a child component, directive, or a DOM element from a parent component class or an attached component. It can also be used to interact with child components or to use methods from child components.

In your `cockpit.component.ts` file, you have used `@ViewChild` to get a reference to an input element in your `cockpit.component.html` file.

```typescript
@ViewChild('serverNameInput')
serverName: ElementRef<HTMLInputElement>;
```

Here, `'serverNameInput'` is a template reference variable defined in your `cockpit.component.html` file:

```html
<input type="text" class="form-control" #serverNameInput />
```

The `#serverNameInput` is a reference to the input element, and you can use this reference in your component class to access the properties of this input element. Like this:

```TypeScript
@ViewChild('serverNameInput')
serverName: ElementRef<HTMLInputElement>;

 onAddServer({
    server,
    // serverName,
    serverContent,
  }: {
    server: 'server' | 'blueprint';
    // serverName: HTMLInputElement;
    serverContent: HTMLInputElement;
  }) {
    console.log('severName: ', this.serverName.nativeElement.value);
    console.log('serverContent: ', serverContent);
    this.onCreateServer.emit({
      server: server,
      name: this.serverName.nativeElement.value,
      content: serverContent.value,
    });
  }
```

The `{strict: true}` option in `@ViewChild` is used to specify whether Angular should enforce stricter type checking. If `{strict: true}` is set, Angular will initialize the property with `undefined` and it will always be `undefined` if the query matches no elements. If `{strict: false}` is set (or not set at all, as `false` is the default), Angular will still initialize the property with `undefined`, but it will be set to `null` if the query matches no elements.

This can be useful if you want to ensure that a child component or DOM element is always available in your parent component. If it's not, Angular will throw an error, helping you catch potential bugs in your code.

## Projecting content into components with `ng-content`

`ng-content` is a built-in Angular directive that allows you to create "slots" in your Angular components where you can insert HTML content. This is a form of content projection (or transclusion in AngularJS terms), which is a way to import HTML content from outside the component and insert that content into the component's template in a designated spot.

In your `server-element.component.html` file, you have `<ng-content />` on line 5. This is where the projected content will be inserted.

```html
<div class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">
    <p>
      <ng-content />
    </p>
  </div>
</div>
```

In your `app.component.html` file, you use the `server-element` component and provide content between the opening and closing tags of the `server-element` component. This content will be projected into the `ng-content` slot of the `server-element` component.

```html
<div class="container">
  <app-cockpit (serverCreated)="onCreateServer($event)" />
  <hr />

  <div class="row">
    <div class="col-xs-12">
      @for (element of serverElements; track $index) {
      <app-server-element [srvElement]="element">
        @if (element.type === 'server') {
        <strong style="color: red">{{ element.content }}</strong>
        } @else {
        <em>{{ element.content }}</em>
        }
      </app-server-element>
      }
    </div>
  </div>
</div>
```

In this case, the content between the `app-server-element` tags (`<strong style="color: red">{{ element.content }}</strong>` or `<em>{{ element.content }}</em>`) will be projected into the `ng-content` slot in the `server-element.component.html` file.
