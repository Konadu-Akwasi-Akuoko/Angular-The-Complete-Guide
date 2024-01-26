# Routing

In a single-page app, you change what the user sees by showing or hiding portions of the display that correspond to particular components, rather than going out to the server to get a new page. As users perform application tasks, they need to move between the different views that you have defined.

To handle the navigation from one view to the next, you use the Angular Router. The Router enables navigation by interpreting a browser URL as an instruction to change the view.

## Why do we need a router?

In Angular, a router is essential for several reasons:

1. **Single Page Application (SPA)**: Angular is primarily used to build SPAs. In an SPA, all necessary code (HTML, JavaScript, CSS) is retrieved with a single page load, or the necessary resources are dynamically loaded as needed, usually in response to user actions. The router allows us to manage navigation between different views without refreshing the page.

2. **Navigation**: The router enables navigation between different components in your application. Each route is associated with a component, and when the route is activated, the associated component is displayed.

3. **Deep Linking**: Deep linking allows users to link directly to specific content within your app. The router handles parsing the URL and loading the appropriate component.

4. **Code Organization**: The router helps keep your code organized. By associating routes with components, you can easily understand what component is responsible for what part of your app.

5. **Parameterized Routes**: The router supports parameterized routes, allowing you to pass data through the URL. This is useful for things like passing IDs to detail views.

6. **Nested Routes**: The router supports nested routes, which is useful for creating complex navigation structures.

7. **Route Guards**: Route guards are interfaces which can tell the router whether or not it should allow navigation to a requested route. They can be used to prevent unauthorized access to certain routes.

8. **Lazy Loading**: Lazy loading is a design pattern that delays the initialization of an object until it is needed. In Angular, you can use lazy loading to load JavaScript components asynchronously when a specific route is activated. This can significantly improve performance for larger apps.

## Setting up and loading routes

In Angular, routing is a process of navigating between different pages (or views) of an application. It's a key part of any single-page application (SPA), where all necessary code is loaded once and additional views are loaded as needed without a full page refresh.

1. **app.module.ts**: This is the main module file where you import and declare everything that your app is going to use. In your case, you've imported `RouterModule` and used `RouterModule.forRoot(appRoutes)` in the imports array. This tells Angular to use the routes defined in `appRoutes` for the root of the application.

```typescript
...
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ServersService } from './servers/servers.service';
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
   ...
  ],
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)],
  providers: [ServersService],
  bootstrap: [AppComponent],
})
export class AppModule {}

```

2. **app.routes.ts**: This file contains the routes of your application. Each route is an object with a `path` and a `component`. The `path` is the URL, and the `component` is what will be displayed when that URL is navigated to. For example, when you navigate to '/users', the `UsersComponent` will be displayed.

```typescript
import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { ServersComponent } from './servers/servers.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'servers',
    component: ServersComponent,
  },
];
```

3. **app.component.html**: This is the main HTML file of your application. The `routerLink` directive is used to link to routes. When you click on a link with a `routerLink`, the router navigates to the URL and displays the component associated with that URL. The `routerLinkActive` directive is used to apply CSS classes to an HTML element when a router link it's associated with is active.

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <ul class="nav nav-tabs">
        <li role="presentation" class="active">
          <a
            routerLink="/"
            routerLinkActive="active"
            ariaCurrentWhenActive="page"
            >Home</a
          >
        </li>
        <li role="presentation">
          <a
            routerLink="/servers"
            routerLinkActive="active"
            ariaCurrentWhenActive="page"
            >Servers</a
          >
        </li>
        <li role="presentation">
          <a
            routerLink="/users"
            routerLinkActive="active"
            ariaCurrentWhenActive="page"
            >Users</a
          >
        </li>
      </ul>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet />
    </div>
  </div>
</div>
```

4. **`<router-outlet />`**: This is a placeholder directive that Angular dynamically fills based on the current router state. When you navigate to a route, the component for that route is placed into the `<router-outlet>`.

```html
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet />
    </div>
  </div>
