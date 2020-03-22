---
type: blog
date: 2019-10-20
slug: /architecting-http-clients-vue-js-network-layer
tags:
- Vue
- Axios
- Frontend
- Engineering
- Architecting
title: "Architecting HTTP clients in Vue.js applications for efficient network communication"
description: The network layer of a Vue.js application is the entry point of all the external data into your application. HTTP clients, which makes this possible need to be designed to be efficient and should be able to handle all the edge cases in communicating with external APIs.
cover_image: ./cover.png
published: true
---

Modern web apps highly rely on network communication with API servers and external services. From real-time data to static assets, everything is done through the network connection. It is important to design the network interface layer or the **HTTP client** which helps your application to call the API endpoints to be efficient and robust. In this article we'll discuss ways to design the HTTP clients and making network requests in your Vue.js application, considering some of the best practices and techniques.

We'll look into the following concepts in detail and how to implement them in our application. I prefer using [Axios](https://github.com/axios/axios) since it gives more flexibility, control, and has an exceptional browser and node.js support.

1. Creating HTTP Clients using axios instances
2. Structuring your API endpoints
3. Making network requests inside Vuex actions
4. Managing Auth Credentials using interceptors
5. Handling network errors and logging
6. Caching and Throttling

_Before we start, the code snippets below are written keeping Vue.js developers in mind. But, these can also be used for React or any other frontend library/framework._

