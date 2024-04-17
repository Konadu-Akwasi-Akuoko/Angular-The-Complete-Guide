# Understanding Observables

To really understand observables, we first need to understand the observer design patter. So let's dive deep into the observer design pattern using Typescript.

## Observer Design Pattern

The Observer Design Pattern is a behavioral design pattern that defines a one-to-many dependency between objects so that when one object (the subject) changes state, all its dependents (observers) are notified and updated automatically

The observer design pattern is a behavioral pattern listed among the 23 well-known "Gang of Four" design patterns that address recurring design challenges in order to design flexible and reusable object-oriented software, yielding objects that are easier to implement, change, test and reuse.

The observer pattern addresses the following problems:

- A one-to-many dependency between objects should be defined without making the objects tightly coupled.
- When one object changes state, an open-ended number of dependent objects should be updated automatically.
- An object can notify multiple other objects.

The use of observers in reactive applications makes sense because the essence of reactive is reaction: something happens when another process occurs. An `Observer` function/method is to perform an action when an event happens. In the Observable pattern, one object notifies another object when an action is performed. The object that performs the action is called the `Observable`, and the object that reacts to the action is called the `Observer`.

> **Real-world analogy of the Observer Design Pattern:** Let us Imagine a scenario where the weather station is observed by various smart devices. The weather station maintains a list of registered devices. When there’s a change in weather conditions, the weather station notifies all devices about the update.

### Pull, Poll, and Push Mechanisms

The Observer Design Pattern typically uses the **push** mechanism. In this mechanism, the subject (or Observable) pushes updates to the observers. When a change in state occurs, the subject pushes the new data to all its observers by calling their `update()` method and passing the updated data as an argument.

However, it's worth noting that the Observer Pattern can also be implemented using a **pull** mechanism. In this case, when the subject's state changes, it notifies the observers that a change has occurred, but it doesn't send the updated data. Instead, the observers are responsible for pulling the necessary data from the subject.

The choice between push and pull can depend on specific requirements of the system. The push model can be more efficient because it sends updates as soon as they occur, but the pull model can provide more control to the observers over when and what data they retrieve.

In contrast, **polling** is not typically associated with the Observer Pattern. Polling is a method where the observers (or clients) repeatedly check the subject (or server) for updates at regular intervals, which can be less efficient and result in more network traffic. The Observer Pattern was designed to overcome some of the drawbacks of polling by providing a more event-driven approach.

### Components of the Observer Design Pattern