```

So, in your application, when you click on 'Home', 'Servers', or 'Users' in the navigation bar, the router will navigate to the corresponding path ('/', '/servers', or '/users'), and the associated component (`HomeComponent`, `ServersComponent`, or `UsersComponent`) will be displayed in place of `<router-outlet />`.

## Navigating with router links

```HTML
<a routerLink="/" routerLinkActive="active" ariaCurrentWhenActive="page">Home</a>
```

In Angular, routerLink, routerLinkActive, and ariaCurrentWhenActive are directives used for handling routing and accessibility on the client side, without contacting the server.

1. `routerLink`: This directive tells the router where to navigate when the link is clicked. In your example, `routerLink="/"`, it means that when the link is clicked, the router will navigate to the root route ("/").

2. `routerLinkActive`: This directive adds a CSS class to the element when the associated route is active. In your example, `routerLinkActive="active"`, it means that when the "/" route is active, the "active" CSS class will be added to the anchor tag. This is typically used to highlight the currently active link in a navigation menu.

3. `ariaCurrentWhenActive`: This is an accessibility attribute that indicates whether the current item in a set of items is the current active item. In your example, `ariaCurrentWhenActive="page"` means that when the "/" route is active, the `aria-current` attribute of the anchor tag will be set to "page". This helps screen readers understand which page is currently being viewed.

## Understanding navigation paths

In Angular's routing, the `routerLink` directive can be used with both absolute and relative paths, and they affect navigation differently:

1. **Absolute Paths**: An absolute path always refers to the root of the application. It starts with a forward slash (`/`). When you use an absolute path with `routerLink`, no matter where you are in the application, clicking the link will navigate to the specified path from the root. For example, `routerLink="/users"` will always navigate to the `/users` route, regardless of the current location in the app.

   ```html
   <a routerLink="/users">Users</a>
   ```

2. **Relative Paths**: A relative path does not start with a forward slash and is relative to the current route. When you use a relative path with `routerLink`, the navigation will be relative to the current URL in the browser's address bar. For example, if you are currently on `/users` and have a link with `routerLink="details"`, clicking the link will navigate to `/users/details`.

   ```html
   <a routerLink="details">User Details</a>
   ```

To use relative paths, you often need to provide additional information to the `RouterLink` directive to let it know what to be relative to. This is typically done by using the `relativeTo` property of the `ActivatedRoute` in the component class.

Here's an example of how you might use relative navigation in a component class:

```typescript
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-example',
  template: `
    <a [routerLink]="['./details']" [relativeTo]="route">User Details</a>
  `
})
export class ExampleComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}
}
```

In this example, the `routerLink` is set to navigate to `./details` relative to the current active route, which is provided by injecting `ActivatedRoute` into the constructor and then binding it to the `relativeTo` input of the `routerLink`. All in all we can say that Angular supports how we move around in Linux (something like `../ and even ./`).

## Styling active router links

```HTML
<li
  role="presentation"
  routerLinkActive="active"
  [routerLinkActiveOptions]="{ exact: true }">
  <a routerLink="/" ariaCurrentWhenActive="page">Home</a>
</li>
```

1. `routerLinkActive`: This directive adds a CSS class to the element when the associated route is active. In your example, `routerLinkActive="active"`, it means that when the "/" route is active, the "active" CSS class will be added to the anchor tag. This is typically used to highlight the currently active link in a navigation menu.

2. `routerLinkActiveOptions`: This directive allows you to configure the behavior of `routerLinkActive`. In your example, `[routerLinkActiveOptions]="{ exact: true }"` means that the "active" class will only be applied when the route is exactly matched. Without `{ exact: true }`, the "active" class would also be applied when the route is a child route. For example, without `{ exact: true }`, if the current route was "/users/1", the "active" class would still be applied because "/users" is a parent route of "/users/1". But with `{ exact: true }`, the "active" class would only be applied when the current route is exactly "/".

As for your second question, `routerLinkActive` and `routerLinkActiveOptions` are using property binding. Property binding in Angular is denoted by square brackets `[]`. Here, you're binding the `routerLinkActive` directive to the string "active", and the `routerLinkActiveOptions` directive to the object `{ exact: true }`. This is not string interpolation or event binding. String interpolation would look like `{{ expression }}`, and event binding would look like `(eventName)="statement"`.

## Navigating programmatically

You can use dependency injection and the Router service to navigate to routes programmatically. To do so you need to inject the `Router` service and use it to navigate to the other routes programmatically:

```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
 selector: 'app-home',
 templateUrl: './home.component.html',
 styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
 constructor(private router: Router) {}

 ngOnInit() {}

 onLoadServers() {
    this.router.navigate(['/servers']);
 }
}
```

In the `onLoadServers()` method, `this.router.navigate(['/servers']);` is used to navigate to the '/servers' route. The `navigate()` method of the `Router` service takes an array of commands that represent the segments of the target URL. In this case, `['/servers']` represents the '/servers' route.

This method is called when the "Load Servers" button is clicked in your `@home.component.html` file:

```html
<button (click)="onLoadServers()" class="btn btn-primary">Load Servers</button>
```

So, when the button is clicked, the `onLoadServers()` method is executed, and the application navigates to the '/servers' route.

## Using relatives path programmatically

You can also use relative paths with the `router.navigate()` function. To do this, you need to provide additional information to the `Router` service to let it know what to be relative to. This is typically done by using the `relativeTo` option of the `NavigationExtras` object that you pass to the `navigate()` method.

Here's an example of how you might use relative navigation:

```typescript
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
 selector: 'app-example',
 template: `
    <a (click)="goToDetails()">Go to User Details</a>
 `
})
export class ExampleComponent {
 constructor(private route: ActivatedRoute, private router: Router) {}

