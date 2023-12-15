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