1. **Subject (Observable) interface:** The subject is the object that is being observed. The subject maintains a list of observers (subscribers or listeners). It Provides methods to register and unregister observers dynamically and defines a method to notify observers of changes in its state
2. **Observer interface:** Observer defines an interface with an update method that concrete observers must implement and ensures a common or consistent way for concrete observers to receive updates from the subject(using the interface's method signature). Concrete observers implement this interface, allowing them to react to changes in the subject’s state(the one being watched).
3. **Concrete Subject:** The concrete subject is the object being observed, it implements the subject/observable interface(thus it provide concrete implementation for the register and unregister methods). It maintains a list of observers, notifies observers of changes in its state, and provides methods to register and unregister observers. For instance, if a weather station is the subject, specific weather stations in different locations would be concrete subjects which have implemented the subject/observable interface.
4. **Concrete Observer:** The concrete observer is the object that observes the subject. It implements the observer interface and defines the method to be called when the subject notifies it of a change in state, thus they react to changes in the subject’s state. Concrete observers register themselves with the subject to receive notifications. For instance, if a smart device is an observer, a specific smart device would be a concrete observer that has implemented the observer interface and registered itself with the weather station.

> **Observer Design Pattern Example:** Consider a scenario where you have a weather monitoring system. Different parts of your application need to be updated when the weather conditions change.

The sole responsibility of a subject is to maintain a list of observers and to notify them of state changes by calling their `update()` operation. The responsibility of observers is to register and unregister themselves with a subject (in order to be notified of state changes) and to update their state (to synchronize their state with the subject's state) when they are notified. This makes subject and observers loosely coupled. Subject and observers have no explicit knowledge of each other. Observers can be added and removed independently at run time. This notification-registration interaction is also known as `publish-subscribe`.

The observer pattern can cause memory leaks, known as the lapsed listener problem, because in a basic implementation, it requires both explicit registration and explicit deregistration, as in the dispose pattern, because the subject holds strong references to the observers, keeping them alive. This can be prevented by using weak references. In the dispose pattern, the subject holds weak references to the observers, which are deregistered when they are finalized (Let's focus on the observer pattern here).

### Challenges or difficulties while implementing this system without Observer Design Pattern

- Components interested in weather updates would need direct references to the weather monitoring system, leading to tight coupling.
- Adding or removing components that react to weather changes requires modifying the core weather monitoring system code, making it hard to maintain.

### How Observer Pattern helps to solve above challenges?

The Observer Pattern helps decouple the weather monitoring system from the components interested in weather updates. Each component can register as an observer, and when the weather changes, the observers are notified. This way, adding or removing components doesn’t affect the weather monitoring system.

### Code Example of Observer Design Pattern

1. **Subject (Observable) Interface:**

    - The `Subject` interface outlines the operations a subject (like `WeatherStation`) should support.
    - `addObserver` and `removeObserver` are for managing the list of observers. Note that it accepts an `Observer` as an argument.
    - `notifyObservers` is for informing observers about changes.

        ```typescript
        import type { Observer } from "./observerInterface";

        export interface Subject {
          addObserver: (observer: Observer) => void;
          removeObserver: (observer: Observer) => void;
          notifyObservers: () => void;
        }
        ```

2. **Observer/Subscriber Interface:**

    - The `Observer` or the subscriber(just as in Youtube) interface defines a contract for objects that want to be notified about changes in the subject (`WeatherStation` in this case).
    - It includes a method `update` that concrete observers must implement to receive and handle updates.

        ```typescript
        export interface Observer{
            update : (weather : string) => void;
        }
        ```

3. **Concrete Subject(WeatherStation):**

    - `WeatherStation` is the concrete subject implementing the `Subject` interface.
    - It maintains a list of observers (`Observers[]`) and provides methods to manage this list.
    - `notifyObservers` iterates through the observers and calls their `update` method, passing the current weather.
    - `setWeather` method updates the weather and notifies observers of the change.

        ```typescript
        import type { Observer } from "../interfaces/observerInterface";
        import type { Subject } from "../interfaces/subjectInterface";
        
        export class WeatherStation implements Subject {
          private observers: Observer[];
          private weather: string;
        
          constructor() {
            this.observers = [];
            this.weather = "";
          }
        
          addObserver = (observer: Observer) => {
            this.observers.push(observer);
            console.log("Observer added:" + JSON.stringify(observer, null, 2) + "\n");
          };
        
          removeObserver = (observer: Observer) => {
            this.observers = this.observers.filter((obs) => obs !== observer);
            console.log("Observer removed:" + JSON.stringify(observer, null, 2) + "\n");
          };
        
          listObservers() {
            console.log("Observers: \n" + JSON.stringify(this.observers, null, 2));
          }
        
          notifyObservers = () => {
            this.observers.forEach((observer) => {
              observer.update(this.weather);
            });
          };
        
          setWeather(weather: string) {
            this.weather = weather;
            this.notifyObservers();
          }
        }
        ```

4. **Concrete Observers(PhoneDisplay, TvDisplay, WatchDisplay):**

    - `PhoneDisplay, TvDisplay, and WatchDisplay` is a concrete observer implementing the `Observer` interface.
    - It has a private field weather to store the latest weather.
    - The `update` method sets the new weather and calls the `display` method.
    - `display` prints the updated weather to the console.

        PhoneDisplay:

        ```typescript
        import type { Observer } from "../interfaces/observerInterface";

        export class PhoneDisplay implements Observer {
          private weather: string;
          private name: string;
        
          constructor() {
            this.weather = "";
            this.name = "Phone Display";
          }
        
          update = (weather: string) => {
            this.weather = weather;
            this.display();
          };
        
          display() {
            console.log("Phone display weather updated: " + this.weather + "\n");
          }
        }
        ```

        TvDisplay:

        ```typescript
        import type { Observer } from "../interfaces/observerInterface";
        
        export class TvDisplay implements Observer {
          private weather: string;
          private name: string;
        
          constructor() {
            this.weather = "";
            this.name = "TV Display";
          }
        
          update = (weather: string) => {
            this.weather = weather;
            this.display();
          };
        
          display() {
            console.log("TV display weather updated: " + this.weather + "\n");
          }
        }
        ```

        WatchDisplay:

        ```typescript
        import type { Observer } from "../interfaces/observerInterface";

        export class WatchDisplay implements Observer {
          private weather: string;
          private name: string;

          constructor() {
            this.weather = "";
            this.name = "Watch Display";
          }

          update = (weather: string) => {
            this.weather = weather;
            this.display();
          };

          display() {
            console.log("Watch display weather updated: " + this.weather + "\n");
          }
        }
        ```

5. **Usage:**

    - In the `index.ts`, a `WeatherStation` is created.
    - Three observers (`PhoneDisplay`, `TVDisplay` and `watchDisplay`) are registered with the weather station using the `addObserver` method.
    - The `setWeather` method simulates a weather change to `sunny`, `rainy`, and then `snowy`, triggering the `update` method in the observers every time the weather is changed through the `setWeather` method.
    - The output shows how the concrete observers display the updated weather information when the subject(weather) changes.

        ```typescript
        import { PhoneDisplay } from "./implementations/phoneDisplay";
        import { TvDisplay } from "./implementations/tvDisplay";
        import { WatchDisplay } from "./implementations/watchDisplay";
        import { WeatherStation } from "./implementations/weatherStation";

        const weatherStation: WeatherStation = new WeatherStation();

        const phoneDisplay: PhoneDisplay = new PhoneDisplay();
        const tvDisplay: TvDisplay = new TvDisplay();
        const watchDisplay: WatchDisplay = new WatchDisplay();

        weatherStation.addObserver(phoneDisplay);
        weatherStation.addObserver(tvDisplay);
        weatherStation.addObserver(watchDisplay);

        // Using error here so that the console color can change when logging happens
        console.error("Waiting for 1 second before continuing");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        weatherStation.listObservers();

        console.error("Waiting for 1 second before continuing");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulating weather change
        weatherStation.setWeather("sunny");

        console.error("Waiting for 1 second before continuing");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        weatherStation.setWeather("rainy");

        console.error("Waiting for 1 second before continuing");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        weatherStation.setWeather("snowy");

        console.error("Waiting for 1 second before continuing");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        weatherStation.removeObserver(phoneDisplay);
        weatherStation.listObservers();
        weatherStation.removeObserver(tvDisplay);
        weatherStation.listObservers();
        weatherStation.removeObserver(watchDisplay);

        console.error("Waiting for 1 second before continuing");
        await new Promise((resolve) => setTimeout(resolve, 1000));

        weatherStation.listObservers();
        ```

    - And this is the output:

        ```plaintext

        Observer added:{
          "weather": "",
          "name": "Phone Display"
        }

        Observer added:{
          "weather": "",
          "name": "TV Display"
        }

        Observer added:{
          "weather": "",
          "name": "Watch Display"
        }

        Waiting for 1 second before continuing
        Observers: 
        [
          {
            "weather": "",
            "name": "Phone Display"
          },
          {
            "weather": "",
            "name": "TV Display"
          },
          {
            "weather": "",
            "name": "Watch Display"
          }
        ]
        Waiting for 1 second before continuing
        Phone display weather updated: sunny

        TV display weather updated: sunny

        Watch display weather updated: sunny

        Waiting for 1 second before continuing
        Phone display weather updated: rainy

        TV display weather updated: rainy

        Watch display weather updated: rainy

        Waiting for 1 second before continuing
        Phone display weather updated: snowy

        TV display weather updated: snowy

        Watch display weather updated: snowy

        Waiting for 1 second before continuing
        Observer removed:{
          "weather": "snowy",
          "name": "Phone Display"
        }

        Observers: 
        [
          {
            "weather": "snowy",
            "name": "TV Display"
          },
          {
            "weather": "snowy",
            "name": "Watch Display"
          }
        ]
        Observer removed:{
          "weather": "snowy",
          "name": "TV Display"
        }

        Observers: 
        [
          {
            "weather": "snowy",
            "name": "Watch Display"
          }
        ]
        Observer removed:{
          "weather": "snowy",
          "name": "Watch Display"
        }

        Waiting for 1 second before continuing
        Observers: 
        []
        ```

## What is an observable in Angular?

In Angular, an **Observable** is a stream of events or data that happen asynchronously. It's an object that can emit one or more values over time. Observables are often returned from Angular methods, such as `http.get` and `myinputBox.valueChanges`. Here's a simple observable that emits 1, then 2, then 3, and then completes:

```typescript
import { of } from 'rxjs';
const numbers$ = of(1, 2, 3); // simple observable that emits three values
```

The `$` at the end of the observable name signifies that the variable is an observable "stream" of values.

An **Observer** in Angular is an entity that can subscribe to an Observable. When you subscribe to an Observable, you're essentially becoming an Observer. The Observer reacts to whatever item or sequence of items the Observable emits. This could be a stream of keystrokes, an HTTP response, or the ticks of an interval timer.

Here's how you can subscribe to an Observable:

```typescript
numbers$.subscribe(value => console.log(value));
```

In this case, the function `value => console.log(value)` is the Observer. It's a function that will be called whenever the Observable emits a new value.

Angular uses Observables extensively for event handling, asynchronous programming, and handling multiple values emitted over time. For example, the HTTP module uses Observables to handle AJAX requests and responses, and the Router and Forms modules use Observables to listen for and respond to user-input events.

Remember, Observables are not executed until a consumer subscribes to them. This is why you need to subscribe to an Observable to kick off the stream.

Take a look at the code below:

```typescript
of(10, 20, 30, "hello").subscribe({
  next: (value) => console.log("next:", value),
  error: (err) => console.log("error:", err),
  complete: () => console.log("the end"),
});
```

When an observer subscribes to an Observable/Subject, it gets three types of notifications:

1. **Next**: This is the most common type of notification. Whenever the Observable emits a new value, the `next` function is called with that value. In your code, `value => console.log('next:', value)` is the `next` function. So, for each value emitted by the Observable `of(10, 20, 30, "next")`, this function will be called, and it will log `next: 10`, `next: 20`, `next: 30`, and `next: "hello"` (**NB:** Observables can emit any type of value).

2. **Error**: If the Observable encounters an error while trying to emit values, it will call the `error` function. In your code, `err => console.log('error:', err)` is the `error` function. This function will be called if there's an error, and it will log the error message. In this case, since the Observable is just emitting static values, there's no chance of an error occurring.

3. **Complete**: When the Observable has finished emitting values, it will call the `complete` function to signal that it's done. In your code, `() => console.log('the end')` is the `complete` function. After the Observable has emitted `10`, `20`, `30`, and `"hello"`, it will call this function, and it will log `the end`.

Thus, when you subscribe to an Observable, you provide handlers for these three types of notifications: `next`, `error`, and `complete`. This allows you to handle new values, errors, and the completion of the Observable stream.

### Memory leaks in Observables

Observables in Angular can lead to memory leaks if not handled properly. This is because Observables do not destroy themselves after emitting values. They keep listening for new values until explicitly told to stop. If an Observable is not unsubscribed from, it continues to exist and consume memory, leading to a memory leak.

To mitigate this, you need to unsubscribe from Observables when they are no longer needed. This is typically done in the `ngOnDestroy` lifecycle hook of the component that subscribes to the Observable. Here's an example:

```typescript
import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';

@Component({
  template: `...`,
})
export class MyComponent implements OnInit, OnDestroy {
  private myObservable$: Observable<number>;
  private subscription: Subscription;

  ngOnInit() {
    this.myObservable$ = of(10, 20, 30);
    this.subscription = this.myObservable$.subscribe(value => console.log(value));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

In this example, `ngOnInit` subscribes to `myObservable$`, and `ngOnDestroy` unsubscribes from it. This ensures that the Observable is cleaned up when the component is destroyed, preventing memory leaks.

Another technique to avoid memory leaks is to use the `async` pipe. The `async` pipe automatically subscribes to the Observable, triggers Angular’s change detection when needed, and importantly, it automatically unsubscribes from the Observable when the component is destroyed. Here's how you can use it:

```html
<div> {{myObservable$ | async}} </div>
```

In this case, you don't need to manually subscribe or unsubscribe. The `async` pipe takes care of it for you. This can make your code more concise and less error-prone.

## Analyzing Angular observables

Now with our knowledge about the observable design pattern, we can say that Observables in angular is any attribute of a class that can be observed by other classes or attributes in the same class. This is a common pattern in Angular, where components can subscribe to observables to get notified of changes.

Observables are constructs to which you subscribe to, to get notified when a change occurs. They are used to handle asynchronous operations in Angular, such as HTTP requests, user input events, and timer events. Observables can emit multiple values over time, making them suitable for handling streams of data.

So  we can say that in this `ngOnInit` the component has subscribed to the stream of data emitted by the `route.params` observable. Whenever the route parameters change, the component will be notified, and it will update the `id` property accordingly.

```typescript
  ngOnInit() {
    this.route.params.subscribe({
      next: (params: Params) => {
        this.id = +params.id;
      },
      complete: () => {
        console.log('completed');
      },
      error: () => {
        console.log('error');
      },
    });
  }
```

But you can omit the `complete` and `error` states, by just returning a single callback function like this:

```typescript
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }
```

## Getting closer to the core of observables in Angular

Take a look at this code:

```typescript
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObservableSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.firstObservableSubscription = interval(1000).subscribe((count) => {
      console.log(count);
    });
  }

  ngOnDestroy() {
    this.firstObservableSubscription.unsubscribe();
  }
}

