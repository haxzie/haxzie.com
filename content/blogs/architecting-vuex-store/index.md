---
date: 2019-10-13
slug: /architecting-vuex-store-large-scale-vue-application
tags:
- Vue
- Frontend
- Engineering
- Architecting
title: "Architecting Vuex store for large scale Vue.js applications"
description: At the heart of all large scale Vue.js application lies the store which holds all its data. The Vuex store in a Vue.js application acts a a single source of truth which provides great performance and reactivity out of the box.
cover_image: ./cover.png
published: false
---

At the heart of all large scale Vue.js application lies the store which holds all its data. The Vuex store in a Vue.js application acts a a single source of truth which provides great performance and reactivity out of the box. Vuex stores gets cluttered with growing complexity of the applications. 

In this blog post, we'll discuss some of the best practices and tips to architect state management in a large scale Vue.js application. We'll cover the following 5 concepts to help architect your store better.

1. Structuring the store
2. Modularizing the store
3. Auto importing modules
4. Resetting module state

## 1. Structuring the store
A Vuex store contains 4 main components:
1. The state object
2. Getter functions
3. Actions
4. Mutations

If you are not yet familiar with these 4 concepts, here's a quick tear down of the above components. The state object holds the data of your store. The Getter functions are reactive and helps you to access these state objects outside the store. Mutations as the name suggests are used to modify/mutate your store object. Actions are quite similar to mutations, but instead of mutating the state, Actions commit mutations. Actions can contain any arbitrary asynchronous code or business logic.

Vuex recommends the state object should only be mutated inside the Mutation functions. It is also recommends not to run any heavy or blocking code inside the Mutation functions since it's synchronous in nature. Instead, we should use Actions which is recommended to be asynchronous to carry out all the heavy load or make network request and commit mutations. Actions are also the best place to keep your business logic and data processing logic, Since it can store the data back to the store or to retrieve the data directly into your Vue components.

It is highly recommended not to directly access the state object and use the Getter functions. The getter functions can easily be mapped into any Vue component using `mapGetters` as computed properties.

<hr/>

## 2. Modularizing the store
It's no wonder that with increased size and complexity, the store get cluttered and hard to understand. Vuex provides out of the box ability to split your store into separate modules with specific purposes as per your application. differentiating the business logic with the help of store modules increases the maintainability of the application. So we need to make sure each modules are name-spaced and not to access them using the global store scope.

Here's a quick example for authoring store module and how to combine all the modules in the main store.

### Directory Structure

```shell
store/
   ├── index.js    ---> Main Store file
   └── modules/
       ├── module1.store.js
       ├── module2.store.js
       ├── module3.store.js
       ├── module4.store.js
       ├── module5.store.js
       └── module6.store.js
```
Note that, each module is named as ModuleName.store.js this will help us to auto import these modules and we'll discuss it in the next section.

### Authoring Modules

We can move the network calls into a separate javaScript files, we will discuss that in another blog post about architecting the network layer of the application. We can even seperate out the state object, getters, actions and mutations into separate files for readability. It is good to keep all the related functions together and modularize away the store into modules further if it's still large and complex.

```javascript
/* Module1.store.js */

// State object
const state = {
    variable1: value,
    variable2: value,
    variable3: value
}


// Getter functions
const getters = {
    getVariable1( state ) {
       return state.varaible1;
    },
    getVariable2( state ) {
       return state.varaible2;
    },
    ....
}


// Actions 
const actions = {
    fetchVariable1({ commit }) {
        return new Promise( (resolve, reject) => {
               // Make network request and fetch data
               // and commit the data
               commit('SET_VARIABLE_1', data); 
               resolve();
        }
    },
    ....
}
// Mutations
const mutations = {
    SET_VARIABLE_1(state, data) {
       state.varaible1 = data;
    },
    SET_VARIABLE_2(state, data) {
       state.variable2 = data;
    },
    ....
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
```

### Combining Modules

```javascript
/** store/index.js **/
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import Module1 from './modules/module1.store';
import Module2 from './modules/module2.store';
...
Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
   modules: {
      Module1,
      Module2,
      ...
   },
   strict: debug,
   plugins: debug? [ createLogger() ] : [],
}
```

<hr/>

## 3. Auto importing store modules