 goToDetails() {
    this.router.navigate(['details'], { relativeTo: this.route });
 }
}
```

In this example, the `goToDetails()` method navigates to the 'details' route relative to the current active route. The `relativeTo` option is set to `this.route`, which is an instance of `ActivatedRoute`. This tells the `Router` service to calculate the target URL based on the current active route.

Please note that the `relativeTo` option expects an instance of `ActivatedRoute`, not a string. So, you cannot use `relativeTo` with a string path like `'../details'`. Instead, you would need to navigate to the parent route first, and then navigate to the child route.

## Passing parameters to routes

In Angular, route parameters are defined in the route configuration. They are specified as part of the path in the route definition. Route parameters are prefixed with a colon `:`.

In your `@app.routes.ts` file, you have already set up route parameters for the `UserComponent` route:

```typescript
{
 path: 'users/:id/:name',
 component: UserComponent,
}
```

In this route definition, `:id` and `:name` are route parameters. They represent dynamic values that will be part of the actual URL. For example, if you navigate to `/users/1/John`, `1` will be the value of the `id` parameter and `John` will be the value of the `name` parameter.

These route parameters can be accessed in your `UserComponent` using the `ActivatedRoute` service. Here's an example:

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
 selector: 'app-user',
 templateUrl: './user.component.html',
 styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
 user: { id: number; name: string } = { id: 0, name: '' };

 constructor(private route: ActivatedRoute) {}

 ngOnInit() {
    this.user.id = Number(this.route.snapshot.paramMap.get('id'));
    this.user.name = this.route.snapshot.paramMap.get('name');
 }
}
```

In this example, `this.route.snapshot.paramMap.get('id')` and `this.route.snapshot.paramMap.get('name')` are used to get the values of the `id` and `name` route parameters.

## Fetching route parameters

In Angular, you can access route parameters in a component by injecting the `ActivatedRoute` service in the component's constructor. Then, you can use the `snapshot.paramMap.get()` method to get the value of a specific route parameter.

Here's an example of how you can do this in your `UsersComponent`:

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
 selector: 'app-users',
 templateUrl: './users.component.html',
 styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 users = [
    {
      id: 1,
      name: 'Max'
    },
    {
      id: 2,
      name: 'Anna'
    },
    {
      id: 3,
      name: 'Chris'
    }
 ];

 constructor(private route: ActivatedRoute) {}

 ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
 }
}
```

In this example, `this.route.snapshot.paramMap.get('id')` is used to get the value of the `id` route parameter. Replace `'id'` with the name of the route parameter you want to access.

Please note that this will only work if the `id` parameter is defined in your routing configuration. For example, in your `app.routes.ts` file, you might have something like this:

```typescript
{
 path: 'users/:id',
 component: UsersComponent,
}
```

In this case, `:id` is a route parameter, and its value can be accessed in the `UsersComponent` as shown above.

## Fetching route parameters reactively

The `route.params.subscribe()` function in Angular allows you to react to changes in route parameters. Whenever a route parameter changes, the callback function you provide to `subscribe()` will be executed.

Here's how you can use it in your `UsersComponent`:

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
 selector: 'app-users',
 templateUrl: './users.component.html',
 styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
 user: { id: number; name: string } = { id: 0, name: '' };
 
 users = [
    {
      id: 1,
      name: 'Max'
    },
    {
      id: 2,
      name: 'Anna'
    },
    {
      id: 3,
      name: 'Chris'
    }
 ];

 constructor(private route: ActivatedRoute) {}

 ngOnInit() {
    this.user.id = Number(this.route.snapshot.paramMap.get('id'));
    this.user.name = this.route.snapshot.paramMap.get('name');

    this.route.params.subscribe(params => {
        let id = params['id'];
        console.log(id);
        // You can now use the updated id to perform actions based on the new route parameter
   
        this.user.id = Number(params['id']);
        this.user.name = params['name'];
    });
 }
}
```