```

In Angular, creating observables, subscribing to them, and managing their lifecycle (especially unsubscribing to prevent memory leaks) is a common pattern, especially when dealing with asynchronous data streams. The code snippet above demonstrates this pattern using the RxJS library, which is a standard for reactive programming in Angular.

Here's a breakdown of how it works:

1. **Importing Required Modules**: First, you import the necessary modules from Angular and RxJS. In this case, `Component`, `OnDestroy`, and `OnInit` from Angular, and `interval` and `Subscription` from RxJS.

    ```typescript
    import { Component, OnDestroy, OnInit } from '@angular/core';
    import { interval, Subscription } from 'rxjs';
    ```

2. **Component Declaration**: You declare your component using the `@Component` decorator, specifying its selector, template URL, and style URLs.

    ```typescript
    @Component({
      selector: 'app-home',
      templateUrl: './home.component.html',
      styleUrls: ['./home.component.css'],
    })
    ```

3. **Implementing OnInit and OnDestroy**: Your component class implements `OnInit` and `OnDestroy` interfaces. These interfaces provide lifecycle hooks that Angular calls at specific points in the component's lifecycle.

    ```typescript
    export class HomeComponent implements OnInit, OnDestroy {
      private firstObservableSubscription: Subscription;
    ```

4. **Subscribing in ngOnInit**: In the `ngOnInit` lifecycle hook, you create an observable using `interval` and subscribe to it. The `interval` function creates an observable that emits a sequence of numbers at a specified interval (in this case, every 1000 milliseconds). You store the subscription in a private variable so you can unsubscribe later.

    ```typescript
    ngOnInit() {
      this.firstObservableSubscription = interval(1000).subscribe((count) => {
        console.log(count);
      });
    }
    ```

5. **Unsubscribing in ngOnDestroy**: In the `ngOnDestroy` lifecycle hook, you unsubscribe from the observable to prevent memory leaks. This is crucial because subscriptions can keep your application running even after the component is destroyed, leading to performance issues.

    ```typescript
    ngOnDestroy() {
      this.firstObservableSubscription.unsubscribe();
    }
    ```

This pattern ensures that your component subscribes to observables when it is initialized and unsubscribes when it is destroyed, managing the lifecycle of the subscription effectively.

There are basically 5 ways to subscribe to observables, and they are:

1. **Without Arguments**: If you call `subscribe` without any arguments, it will still work, but you won't be able to handle any values, errors, or completion notifications from the observable. This is not very useful in most cases.

    ```typescript
    observable.subscribe();
    ```

2. **With a Single Function Argument**: If you pass a single function as an argument to `subscribe`, that function will be treated as the `next` handler. This is a shorthand for subscribing to the observable and handling its emitted values.

    ```typescript
    observable.subscribe(value => console.log(value));
    ```

3. **With Two Function Arguments**: If you pass two functions as arguments to `subscribe`, the first function will be treated as the `next` handler, and the second function will be treated as the `error` handler. This allows you to handle both values and errors from the observable.

    ```typescript
    observable.subscribe(
      value => console.log(value),
      error => console.error(error)
    );
    ```

4. **With Three Function Arguments**: If you pass three functions as arguments to `subscribe`, the first function will be treated as the `next` handler, the second function will be treated as the `error` handler, and the third function will be treated as the `complete` handler. This allows you to handle values, errors, and completion notifications from the observable.

    ```typescript
    observable.subscribe(
      value => console.log(value),
      error => console.error(error),
      () => console.log('Observable completed')
    );
    ```

5. **With an Object Argument**: If you pass an object as an argument to `subscribe`, the object can have `next`, `error`, and `complete` properties, each of which can be a function. This is a more flexible way to subscribe to an observable, as it allows you to specify handlers for each type of notification.

    ```typescript
    observable.subscribe({
      next: value => console.log(value),
      error: error => console.error(error),
      complete: () => console.log('Observable completed')
    });
    ```

In summary, the `subscribe` method in RxJS is quite flexible and can be used in various ways to handle different types of notifications from observables. The behavior you've observed is consistent with how `subscribe` is designed to work, allowing for different levels of detail in how you handle observable notifications.

Also when you call `subscriber.error` or `subscriber.complete` within an Observable (`new Observable()`), it triggers the error handling mechanism/the complete mechanism of the Observable, and the Observable stops emitting any further values. This behavior is by design in RxJS, the library that provides Observables in Angular and many other JavaScript frameworks. The purpose of this design is to ensure that once an error occurs in the Observable sequence, no further processing is attempted, and the error is propagated to the subscribers.

Here's a breakdown of what happens when you use `subscriber.error` in an Observable:

1. **Error Handling**: When `subscriber.error` is called, it signals that an error has occurred in the Observable sequence. This is intended to stop the Observable from emitting any more values.

2. **Stopping the Observable**: The Observable stops emitting values immediately after `subscriber.error` is called. This means that any `subscriber.next` calls that come after `subscriber.error` will not be executed.

3. **Error Propagation**: The error passed to `subscriber.error` is propagated to the subscribers of the Observable. This allows subscribers to handle the error appropriately, for example, by logging the error, displaying an error message to the user, or performing some cleanup operations.

4. **No Further Processing**: Once an error is emitted, the Observable is considered to be in an "errored" state, and no further processing is attempted. This includes not calling any more `subscriber.next` or `subscriber.complete` handlers.

Here's an example to illustrate this behavior:

```typescript
const customIntervalObservable = new Observable((subscriber) => {
 subscriber.next(2);
 subscriber.error('An error occurred');
 subscriber.next(0); // This will not be called
 subscriber.next(1); // This will not be called
 subscriber.next(2); // This will not be called
});

customIntervalObservable.subscribe({
 next: (data) => {
    console.log(data); // This will only log "2"
 },
 error: (error) => {
    console.log(error); // This will log "An error occurred"
 },
 complete: () => {
    console.log('completed'); // This will not be called
 },
});
```

In this example, the Observable emits the value `2` and then immediately encounters an error. The `next` calls that follow the error are not executed, and the Observable stops emitting values. The error is then propagated to the subscriber, which logs the error message.

This design ensures that errors in Observable sequences are handled promptly and that no further processing is attempted after an error, preventing potential issues and making error handling more predictable and manageable.

**NB:** Note that an `Observable` is a unicast stream, meaning that each subscribed observer owns an independent execution of the Observable. This is in contrast to a multicast stream, where multiple observers share the same execution of the Observable. When an error occurs in a unicast stream, it only affects the observer that encountered the error, while the other observers continue to receive values. This is another reason why errors in Observables are handled in a way that stops the Observable from emitting further values.

If you look at the below example, each subscription receives the different values as observables developed as unicast by design.

```typescript
import {Observable} from 'rxjs';

let obs = new Observable<any>(observer=>{
   observer.next(Math.random());
})

obs.subscribe(res=>{
  console.log('subscription a :', res); //subscription a :0.2859800202682865
});

obs.subscribe(res=>{
  console.log('subscription b :', res); //subscription b :0.694302021731573
});
```

This could be weird if you are expecting the same values on both the subscription.

We can overcome this issue using **Subjects**. **Subjects is similar to event-emitter and it does not invoke for each subscription. Consider the below example.** Subjects are the true implementation of the observable design pattern we discussed earlier.

```typescript
import {Subject} from 'rxjs';

let obs = new Subject();

obs.subscribe(res=>{
  console.log('subscription a :', res); // subscription a : 0.91767565496093
});

obs.subscribe(res=>{
  console.log('subscription b :', res);// subscription b : 0.91767565496093
});

obs.next(Math.random());
```

## Building a custom observable in Angular

Custom `Observables` can be particularly useful when the standard patterns provided by RxJS, such as interval, from, or of, do not fit your needs.

Let's break down these standard patterns:

- interval: This is a function that creates an Observable that emits a sequence of numbers every specified interval of time. For example, you could use it to emit a number every second.
- from: This function turns an array, promise, or iterable into an Observable. This is useful when you have data that you want to process as an Observable.
- of: This function creates an Observable that emits the arguments you provide to it, then completes. This can be useful when you have a fixed set of values that you want to emit as an Observable.

However, there might be cases where these standard patterns do not cover your requirements. In such cases, you would need to create a custom Observable. This could involve defining your own way of producing values and handling subscriptions, which gives you the maximum amount of flexibility.

Creating a new Observable in RxJS involves using the `new Observable` constructor, which allows you to define custom behavior for the Observable. This is particularly useful when you need to create an Observable that doesn't fit the standard patterns provided by RxJS, such as `interval`, `from`, or `of`.

Here's a step-by-step guide on how to create a new Observable using the `new Observable` constructor:

1. **Import Observable**: First, ensure you have imported `Observable` from `rxjs`.

    ```typescript
    import { Observable } from 'rxjs';
    ```

2. **Create a New Observable**: Use the `new Observable` constructor to create a new Observable. The constructor takes a function as an argument, which itself takes a `Subscriber` object. The `Subscriber` object has methods like `next`, `error`, and `complete` that you can call to emit values, errors, or complete the Observable.

    ```typescript
    const myObservable = new Observable(subscriber => {
      // Custom logic here
    });
    ```

3. **Emitting Values**: To emit values, call the `next` method on the `Subscriber` object. You can call this method multiple times to emit multiple values.

    ```typescript
    const myObservable = new Observable(subscriber => {
      subscriber.next('Hello');
      subscriber.next('World');
    });
    ```

4. **Handling Errors**: If an error occurs, you can call the `error` method on the `Subscriber` object, passing the error as an argument. This will stop the Observable from emitting any further values.

    ```typescript
    const myObservable = new Observable(subscriber => {
      subscriber.next('Hello');
      subscriber.error(new Error('An error occurred'));
    });
    ```

5. **Completing the Observable**: To signal that the Observable has finished emitting values, call the `complete` method on the `Subscriber` object. This is optional and is typically used when you know the Observable will not emit any more values.

    ```typescript
    const myObservable = new Observable(subscriber => {
      subscriber.next('Hello');
      subscriber.next('World');
      subscriber.complete();
    });
    ```

6. **Subscribing to the Observable**: Finally, to start receiving values from the Observable, you need to subscribe to it. You can do this by calling the `subscribe` method on the Observable, passing an object with `next`, `error`, and `complete` methods, or by passing individual functions for each.

    ```typescript
    myObservable.subscribe({
      next: value => console.log(value),
      error: error => console.error(error),
      complete: () => console.log('Completed')
    });
    ```

Here's a complete example:

```typescript
import { Observable } from 'rxjs';

const myObservable = new Observable(subscriber => {
 subscriber.next('Hello');
 subscriber.next('World');
 subscriber.complete();
});

myObservable.subscribe({
 next: value => console.log(value),
 error: error => console.error(error),
 complete: () => console.log('Completed')
});
```

This example creates a simple Observable that emits two values, "Hello" and "World", and then completes. The subscriber logs each value and the completion message to the console.

### Components of the observable design pattern in Angular

The Observable design pattern is implemented using RxJS, a library for reactive programming using Observables. Let's break down the different parts of the Observable design pattern and see how they correspond to the code, note that we said earlier that there are 4 parts of an observable design pattern:

1. **Subject Interface**: In the context of RxJS, the `Subject` is a special type of Observable that allows values to be multicasted to many Observers. In RxJs we does not explicitly use a `Subject Interface`, but the `Observable` demonstrates the concept of an Observable that can be subscribed to by multiple observers.

2. **Observer Interface**: Just as the subject interface, over here too the rxjs library does not explicitly provide a way for us to do the object interface, but we can say that any argument passed to the subscribe method is an interface on it's own, albeit a concrete one. The Observer interface defines the methods that an observer must implement to receive notifications from the Observable. So basically the object passed to the `subscribe` method implements the Observer interface, defining how to handle the values emitted by the Observable.

3. **Subject Implementation**: The `Subject` implementation in RxJS is a concrete class that implements the Observable interfaces. It allows values to be multicasted to many Observers using the `next()` method of subscribers. RxJs does not directly use a `Subject`, but it demonstrates the creation of a custom Observable using the `Observable` constructor, which is a form of implementing the Observable interface:

   ```typescript
   const customIntervalObservable = new Observable((subscriber) => {
     let count = 0;
     setInterval(() => {
       subscriber.next(count);
       count++;
       if (count === 11) {
         subscriber.complete();
       }
     }, 1000);
   });
   ```

   This custom Observable acts as a Subject in the sense that it can emit values to its subscribers.

4. **One or More Observer Implementation**: This is where we implement the observer interface, thus what to do in the update method, just like what we did at first(check the first sub topic of this chapter). The object passed to the `subscribe` method is the implementation. This Observer listens to the values emitted by the Observable, handles errors, and reacts to the completion of the Observable. Here, the object passed to `subscribe` is the Observer, and it defines how to handle the values emitted by the Observable (`next`), any errors that occur (`error`), and when the Observable completes (`complete`). The Observer interface is implemented in the object passed to the `subscribe` method:

   ```typescript
   customIntervalObservable.subscribe({
     next: (data) => {
       this.observer = data;
       console.log(this.observer);
     },
     error: (error) => {
       console.log(error);
     },
     complete: () => {
       console.log('completed');
     },
   });
   ```

## Error and completion handling in an observer/subscriber

In RxJS, Observables can emit three types of notifications: `next`, `error`, and `complete`. These notifications are handled by the `next`, `error`, and `complete` methods of the Observer/Subscriber object passed to the `subscribe` method.

1. **Next Notification**: The `next` notification is used to emit a value from the Observable. This is the most common type of notification and is used to pass data from the Observable to the Observer. The `next` method of the Observer is called with the emitted value.

2. **Error Notification**: The `error` notification is used to signal that an error has occurred in the Observable sequence. When an error occurs, the `error` method of the Observer is called with the error object. After an error is emitted, the Observable stops emitting values, and no further processing is attempted.

3. **Complete Notification**: The `complete` notification is used to signal that the Observable has finished emitting values and will not emit any more values. When the Observable completes, the `complete` method of the Observer is called. This is typically used to perform cleanup operations or to signal that the Observable has completed its task.

Here's an example that demonstrates error and completion handling in Observables, note that the subscription must happen in the `ngOnInit` lifecycle hook and the unsubscription in the `ngOnDestroy` lifecycle hook to prevent memory leaks(we did not necessarily do that here):

```typescript
import { Observable } from 'rxjs';

const customObservable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.error(new Error('An error occurred'));
  subscriber.next(3); // This will not be called
  subscriber.complete(); // This will not be called
});

