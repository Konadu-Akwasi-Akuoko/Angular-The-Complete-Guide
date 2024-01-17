# Using Services And Dependency Injection

In Angular, a service is a class with a specific purpose. It's commonly used to share data or functions between different components. Services are a fundamental part of Angular applications and are used to organize and share code across the application.

A service in Angular is typically a class with the `@Injectable()` decorator. This decorator tells Angular that this service might itself have injected dependencies. Services can be injected into components as dependencies, making your code modular, reusable, and efficient.

Here's an example of a simple service in Angular:

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data: string[] = ['Data1', 'Data2', 'Data3'];

  getData() {
    return this.data;
  }
}
```

In React, the concept that comes closest to Angular's services is probably Context API or Redux. These are used to manage and share state across components, similar to how services are used in Angular.

The Context API allows you to share values between different components without having to explicitly pass a prop through every level of the tree. Here's an example:

```jsx
import React, { createContext, useContext } from 'react';

// Create a Context
const DataContext = createContext();

// Provider in root component
function App() {
  return (
    <DataContext.Provider value={['Data1', 'Data2', 'Data3']}>
      <ChildComponent />
    </DataContext.Provider>
  );
}

// Use Context in child component
function ChildComponent() {
  const data = useContext(DataContext);
  return (
    <div>
      {data.map(item => <p>{item}</p>)}
    </div>
  );
}
```

Redux, on the other hand, is a library for managing global state. It's more powerful and complex than the Context API, but it can be overkill for small applications.

## Why do we need services in Angular?

1. **Code Organization and Reusability**: Services allow you to organize your code into reusable pieces. You can define a function once in a service and use it in many components, rather than repeating the same code in multiple places.

2. **Data Sharing**: Services can be used to share data between different parts of your application. For example, you might have a service that fetches data from a server and stores it. This data can then be accessed by any component that injects the service.

3. **Dependency Injection**: Angular's dependency injection system allows you to inject services as dependencies into components, directives, and other services. This makes your code more modular and testable. You can easily swap out a service for a mock version when testing, for example.

4. **Application-Wide State Management**: Services can be used to manage application-wide state. For example, you might have a service that holds the current user's information. This service can be injected into any component that needs to display or modify the current user's information.

5. **Implementing Business Logic**: Services are a good place to implement business logic that doesn't belong in components. Components should be focused on presenting data and capturing user input, while services should handle things like calculations and data processing.

<details>
<summary>
Dependency Injection, an OOP concept
</summary>

In OOP, **Dependency Injection** is a design pattern where an object's dependencies (i.e., the other objects it works with) are not hard-coded. Instead, they are provided to the object (injected) at runtime. This makes the code more flexible, testable, and modular.

Here's a simple example in TypeScript:

```typescript
class Engine {
    start() {
        console.log("Engine started");
    }
}

class Car {
    private engine: Engine;

    constructor(engine: Engine) {
        this.engine = engine;
    }

    start() {
        this.engine.start();
        console.log("Car started");
    }
}

let engine = new Engine();
let car = new Car(engine);
car.start();
```

or you can write the above using shorthand syntax like this:

```typescript
class Engine {
    start() {
        console.log("Engine started");
    }
}

class Car {
    constructor(private engine: Engine) {
    }

    start() {
        this.engine.start();
        console.log("Car started");
    }
}

let engine = new Engine();
let car = new Car(engine);
car.start();
```

In this example, `Car` depends on `Engine`. But instead of creating an `Engine` inside `Car`, we pass an `Engine` to `Car` when we create it. This is Dependency Injection.

Now, let's draw a parallel to the functional programming world. In functional programming, we often pass functions as arguments to other functions. This is similar to DI in that we're providing a dependency (a function) to another function at runtime. Here's an example:

```typescript
// Function to add two numbers
function add(x: number, y: number): number {
    return x + y;
}

// Function to multiply two numbers
function multiply(x: number, y: number): number {
    return x * y;
}

// Higher-order function to calculate based on the passed function
function calculate(func: (x: number, y: number) => number, x: number, y: number): number {
    return func(x, y);
}