In this example, `this.route.params.subscribe()` is used to subscribe to changes in route parameters. The callback function takes a `params` object as an argument, which contains all the current route parameters. You can then use `params['id']` to get the value of the `id` route parameter.

Please note that this will only work if the `id` parameter is defined in your routing configuration. For example, in your `app.routes.ts` file, you might have something like this:

```typescript
{
 path: 'users/:id',
 component: UsersComponent,
}
```

In this case, `:id` is a route parameter, and its value can be accessed in the `UsersComponent` as shown above.

## An important note about observables

In Angular, you can use Observables to observe route parameters and automatically clean up when the component gets destroyed. Here's how you can do it in your `UsersComponent`:

```typescript
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute) {}

  user: { id: number; name: string } = { id: 0, name: '' };
  private paramSubscription: Subscription;

  ngOnInit() {
    this.user.id = Number(this.route.snapshot.paramMap.get('id'));
    this.user.name = this.route.snapshot.paramMap.get('name');

    this.paramSubscription = this.route.params.subscribe((params: Params) => {
      this.user.id = Number(params['id']);
      this.user.name = params['name'];
    });
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
```

In this example, `this.route.params.subscribe()` is used to subscribe to changes in route parameters. The subscription is stored in `this.paramSubscription`. When the component gets destroyed, the `ngOnDestroy()` lifecycle hook is called, and `this.paramSubscription.unsubscribe()` is used to cancel the subscription.

Please note that this will only work if the `id` parameter is defined in your routing configuration. For example, in your `app.routes.ts` file, you might have something like this:

```typescript
{
 path: 'users/:id',
 component: UsersComponent,
}
```

In this case, `:id` is a route parameter, and its value can be accessed in the `UsersComponent` as shown above.

Subscribing to route parameters allows your component to react to changes in those parameters. When a route parameter changes, the callback function you provide to `subscribe()` will be executed. This is useful when you want to perform some action based on the new value of the route parameter. For example, you might want to fetch data related to the new parameter value from a server.

Destroying the subscription when the component is destroyed is necessary to prevent memory leaks. When you subscribe to an Observable, you create a connection that remains open until you explicitly close it by calling `unsubscribe()`. If you don't do this, the connection stays open even when the component is no longer in use, which can lead to unnecessary network requests and consume memory. By calling `unsubscribe()` in the `ngOnDestroy()` lifecycle hook, you ensure that the connection is closed when the component is destroyed.

**NB:** For subscribing to routes with the `ActivatedRoute` service Angular automatically does the unsubscribing for us.

## Passing querying parameters and fragments

```html
      <a
        href="#"
        class="list-group-item"
        [routerLink]="['/servers', 5, 'edit']"
        [fragment]="'loading'"
        [queryParams]="{ allowEdit: 1 }"
      >
        {{ server.name }}
      </a>
```

In Angular, query parameters and fragments are part of the URL structure that provide additional information to the route. They are used to pass data to the route without changing the URL path.

**Query Parameters**: Query parameters are key-value pairs appended to the URL after a `?` symbol. They are used to filter or sort data, among other things. In your code, `[queryParams]="{ allowEdit: 1 }"` is setting a query parameter named `allowEdit` with a value of `1`. This means that the URL will look something like `/servers/5/edit?allowEdit=1`.

**Fragments**: Fragments are identifiers appended to the URL after a `#` symbol. They are used to navigate to a specific part of a webpage. In your code, `[fragment]="'loading'"` is setting a fragment named `loading`. This means that the URL will look something like `/servers/5/edit#loading`.

To create query parameters and fragments in Angular, you can use the `routerLink` directive along with the `queryParams` and `fragment` properties. Here's an example:

```html
<a
 routerLink="/path"
 [queryParams]="{ param1: 'value1', param2: 'value2' }"
 fragment="section1"
>
 Link Text
</a>
```