customObservable.subscribe({
  next: value => console.log(value),
  error: error => console.error(error),
  complete: () => console.log('Completed')
});

// Or you can use this shorthand syntax:
customObservable.subscribe(
  value => console.log(value),
  error => console.error(error),
  () => console.log('Completed')
);

// Or if you want to just listen to the next and error values:
customObservable.subscribe(
  value => console.log(value),
  error => console.error(error)
);

// Or if you want to just listen to the next values:
customObservable.subscribe(value => console.log(value));
```

Always note that the `subscriber.complete()` will never be called in this example because the `subscriber.error(new Error('An error occurred'))` was called before it, and the `subscriber.next(3)` will also not be called because the `subscriber.error(new Error('An error occurred'))` was called before it. When the error argument is called the Observable stops emitting values and the `complete` method is not called.

## Observable and You

Observables are a powerful tool in Angular for handling asynchronous operations and data streams. They allow you to work with data over time, handle events, and manage complex interactions in a reactive and efficient way. By understanding how Observables work and how to use them effectively, you can build more robust and responsive applications with an event-driven architecture.

## Understanding operators

Operators are functions that build on the observables foundation to enable sophisticated manipulation of asynchronous data streams. They allow you to transform, filter, combine, and create new observables from existing ones. Operators are the building blocks of reactive programming in Angular and are essential for working with observables effectively. Operators are between the subscribing to an observable and getting the data from the observable. They allow you to transform, filter, combine, and manipulate the data emitted by the observable before it reaches the subscriber.

There are many operators available in RxJS, and they can be categorized into different types based on their functionality:

1. **Creation Operators**: These operators are used to create new observables from scratch. Examples include `of`, `from`, `interval`, and `timer`.
2. **Transformation Operators**: These operators are used to transform the data emitted by an observable. Examples include `map`, `pluck`, `switchMap`, and `mergeMap`.
3. **Filtering Operators**: These operators are used to filter the data emitted by an observable based on certain criteria. Examples include `filter`, `take`, `skip`, and `distinct`.
4. **Combination Operators**: These operators are used to combine multiple observables into a single observable. Examples include `combineLatest`, `merge`, `concat`, and `zip`.
5. **Multicasting Operators**: These operators are used to share the execution of an observable among multiple subscribers. Examples include `share`, `publish`, and `multicast`.
6. **Error Handling Operators**: These operators are used to handle errors emitted by an observable. Examples include `catchError`, `retry`, and `throwError`.
7. **Utility Operators**: These operators are used for various utility functions, such as logging, timing, and debugging. Examples include `tap`, `delay`, and `finalize`.
8. **Conditional Operators**: These operators are used to conditionally emit values from an observable. Examples include `defaultIfEmpty`, `every`, and `find`.
9. **Mathematical and Aggregate Operators**: These operators are used to perform mathematical and aggregate operations on the data emitted by an observable. Examples include `reduce`, `count`, and `max`.
10. **Time-based Operators**: These operators are used to work with time and timing-related operations. Examples include `debounceTime`, `throttleTime`, and `timeout`.

This is in no form the exhaustive list of operators in RxJS, but it gives you an idea of the different types of operators available and the kinds of operations you can perform with them. By mastering these operators, you can work with observables more effectively and build more powerful and responsive applications in Angular. Some of the most used operators in RxJS are `map`, `filter`, `tap`, `switchMap`, `mergeMap`, `catchError`, `combineLatest`, `debounceTime`, and `distinctUntilChanged`.

Note that pipe is not an operator of RxJS rather it is a method that allows you to chain multiple operators together to create a pipeline of operations on an observable. The `pipe` method takes one or more operators as arguments and applies them sequentially to the observable. This allows you to perform complex transformations and manipulations on the data emitted by the observable in a clean and readable way.

Let's take a look at how you can use the `pipe` method to chain operators together:

```typescript
 customIntervalObservable
      .pipe(
        filter((data) => {
          if ((data as number) % 2 == 0) {
            return true;
          }

          return false;
        })
      )
      .pipe(map((data) => "Round " + data))
      .subscribe({
        next: (data) => {
          this.observer = data;
          console.log(this.observer);
        },
        error: (error) => {
          console.log(error);
          alert(error.message);
        },
        complete: () => {
          console.log("completed");
        },
      });
  }