As I mentioned, if the modules are getting more and more complicated, we need to further split them into individual modules to reduce the complexity. When the number of modules increases, it becomes really hard to manage these modules individually and manually import each and every one of them. We'll have a small JS file inside the modules subdirectory to do this job for us. This file will take care of bringing all the modules together.

To make this happen, it's recommended to follow a strict naming pattern for the module files. After all, having a standard naming pattern will increase the maintainability of the entire project. For making things easier, our modules can be named using camelCase followed by `.store.js` extension. eg. `userData.store.js` and we need to add an `index.js` file inside the modules sub-directory to find all these module and export them into the main store.

```shell
store/
   ├── index.js    ---> Main Store file
   └── modules/
       ├── index.js   --> Auto exporter
       ├── module1.store.js
       └── module2.store.js
```

### Auto export script

```javascript
/**
 * Automatically imports all the modules and exports as a single module object
 */
const requireModule = require.context('.', false,  /\.js$/);
const modules = {};

requireModule.keys().forEach(filename => {
    // Don't register this file as a Vuex module
    if (filename === './index.js') return;
    
    // create the module name from fileName
    // remove the store.js extension and capitalize
    const moduleName = filename
                   .replace(/(\.\/|\.store\.js)/g, '')
                   .replace(/^\w/, c => c.toUpperCase())
    
    modules[moduleName] = requireModule(filename).default || requireModule(filename);
});

export default modules;
```

Now, our auto export script is place, we can import this in our main store and have access to all modules. 

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

// import the auto exporter
import modules from './modules';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    ...modules // destructure the import to access all the modules.
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [] // set logger only for development
})
```

Once you have used the auto importer in your main store, all the new modules getting added to the modules sub-directory will be automatically imported. For example, if you have a file named `user.store.js` this will be imported as a store module name-spaced as `User` . You can use this name-space to map the Getters and Actions into your components use `mapGetters` and `mapActions`.

<hr/>

## 4. Resetting module state

If you have worked with Vue+Vuex applications which manages a lot of data in the store modules. You might have came across a scenario where you need to reset the state of the store. It is quite common to have a reset feature when you have user authentication in your application so that you can reset the store when the user logs out.

To reset the store we need to separate out the state object to an initial state and copy that to the main state. we can use a simple function which returns the initial state to achieve this. So, in your store module, create a function called as `initialState()` that returns the actual state object.

```javascript
const initialState = () => ({
    variable1: value,
    variable2: value,
    variable3: value
});

const state = {
    ...initialState()
}
```

Now we have a separate initial state, any changes we make to the state will not affect the actual initial value. So, we can use this to reset the store. Create a mutation function which basically mutates the entire store object with the initial state.

```javascript
const initialState = () => ({
    variable1: value,
    variable2: value,
    variable3: value
});

const state = {
    ...initialState()
}
// Getters

// Actions

// Mutations
const mutations = {
    RESET(state) {
      state = initialState();
    },
    // other mutations
}
```

Once we have the RESET mutation in place we can use this function to reset the store easily either by calling an action or directly commiting the RESET mutation.

```javascript
// Actions
const actions = {
   reset({ commit }) {
       commit('RESET');
   },
}
```

<hr/>

## 5. Global module state reset

What if we need to reset the entire store? including all the modules? If you have followed the 4th and 5th points on setting up the auto importer and module state reset mutation in all your modules, we can use the following action in our main store file to reset all the modules at once.

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import modules from './modules';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    ...modules
  },
  actions: {
    reset({commit}) {
      // resets state of all the modules
      Object.keys(modules).forEach(moduleName => {
        commit(`${moduleName}/RESET`);
      })
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [] // set logger only for development
});
```

Note the action we created is in the main store file and not inside any module. This action can be triggered anywhere from your Vue component using the following line of code.

```javascript
this.$store.dispatch('reset');
```

<hr/>

## What’s next?

In our upcoming blog posts, we’ll discuss in depth on how we can architect the network layer of our Vue.js applications and how to connect these network calls into our store.

Special thanks to [Chris Fritz](https://twitter.com/chrisvfritz) for his amazing talk [7 secret patterns Vue consultants don’t want you to know](https://www.youtube.com/watch?v=7YZ5DwlLSt8&feature=youtu.be) which gave us some of the ideas we used in this article.