In this example, clicking the link will navigate to `/path?param1=value1&param2=value2#section1`.

In Angular, you can programmatically navigate to a route with query parameters and fragments using the `Router` service's `navigate` method.

Here's how you can modify your `onLoadServers` method in `@home.component.ts` to include query parameters and fragments:

```typescript
onLoadServers(id: number) {
 this.router.navigate(['/servers', id, 'edit'], {
    queryParams: { allowEdit: '1' },
    fragment: 'loading',
 });
}
```

In this code:

- `'/servers'` is the base path of the route.
- `id` is a route parameter.
- `'edit'` is another segment of the route.
- `{ allowEdit: '1' }` is an object representing the query parameters.
- `'loading'` is the fragment.

When this method is called, it will navigate to a URL like `/servers/{id}/edit?allowEdit=1#loading`, where `{id}` is replaced with the actual `id` passed to the method.

## Retrieving query parameters and fragments

In Angular, you can retrieve query parameters and fragments using the `ActivatedRoute` service.

Here's how you can modify your `ngOnInit` method in `@edit-server.component.ts` to retrieve query parameters and fragments:

```typescript
ngOnInit() {
 // Subscribe to query params and fragment changes
 this.route.queryParams.subscribe(params => {
    console.log('Query Params: ', params);
 });

 this.route.fragment.subscribe(fragment => {
    console.log('Fragment: ', fragment);
 });

 // Get initial values, this won't update when the query params or fragments change
 const initialParams = this.route.snapshot.queryParams;
 const initialFragment = this.route.snapshot.fragment;

 console.log('Initial Query Params: ', initialParams);
 console.log('Initial Fragment: ', initialFragment);

 // Rest of your code...
}
```

In this code:

- `this.route.queryParams.subscribe()` subscribes to changes in the query parameters. Whenever the query parameters change, the callback function logs the new parameters.
- `this.route.fragment.subscribe()` subscribes to changes in the fragment. Whenever the fragment changes, the callback function logs the new fragment.
- `this.route.snapshot.queryParams` gets the initial query parameters.
- `this.route.snapshot.fragment` gets the initial fragment.

Remember to unsubscribe from these observables when the component is destroyed to prevent memory leaks.

## Setting up Child(Nested) routes

In Angular, nested routes are defined by specifying child routes in the parent route's configuration. Each child route has its own path and component.

Looking at your `@app.routes.ts` file, you already have nested routes defined for the `UsersComponent`:

```typescript
{
 path: 'users',
 component: UsersComponent,
 children: [
    {
      path: ':id/:name',
      component: UserComponent,
    },
 ],
}
```

In this configuration, `UserComponent` is a child route of `UsersComponent`. The `:id/:name` path indicates that this route expects two parameters: `id` and `name`.

To navigate to this nested route, you would use a `routerLink` like this:

```html
<a [routerLink]="['/users', userId, userName]">Go to user</a>
```

Where `userId` and `userName` are variables containing the ID and name of the user you want to navigate to.

In Angular, `<router-outlet>` is a directive that acts as a placeholder for the component that should be loaded based on the current route. When you define child routes, the `<router-outlet>` directive in the parent component's template will display the component associated with the active child route.

In your `@users.component.html` file, you have a `<router-outlet>` directive:

```html
<router-outlet></router-outlet>
```

This directive will display the component associated with the active child route under the `UsersComponent`. For example, if the current route is `/users/1/John`, the `UserComponent` will be displayed because it matches the child route definition in `@app.routes.ts`.

The `UserComponent` will receive the `id` and `name` parameters from the route, as shown in your `@user.component.ts` file:

```typescript
this.user.id = Number(this.route.snapshot.paramMap.get('id'));
this.user.name = this.route.snapshot.paramMap.get('name');
```

So, when you navigate to `/users/1/John`, the `UserComponent` will be displayed in the `<router-outlet>` of the `UsersComponent`, and the `UserComponent` will have access to the `id` and `name` parameters from the route.

## Configuring the handling of route parameters

In Angular, you can preserve or merge route parameters when navigating to a different route by using the `NavigationExtras` object in the `navigate` method.

The `NavigationExtras` object has several properties that control how the navigation occurs. One of these properties is `queryParamsHandling`, which controls how the query parameters are handled during navigation.

There are three possible values for `queryParamsHandling`:

- `'merge'`: Merges the current query params with the ones provided.
- `'preserve'`: Preserves the current query params.