```

The above code snippet demonstrates the use of RxJS operators within an Angular application to manipulate an observable stream. Let's break down the code to align it with the notes selected from the README.md file:

- **Transformation Operator**: The `pipe` method is used to chain multiple operators together. Inside the first `pipe`, the `filter` operator is used. Filtering operators are used to filter the data emitted by an observable based on certain criteria. Here, the `filter` operator is used to only allow even numbers to pass through the observable stream:

```typescript
filter((data) => {
  if ((data as number) % 2 == 0) {
    return true;
  }

  return false;
})
```

- **Transformation Operator (Continued)**: After filtering, another `pipe` is used, this time with the `map` operator. Transformation operators are used to transform the data emitted by an observable. The `map` operator is used here to prepend the string "Round " to each even number emitted by the observable:

```typescript
map((data) => "Round " + data)
```

- **Subscription**: Finally, the `subscribe` method is used to subscribe to the observable. This is where the actual data flow begins. The subscription object contains three callbacks: `next`, `error`, and `complete`.
  - `next`: This callback is executed for each value emitted by the observable. In this case, it updates `this.observer` with the transformed data and logs it to the console.
  - `error`: This callback is executed if an error occurs in the observable stream. It logs the error to the console and shows an alert with the error message.
  - `complete`: This callback is executed when the observable completes, indicating that no more values will be emitted. It logs "completed" to the console.

This code snippet demonstrates the use of creation, filtering, and transformation operators to manipulate an observable stream in an Angular application. It also shows how to subscribe to an observable and handle the data flow, errors, and completion of the observable.

## Subjects

Subjects are a special type of Observable that allows values to be multicasted to many Observers. While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable), Subjects are multicast.

> **Multicast vs Unicast:** In a multicast scenario, multiple Observers can subscribe to the same Subject, and the Subject will emit values to all of them (`new Subject()`). In contrast, in a unicast scenario, each Observer gets its own independent execution of the Observable, and values are not shared between Observers(`new Observables()`).

Take a look at the codes below:

user.service.ts:

```typescript
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  isActivated: boolean;
  isActivated$: Subject<boolean>;

  constructor() {
    this.isActivated$ = new Subject<boolean>();
    this.isActivated = false;
    this.isActivated$.next(this.isActivated);
  }

  onActivateChanged() {
    this.isActivated = !this.isActivated;
    console.log(this.isActivated)
    this.isActivated$.next(this.isActivated);
  }
}
```

app.component.ts:

```typescript
import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserService } from "./user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  public isActivated: boolean;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.isActivated$.subscribe({
      next: (data) => {
        this.isActivated = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log("completed");
      },
    });
  }

  ngOnDestroy(): void {
    this.userService.isActivated$.unsubscribe();
  }
}
```

app.component.html:

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <a routerLink="/">Home</a> |
      <a [routerLink]="['user', 1]"> User 1 </a>
      |
      <a [routerLink]="['user', 2]"> User 2 </a>
    </div>
  </div>
  <hr />
  <p *ngIf="isActivated">Activated</p>
  <hr />
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
```

