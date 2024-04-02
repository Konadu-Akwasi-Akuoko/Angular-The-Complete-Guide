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

### Components of the Observer Design Pattern

1. **Subject (Observable) interface:** The subject is the object that is being observed. The subject maintains a list of observers (subscribers or listeners). It Provides methods to register and unregister observers dynamically and defines a method to notify observers of changes in its state
2. **Observer interface:** Observer defines an interface with an update method that concrete observers must implement and ensures a common or consistent way for concrete observers to receive updates from the subject(using the interface's method signature). Concrete observers implement this interface, allowing them to react to changes in the subject’s state(the one being watched).
3. **Concrete Subject:** The concrete subject is the object being observed, it implements the subject/observable interface(thus it provide concrete implementation for the register and unregister methods). It maintains a list of observers, notifies observers of changes in its state, and provides methods to register and unregister observers. For instance, if a weather station is the subject, specific weather stations in different locations would be concrete subjects which have implemented the subject/observable interface.
4. **Concrete Observer:** The concrete observer is the object that observes the subject. It implements the observer interface and defines the method to be called when the subject notifies it of a change in state, thus they react to changes in the subject’s state. Concrete observers register themselves with the subject to receive notifications. For instance, if a smart device is an observer, a specific smart device would be a concrete observer that has implemented the observer interface and registered itself with the weather station.

> **Observer Design Pattern Example:** Consider a scenario where you have a weather monitoring system. Different parts of your application need to be updated when the weather conditions change.