This is the second part of the "Architecting Vue application" series. You can find the first part here where I talk about how to [Architect Vuex store for large-scale Vue.js applications](https://haxzie.com/architecting-vuex-store-large-scale-vue-application).

<hr/>


## 1. Creating HTTP Clients using axios instances
Axios provides out of the box support for having a persistent configuration for all of our API calls using axios instances. We'll be using axios instances as HTTP clients in our application with our configurations. If you are working on a large scale application, it is possible that your application needs to communicate with different API endpoints. In this case, we might need to create multiple axios instances, with its own configuration and separate them out to individual files.

**Install axios in your project**
```javascript
$ npm install --save axios
```

**Import axios into your project**

Considering best practices, it is recommended to add API URLs into `.env` files while developing large scale applications. In Vue.js applications, to be able to access the **env** variables inside your project, we need to prefix it as `VUE_APP_`. So, if you want to save **BASE_URL**, create a .env file in the root of your project directory and add the following line.
```shell
VUE_APP_BASE_URL=https://myApiServerUrl.com
```
Once we have our environment variables in place, we can retrieve them while creating axios instances. We can additionally pass all our configuration into this instance, including headers and use this instance to create HTTP requests.
```javascript 
import axios from axios;

const httpClient = axios.create({
    baseUrl: process.env.VUE_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        // anything you want to add to the headers
    }
});

export default httpClient;
```
One more thing to keep in mind, Axios by default has the timeout set to **0**, which means no timeout. But in most cases, we need to set request timeouts in our application along with a retry period. We will discuss how to retry a failed request in the below sections but you can change the default timeout of our httpClient while creating it.
```javascript
const httpClient = axios.create({
    baseUrl: process.env.VUE_APP_BASE_URL,
    timeout: 1000, // indicates, 1000ms ie. 1 second
    headers: {
        "Content-Type": "application/json",
    }
});
```

<hr/>

## 2. Structuring your API endpoints
As per REST design principles, most of our endpoints might have CURD operations associated with it. So, grouping together the endpoint with all it's request methods is one way to organize your API calls. We can import the required HTTP-client and export all the required requests as methods. Here's an example of grouping all the requests related to `Users` into a single file. 

```javascript
import httpClient from './httpClient';

const END_POINT = '/users';


const getAllUsers = () => httpClient.get(END_POINT);

// you can pass arguments to use as request parameters/data
const getUser = (user_id) => httpClient.get(END_POINT, { user_id });
// maybe more than one..
const createUser = (username, password) => httpClient.post(END_POINT, { username, password });

export {
    getAllUsers,
    getUser,
    createUser
}
```
We can follow a simple directory structure for storing all these files.
```shell
api/
  ├── httpClient.js  --> HTTP Client with our configs
  ├── users.api.js
  ├── posts.api.js
  └── comments.api.js
```
And we can use them in our Vue.js components and Vuex store by simply importing them.
```javascript
import { getAllUsers, getUser } from '@/api/users.api';
```

<hr/>

## 3. Making network requests inside Vuex actions
Moving all the business logic into Vuex store, including all of your network requests makes the view components independent. We can use actions in our store to fetch the data and store it in the state object. Vuex actions are synchronous by default, but the only way to know if an action is complete is by making your actions async or returning a promise. We can commit the data to the store through mutations using actions. Here's an example of a store module with actions, which fetches the data and commits to the store.

```javascript
/*
*   store/modules/users.module.js
*/

// import the api endpoints
import { getAllUsers } from "@/api/users.api"

const state = {
    users: []
}

const getters = {
    getUsers(state) {
        return state.users;
    }
}

const actions = {
    async fetchUsers({ commit }) {
            try {
                const response = await getAllUsers();
                commit('SET_USERS', response.data);
            } catch (error) {
                // handle the error here
            }    
        });
    }
}

const mutations = {
    SET_USERS(state, data) {
        state.users = data;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
```
In our Vue.js component, we can first check the store if there are any data and avoid additional network calls. Or, if there aren't any data, we can use actions to fetch the data.
```javascript
<template>
    <!-- Your template here -->
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    data() {
        return {
            isLoading: false;
        }
    },
    computed: {
        ...mapGetters('Users', ['getUsers'])
    },
    methods: {
        ...mapActions('Users', ['fetchUsers'])
    },
    async mounted(): {
        // Make network request if the data is empty
        if ( this.getUsers.length === 0 ) {
            // set loading screen
            this.isLoading = true;
            await this.fetchUsers();
            this.isLoading = false;
        }
    }
}
</script>
```
<hr/>

## 4. Managing Auth Credentials using interceptors
Creating interceptors to inject headers is an easy way to secure your requests with Auth credentials. If you are building an application with user login, we can use interceptors to inject Auth token into the headers of each request. In our `httpClient.js` file we can add the following code to create request interceptors.

```javascript
import axios from axios;

const httpClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 5000
});

const getAuthToken = () => localStorage.getItem('token');

const authInterceptor = (config) => {
    config.headers['Authorization'] = getAuthToken();
    return config;
}

httpClient.interceptors.request.use(authInterceptor);

export default httpClient;
```

<hr/>

## 5. Handling network errors and logging
Is it easy as `response.status === 500` in every request? It's not ideal to check the status and logging these errors in every network request we make inside our actions. Instead, axios offer abilities to intercept the error responses, which is a perfect spot to find errors, log or show a cute notification to the user saying the server effed up. We can also use this to log-out the user from your application if the requests aren't authorized or if the server informs of an expired session.

In the below example, I am using [vue-notifications](https://github.com/euvl/vue-notification) to show tiny notifications on the screen

```javascript
// interceptor to catch errors
const errorInterceptor = error => {
    // all the error responses
    switch(error.response.status) {
        case 400:
            console.error(error.response.status, error.message);
            notify.warn('Nothing to display','Data Not Found');
            break;

        case 401: // authentication error, logout the user
            notify.warn( 'Please login again', 'Session Expired');
            localStorage.removeItem('token');
            router.push('/auth');
            break;

        default:
            console.error(error.response.status, error.message);
            notify.error('Server Error');

    }
    return Promise.reject(error);
}

// Interceptor for responses
const responseInterceptor = response => {
    switch(response.status) {
        case 200: 
            // yay!
            break;
        // any other cases
        default:
            // default case
    }

    return response;
}

httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

```

<hr/>

## 6. Caching and Throttling
Axios adapters provide abilities to add superpowers into your HttpClient. Custom adapters are a clean way to enhance network communication in your application using caching and throttling. We'll be using [axios-extensions](https://github.com/kuitos/axios-extensions) to attach caching and throttling adapters to our httpClient.

_Note that caching from client side is not recommended because your server has more knowledge on when the data changes. It is better to set the cache headers to tell the browser what caching strategy to use. You can follow the below examples, if you still want to use caching from the client side._

Install axios-extensions
```shell
$ npm install --save axios-extensions
```
### Caching
```javascript
import axios from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';

const cacheConfig = {
    enabledByDefault: false, 
    cacheFlag: 'useCache'
}

const httpClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
        'Cache-Control': 'no-cache'
    },
    adapter: cacheAdapterEnhancer(axios.defaults.adapter, cacheConfig);
})
```

Once we have set up the cache adapter, we can config each request to be cached after it's first request. In our file, where we defined the end points we can pass an additional parameter indicating that the response should be cached.
```javascript
const getUsers = () => httpClient.get('/users', { useCahe: true });
```
All the subsequent calls after the first call will be responded from the cache.
```javascript
getUsers(); // actual network request and response gets cached
getUsers(); // from cache
getUsers(); // from cache
```

### Throttling
In our use case, throttling means limiting the number of requests made in a particular amount of time. In large scale applications where each request to the server amounts to a larger cost of computing, caching is one way to achieve throttling. 

What if there is new data coming in every once and then? In that case, we can use throttling to respond from cache for a limited time and then make an actual request after the specified time period. [Axios-extensions](https://github.com/kuitos/axios-extensions) comes with a **throttleAdapterEnhancer** which can be used to throttle the network request in our application. If we are using throttling, we can avoid using a persistent cache.
 
_keep in mind it is not recommended to use throttling for time-sensitive data. If your data changes quite often, your server is the only entity that knows about the data. Use cache headers instead to let the browser know about what caching strategy to use._

```javascript
import axios from 'axios';
import { throttleAdapterEnhancer } from 'axios-extensions';

const throttleConfig = {
    threshold: 2*1000 // 2 seconds
}

const httpClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    adapter: throttleAdapterEnhancer(axios.defaults.adapter, throttleConfig)
});

export default httpClient;
```

If we have set up throttling, Same requests made within the threshold period will be responded from the cache. Only real request is made after the threshold period.
```javascript
getUsers(); // actual request
getUsers(); // responds from cache
getUsers(); // responds from cache


setTimeout(() => {
    getUsers(); // threshold period passed, actual request.
}, 2*1000);
```
<hr/>

Thanks for reading this article 💖. Liked the article? have some feedback or suggestions? leave a like and a comment. This will help me understand better and write more amazing articles for you 🙂.

## What's next?
In my upcoming posts, we'll discuss more Architecting large scale Vue.js applications in terms of performance and your productivity.