Now let's us break it down.

In the `UserService` class, a `Subject` named `isActivated$` is declared. A `Subject` in RxJS is a special type of Observable that allows values to be multicasted to many Observers. Unlike Observables, Subjects maintain a registry of many listeners.

```typescript
isActivated$: Subject<boolean>;
```

In the constructor of `UserService`, `isActivated$` is initialized as a new `Subject` and the initial value of `isActivated` is emitted.

```typescript
constructor() {
  this.isActivated$ = new Subject<boolean>();
  this.isActivated = false;
  this.isActivated$.next(this.isActivated);
}
```

The `onActivateChanged` method toggles the value of `isActivated` and emits the new value through `isActivated$`.

```typescript
onActivateChanged() {
  this.isActivated = !this.isActivated;
  console.log(this.isActivated)
  this.isActivated$.next(this.isActivated);
}
```

In `AppComponent`, `isActivated$` is subscribed to in the `ngOnInit` method. This means that whenever a new value is emitted from `isActivated$`, the callback provided to `subscribe` will be executed, updating the value of `isActivated` in `AppComponent`.

```typescript
ngOnInit() {
  this.userService.isActivated$.subscribe({
    next: (data) => {
      this.isActivated = data;
    },
    error: (error) => {
      console.log(error);
    },
    complete: () => {
      console.log("completed");
    },
  });
}
```