// Test the calculate function with add and multiply
console.log(calculate(add, 5, 3)); // Outputs: 8
console.log(calculate(multiply, 5, 3)); // Outputs: 15
```

In this example, `calculate` is a higher-order function that takes another function (`add` or `multiply`) as an argument. This is similar to how `Car` takes an `Engine` as an argument in the OOP example. So, you can think of higher-order functions as a form of Dependency Injection in the functional programming world.

Then why not create an instance of a class inside a new class where it is needed, you may ask.

Creating a new instance of a class inside another class can lead to several issues:

1. **Tight Coupling**: If a class creates and uses a new instance of another class, these two classes become tightly coupled. This means that if you need to change the second class, you may also need to change the first class. This can make your code harder to maintain and evolve.

2. **Difficulty in Testing**: When a class creates its own dependencies, it can be difficult to replace those dependencies with mock versions for testing. With dependency injection, you can easily provide a mock version of a dependency when testing.

3. **Lack of Flexibility**: If a class creates its own dependencies, it's hard to change those dependencies without modifying the class. With dependency injection, you can change the dependencies that are provided to a class without changing the class itself.

4. **Code Duplication**: If multiple classes need to use the same dependency, they would each have to create their own instance of it. This can lead to code duplication. With dependency injection, a single instance of a dependency can be shared among multiple classes.

Here's an example to illustrate this:

```typescript
class Logger {
  log(message: string) {
    console.log(message);
  }
}

class DataService {
  private logger = new Logger();

  fetchData() {
    this.logger.log('Fetching data...');
    // Fetch data here...
  }
}
```

In this example, `DataService` creates its own `Logger` instance. This means that `DataService` is tightly coupled to `Logger`, it's hard to test `DataService` with a mock logger, and if another class also needs to log messages, it would have to create its own `Logger` instance, leading to code duplication.

By using dependency injection, these issues can be avoided:

```typescript
class Logger {
  log(message: string) {
    console.log(message);
  }
}

class DataService {
  constructor(private logger: Logger) {}

  fetchData() {
    this.logger.log('Fetching data...');
    // Fetch data here...
  }
}
```

In this version, `Logger` is injected into `DataService`. This decouples the two classes, makes it easy to test `DataService` with a mock logger, allows the logger to be changed without modifying `DataService`, and allows the same `Logger` instance to be shared among multiple classes.

</detail>

## Creating a data service

1. **AccountsService** (@accounts.service.ts): This is a service that manages accounts data. It has methods to add an account and update the status of an account. The `@Injectable` decorator is used to mark a class as available to be provided and injected as a dependency.

```typescript
import { Injectable } from '@angular/core';

@Injectable({
 providedIn: 'root',
})
export class AccountsService {
 // ...
}
```

2. **AppComponent** (@app.component.ts): This is the root component of the application. It injects the `AccountsService` via the constructor. The `providers` array in the `@Component` decorator is used to define the providers of the component. Here, `AccountsService` is provided at the component level.

```typescript
import { Component } from '@angular/core';
import { AccountsService } from './accounts.service';

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css'],
 providers: [AccountsService],
})
export class AppComponent {
 constructor(private account: AccountsService) {}
 // ...
}
```

3. **AccountComponent** (@account.component.ts): This component displays account information. It injects the `LoggingService` via the constructor. The `providers` array in the `@Component` decorator is used to define the providers of the component. Here, `LoggingService` is provided at the component level.

```typescript
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoggingService } from '../logging.service';

@Component({
 selector: 'app-account',
 templateUrl: './account.component.html',
 styleUrls: ['./account.component.css'],
 providers: [LoggingService],
})
export class AccountComponent {
 constructor (private loggingService : LoggingService) {}
 // ...
}
```

4. **NewAccountComponent** (@new-account.component.ts): This component is responsible for creating new accounts. It injects the `LoggingService` via the constructor. The `providers` array in the `@Component` decorator is used to define the providers of the component. Here, `LoggingService` is provided at the component level.

```typescript
import { Component, EventEmitter, Output } from '@angular/core';
import { LoggingService } from '../logging.service';

@Component({
 selector: 'app-new-account',
 templateUrl: './new-account.component.html',
 styleUrls: ['./new-account.component.css'],
 providers: [LoggingService],
})
export class NewAccountComponent {
 constructor(private loggingService: LoggingService) {}
 // ...
}
```

In all these examples, the `providers` array in the `@Component` decorator is used to define the providers of the component. This means that a new instance of the service will be created for each instance of the component. If you want to share a single instance of a service across all instances of a component, you can provide the service at the module level by adding it to the `providers` array in the `@NgModule` decorator.

These services are used in the following ways:

1. **AccountsService**: This service is used in both the `AppComponent` and `AccountComponent`. In the `AppComponent`, it's used to add a new account and update the status of an account. In the `AccountComponent`, it's used to update the status of an account.

```typescript
// In AppComponent
this.account.addAccount(newAccount.name, newAccount.status);
this.account.updateStatus(updateInfo.id, updateInfo.newStatus);

