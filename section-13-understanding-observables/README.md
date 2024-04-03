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

In Angular, an **Observable** is a stream of events or data that happen asynchronously. It's an object that can emit one or more values over time¹. Observables are often returned from Angular methods, such as `http.get` and `myinputBox.valueChanges`. Here's a simple observable that emits 1, then 2, then 3, and then completes:

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