Finally, in `ngOnDestroy`, the subscription to `isActivated$` is unsubscribed to prevent memory leaks.

```typescript
ngOnDestroy(): void {
  this.userService.isActivated$.unsubscribe();
}
```

In the HTML template of `AppComponent`, `isActivated` is used with the `*ngIf` directive to conditionally render a paragraph.

```html
<p *ngIf="isActivated">Activated</p>
```

This means that the paragraph will only be displayed when `isActivated` is `true`. The value of `isActivated` is updated whenever a new value is emitted from `isActivated$`, allowing for reactive updates to the UI based on the state of `isActivated`.

This pattern demonstrates a powerful aspect of reactive programming with RxJS: the ability to create a single source of truth (isActivated in UserService) that can be observed and reacted to by multiple parts of an application. This approach simplifies state management, especially in complex applications where state needs to be shared across many components or services.

In summary, `Subject` in RxJS is a powerful tool for multicasting values to multiple Observers and is used in this code to reactively update the state of the application. It's important to remember to unsubscribe from Subjects when they are no longer needed to prevent memory leaks. I hope this explanation helps! Let me know if you have any other questions.

### Cold(`new Observables()`) vs Hot(`new Subject()`) observables

In RxJS, the terms "hot" and "cold" are used to describe the behavior of Observables when it comes to producing values.