In your case, you want to preserve the current query parameters when navigating to the 'edit' route. Here's how you can do it:

```typescript
onEditClick() {
 this.router.navigate(['edit'], { 
    relativeTo: this.route,
    queryParamsHandling: 'preserve' 
 });
}
```

This code will navigate to the 'edit' route while preserving the current query parameters.

Please note that the `relativeTo` property is used to create a relative link. It tells the router to calculate the target URL based on the current route. In this case, it means that the 'edit' route is a child route of the current route.

## Redirecting and wildcard routes

In Angular, redirection and wildcard routes are used to handle unknown routes and redirect users to specific routes.

1. **Redirection**: Redirection is done using the `redirectTo` property in the route configuration. When a user tries to navigate to a route that matches the path specified in the `path` property, they are automatically redirected to the route specified in the `redirectTo` property.

   In your `app.routes.ts` file, there is a redirection rule defined as follows:

   ```typescript
   { path: 'not-found', component: PageNotFoundComponent },
   { path: '**', redirectTo: 'not-found' },
   ```

   This means that if a user tries to navigate to a route that doesn't match any of the defined routes, they will be redirected to the 'not-found' route, which displays the `PageNotFoundComponent`.

2. **Wildcard Routes**: Wildcard routes are used to catch all unmatched routes. They are defined using the `**` path. In your `app.routes.ts` file, the wildcard route is defined as follows:

   ```typescript
   { path: '**', redirectTo: 'not-found' },
   ```

   This means that if a user tries to navigate to a route that doesn't match any of the defined routes, they will be redirected to the 'not-found' route.

So, in summary, redirection and wildcard routes are used together to handle unknown routes and redirect users to a specific route (in this case, the 'not-found' route).

## Important: Redirection Path Matching

In Angular, routes are matched by prefix by default. This means that if you define a route with an empty path (`''`), it will match any URL, causing a redirection loop. This is because every URL starts with an empty string.

For example, consider the following route definition:

```typescript
{ path: '', redirectTo: '/somewhere-else' }
```

With this configuration, if you navigate to any URL in your application, you will always be redirected to '/somewhere-else'. This is because the empty string is a prefix of every URL.

However, this is usually not what you want. You typically want to match the exact path, not just any path that starts with a certain string. To do this, you can change the matching strategy to 'full' using the `pathMatch` property:

```typescript
{ path: '', redirectTo: '/somewhere-else', pathMatch: 'full' }
```

Now, the route will only match if the full path is an empty string. So, if you navigate to '/somewhere-else', you won't be redirected again, because the full path is not an empty string. But if you navigate to any other URL, you will still be redirected to '/somewhere-else', because the full path is an empty string.

In summary, the `pathMatch` property allows you to control whether a route should match the full path or just a prefix. By setting `pathMatch` to 'full', you can prevent redirection loops caused by matching every URL.

## Outsourcing the route configuration

Creating a separate module for routes in Angular involves creating a new Angular module and defining the routes in that module. Here's how you can do it:

1. First, generate a new module using the Angular CLI command `ng generate module`. Let's call it `AppRoutingModule`.

   ```bash
   ng generate module app-routing
   ```

2. Next, define your routes in the `AppRoutingModule`. Create a constant array of routes and pass it to the `RouterModule.forRoot()` method. This method returns a module that contains all the directives and services needed for routing.

   ```typescript
   import { RouterModule, Routes } from '@angular/router';
   import { HomeComponent } from './home/home.component';
   import { ServersComponent } from './servers/servers.component';
   import { UserComponent } from './users/user/user.component';
   import { UsersComponent } from './users/users.component';
   import { EditServerComponent } from './servers/edit-server/edit-server.component';
   import { ServerComponent } from './servers/server/server.component';
   import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

   const appRoutes: Routes = [
     { path: '', component: HomeComponent },
     { path: 'users', component: UsersComponent, children: [
       { path: ':id/:name', component: UserComponent },
     ]},
     { path: 'servers', component: ServersComponent, children: [
       { path: ':id', component: ServerComponent },
       { path: ':id/edit', component: EditServerComponent },
     ]},
     { path: 'not-found', component: PageNotFoundComponent },
     { path: '**', redirectTo: 'not-found' },
   ];

   @NgModule({
     imports: [RouterModule.forRoot(appRoutes)],
     exports: [RouterModule],
   })
   export class AppRoutingModule {}
   ```