// In AccountComponent
this.accountsService.updateStatus(this.id, status);
```

2. **LoggingService**: This service is used in the `AccountComponent` and `NewAccountComponent`. In the `AccountComponent`, it's used to log a status change. In the `NewAccountComponent`, it's used to log the creation of a new account.

```typescript
// In AccountComponent
this.loggingService.logStatusChange(this.id, status);

// In NewAccountComponent
this.loggingService.onCreateAccount(accountName, accountStatus);
```

These services are injected into the components via the constructor. When a component is instantiated, Angular's DI system looks at the types of the parameters in the constructor and tries to find a provider for each parameter. If it finds a provider, it injects the corresponding service instance.

For example, in the `AccountComponent`, the `LoggingService` and `AccountsService` are injected via the constructor:

```typescript
constructor(
 private loggingService: LoggingService,
 private accountsService: AccountsService
) {}
```

This means that when an instance of `AccountComponent` is created, Angular will look for a provider for `LoggingService` and `AccountsService`, and inject the corresponding service instances into the `AccountComponent`.

## Hierarchical Injector

1. **Root Level**: At the root level, the service is provided in the `AppModule`. This makes the service singleton within the entire application. All components, directives, pipes, and other services that request this service will receive the same instance.

2. **Component Level**: Services can also be provided at the component level. When a service is provided at the component level, a new instance of the service is created for that component and all its child components. This instance is not shared with other components above or at the same tree level (horizontally).

3. **Directive Level**: Services can also be provided at the directive level. Similar to the component level, a new instance of the service is created for the directive and all its child directives.

4. **Pipe Level**: Services can also be provided at the pipe level. Again, a new instance of the service is created for the pipe and all its child pipes.

The hierarchy of DI ensures that the correct instance of a service is injected based on where the service is requested. This allows for a high degree of control over the lifecycle and scope of services in an Angular application.

## How many instances of services should it be?

The `providers` property of the `@Component` decorator in Angular is used to define the services that should be instantiated and made available to the component and its child components.

When you provide a service at the component level (i.e., in the `providers` array of a `@Component`), a new instance of the service is created specifically for that component and all its child components. This means that the service is scoped to the component and its descendants. Any changes made to the service within this scope will not affect other instances of the service that might exist elsewhere in the application.

On the other hand, when you provide a service at the root level (i.e., in the `providers` array of the `@NgModule`), a single instance of the service is created and shared across the entire application. This means that the service is a singleton and any changes made to the service will be reflected everywhere it is injected, **provided no instance of a child component adds it to it's providers array.**

Here's an example to illustrate this:

```typescript
import { Component } from '@angular/core';
import { MyService } from './my.service';

@Component({
 selector: 'my-component',
 template: `<child-component></child-component>`,
 providers: [MyService] // MyService is provided at the component level
})
export class MyComponent {
 constructor(private myService: MyService) {
   console.log(this.myService === this.myChildComponent.myService); // false
 }
}

@Component({
 selector: 'child-component',
 template: ``,
 providers: [MyService] // A new instance of MyService is instantiated here
})
export class ChildComponent {
 constructor(private myService: MyService) {}
}
```

In this example, `MyComponent` and `ChildComponent` provides `MyService` at the component level. Therefore, `MyComponent` and `ChildComponent` each get their own separate instance of `MyService`. As a result, the comparison `this.myService === this.myChildComponent.myService` returns `false`, indicating that they are indeed separate instances.

If a service is provided in the `providers` array of a parent component, that service will be available to the parent component and all its child components.

However, if a service is not provided in the `providers` array of a component, Angular will look up the component tree until it finds a component that provides the service. If it reaches the root component without finding a provider, it will throw an error.

Here's an example to illustrate this:

```typescript
import { Component } from '@angular/core';
import { MyService } from './my.service';

@Component({
 selector: 'parent-component',
 template: `<child-component></child-component>`,
 providers: [MyService] // MyService is provided at the parent component level
})
export class ParentComponent {
 constructor(private myService: MyService) {}
}

@Component({
 selector: 'child-component',
 template: ``
})
export class ChildComponent {
 constructor(private myService: MyService) {}
}
```

In this example, `ParentComponent` provides `MyService` at the component level. Therefore, both `ParentComponent` and `ChildComponent` can inject `MyService` because they are part of the same component tree. And the `ChildComponent` can use the same instantiated version of `MyService` from it's parent component, that is `ParentComponent`.

**NB: All in all, we can say that adding a new service to the providers array of a new component will tell Angular to instantiate a new service for the component and all it's children, even if it's parent is component is using that same dependency injection service, the child's instantiated one will override the parent's service.**