A **cold Observable** starts running upon subscription. It means the data is produced inside the Observable and the Observable is the sole producer of the data it emits. Each subscriber gets its own independent set of values. So, if you subscribe to a cold Observable multiple times, each subscription will get a new set of values. The values are "cold" because they're created on demand for each subscriber.

On the other hand, a **hot Observable** produces values even before subscription starts, and these values are shared among all subscribers. It doesn't matter when you subscribe to a hot Observable; you'll get all values that are emitted after you subscribe. The source of a hot Observable is typically outside of the Observable itself. Subjects in RxJS are hot because they share the same execution path among multiple subscribers.

Here's an analogy: think of a cold Observable as a movie streaming service like Netflix. Each subscriber (or viewer) can start, pause, rewind, or fast-forward their own movie independently. But a hot Observable is like a live concert broadcast on TV. The show goes on regardless of when and how many viewers start watching, and all viewers see the same show at the same time.

**Cold Observable:**

```typescript
import { Observable } from 'rxjs';

const cold$ = new Observable(subscriber => {
  subscriber.next(Math.random());
});

cold$.subscribe(value => console.log(`Subscriber 1: ${value}`));
cold$.subscribe(value => console.log(`Subscriber 2: ${value}`));

/**
 * Output:
 * Subscriber 1: 0.1419631721320307
 * Subscriber 2: 0.3762698451548453
 */
```

In this example, each subscriber to `cold$` will receive a different random number because the data is produced inside the Observable and each subscription gets its own set of values.

**Hot Observable (Subject):**

```typescript
import { Subject } from 'rxjs';

const hot$ = new Subject();

hot$.subscribe(value => console.log(`Subscriber 1: ${value}`));
hot$.subscribe(value => console.log(`Subscriber 2: ${value}`));

hot$.next(Math.random());

/**
 * Output:
 * Subscriber 1: 0.3877064098668468
 * Subscriber 2: 0.3877064098668468
 */
```

In this example, both subscribers to `hot$` will receive the same random number because the value is produced outside of the Observable and shared among all subscribers. In a real-world application, you might use a Subject to multicast events or values that are produced by user interactions, websockets, or other asynchronous APIs to multiple subscribers.