3. Finally, import the `AppRoutingModule` in your `AppModule`.

   ```typescript
   import { AppRoutingModule } from './app-routing.module';

   @NgModule({
     imports: [BrowserModule, FormsModule, AppRoutingModule],
     declarations: [AppComponent, HomeComponent, UsersComponent, ServersComponent, UserComponent, EditServerComponent, ServerComponent, PageNotFoundComponent],
     bootstrap: [AppComponent],
   })
   export class AppModule {}
   ```

This way, you have separated the routing logic into its own module, making your code cleaner and easier to maintain.

The `@NgModule` decorator is used to define a module in Angular. A module is a way to group together related components, directives, pipes, and services that are specific to an application domain or a workflow.

Here's what the `@NgModule` decorator does:

- **Declarations**: This is where you declare which components belong to this module. Declaring components makes them available for use within the templates of other components that belong to this module.

- **Imports**: This is where you import other modules that export components, directives, or pipes that you want to use in this module.

- **Providers**: This is where you define the services that this module contributes to the global collection of services; they become accessible in all parts of the app.

- **Exports**: This is where you define the subset of declarations that should be visible and usable in the component templates of other modules.

- **Bootstrap**: This is where you define the root component that Angular creates and inserts into the index.html host web page.

In the context of your `AppRoutingModule`, the `@NgModule` decorator is used to define a module that handles routing. It imports the `RouterModule` and exports it so that it can be used in other modules. The `RouterModule.forRoot(appRoutes)` method is used to provide the router service and configure the routes.

## An introduction to guards

In Angular, Guards are interfaces that tell the router whether or not it should allow navigation to a requested route. They make decisions based on the current state of the application and the destination of the navigation request.

There are several types of guards in Angular:

1. **CanActivate**: Decides if a route can be activated.
2. **CanActivateChild**: Decides if children routes of a route can be activated.
3. **CanDeactivate**: Decides if a route can be deactivated.
4. **Resolve**: Performs route data resolution before the route is loaded.
5. **CanLoad**: Decides if a module can be loaded lazily.

Each guard is an interface that you can implement to perform a check. If the check passes, the navigation continues. If it fails, the navigation is cancelled.

For example, you might have a `CanActivate` guard that checks if a user is authenticated before allowing them to navigate to a protected route. If the user is not authenticated, the guard would return false, and the navigation would be cancelled.

## Protecting routes on `canActivate`

In Angular, you can use the `canActivate` method to protect routes and ensure that only authenticated users can access certain parts of your application. This is done by creating a guard service that implements the `CanActivate` interface.

Here's how you can do it:

1. **Create a Guard Service**

First, you need to create a guard service. This service will implement the `CanActivate` interface, which requires a `canActivate` method. This method will determine whether a route can be activated based on some condition.

In your case, you already have an `AuthGuard` service defined in the `auth-guard.service.ts` file. This service has a `canActivate` method that checks if the user is authenticated by calling the `isAuthenticated` method from the `AuthService`.

```typescript
@Injectable({
 providedIn: 'root',
})
export class AuthGuard implements CanActivate {
 constructor(private router: Router, private authService: AuthService) {}
 canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated().then((authenticated: boolean) => {
      if (authenticated) {
        return true;
      } else {
        this.router.navigate(['/']);
      }
    });
 }
}
```

And here is the code for the `AuthService` that we are using in the  `AuthGuard`:

```TypeScript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;

  isAuthenticated(): Promise<boolean> {
    const promise: Promise<boolean> = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 300);
    });
    return promise;
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
```

2. **Use the Guard in Your Routes**

Next, you need to use this guard in your routes. This is done in the `app-routing.module.ts` file. You can apply the guard to a route by adding it to the `canActivate` array in the route definition.

In your case, you have applied the `AuthGuard` to the 'servers' route. This means that the 'servers' route can only be activated if the `canActivate` method of the `AuthGuard` returns `true`.

```typescript
{
 path: 'servers',
 component: ServersComponent,
 canActivate: [AuthGuard],
 children: [
    {
      path: ':id',
      component: ServerComponent,
    },
    {
      path: ':id/edit',
      component: EditServerComponent,
    },
 ],
}
```

With this setup, when a user tries to navigate to the 'servers' route, the `AuthGuard`'s `canActivate` method will be called. If the user is authenticated, the route will be activated. If the user is not authenticated, they will be redirected to the root route ('/').
