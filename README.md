[![eslint: airbnb](https://img.shields.io/badge/eslint-airbnb-blue.svg)](https://github.com/airbnb/javascript)
[![code style: prettier](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
## A Meteor 1.6.1, React 16, React Router 4, Bootstrap 4 Template

Based off the official meteor scaffolding, with accounts, login and a demo collection that persists on login/logout.

Current routes setup:

- landing (index route)
- login
- signup
- recover-password
- profile

## Quick Start
Clone repository:
```
git clone https://git.jdwilson.ca/john/meteor-react-template.git
```
Install packages:
```
meteor npm install
```
Start Meteor:
```
meteor
```

Navigate to http://localhost:3000 in any browser.

## Demo

A live demo is available at [https://meteortemplate.jdwilson.ca](https://meteortemplate.jdwilson.ca)

## routing / redirects
React Router 4 `props` are accessible in every top level 'page' component. This allows any page to access react router's 'redirect' functions and url params, etc. These can be passed onto any further components.

Also React Router's `withProps` HOC provides the same functionality to any component.

When logged in, users are redirected to the '/profile' route.

When logged out, users are redirect to the '/login' route.

## folder structure

The folder structure is modular, developer friendly, easy to navigate and follows the import structure of the official Meteor docs.

### pages
Each 'route' is represented by a folder in the 'pages' directory. Most data fetching is done at this top page level. These pages are the 'smart' or 'container' components. They fetch data and pass it as props to presentational components.

### components
Reusable components in the 'components' directory are 'dumb' or ''presentational' components. These are mostly functional, stateless components. If a component requires data, it is passed as props from it's page component.

*Note:* Meteor's reactive `withTracker` can also fetch data in any sub component (if really needed).

### api
The 'api' folder contains 1 folder per collection (all methods and publications for each endpoint are exclusive to each folder). This makes it easy to maintain each collection endpoint. All collections use `aldeed:collection2` to enable schema validation on inserts. Both collections and methods use `simpl-schema` to validate paramaters.

#### methods
Methods use MDG's [mdg:validated-method](https://atmospherejs.com/mdg/validated-method). The benefits of validated methods over regular methods are listed here: [https://atmospherejs.com/mdg/validated-method#benefits-of-validatedmethod](https://atmospherejs.com/mdg/validated-method#benefits-of-validatedmethod)

##### Validated Method Mixins:

The following mixins are used with methods:

- [didericis:callpromise-mixin](https://atmospherejs.com/didericis/callpromise-mixin) is used to return a promise to the client instead of a callback. Async/await code is used on the client for handling methods.

- [lacosta:method-hooks](https://atmospherejs.com/lacosta/method-hooks) provides before and after hooks when methods are called.

- [tunifight:loggedin-mixin](https://atmospherejs.com/tunifight/loggedin-mixin) is used to only allow logged-in users to call methods and uses `alanning:roles` to check the user has the correct role privileges to call the method.

## roles
Basic roles are defined using `alanning:roles`.

The first user is 'admin' and subsequent users are 'user'.

## scss
SCSS is also locally scoped to each page/component folder. This makes managing styles easy, as .scss files are in the same folder as the component file.

*Note:* most styling can be done via 'classes' using the Bootstrap API (see below)

### global styles
There is 1 main.scss file that imports Bootstrap and 1 custom.scss to override default styles. App-wide custom theming can be setup easily in custom.scss.
## bootstrap 4
Bootstrap is being used directly on elements (adding to the 'class' or 'className') using the [v4 api](https://getbootstrap.com/docs/4.0/components/buttons/). This includes (so far) navbar, collapsed navbar, login/signup cards, search bar, dropdown menu and a modal. The api is well documented and easy to use. This approach limits the dependency on common external bootstrap packages.

## autoprefixer
Meteor's built-in css minifier is replaced with `juliancwirko:postcss` ([mentioned](https://guide.meteor.com/build-tool.html#postcss) in the meteor docs). This package minifies CSS plus it makes use of a postcss entry in package.json to apply autoprefixer for wider browser support.

## responsive layout
The grid from Bootstrap 4 ensures the layout is responsive on desktop and mobile. The navbar, modal and login/signup cards are good examples to check out on mobile.

## connecting this template to an existing meteor backend
A ddp connection can be made to an existing meteor server, following steps in [Meteor's official docs](https://docs.meteor.com/api/connections.html#DDP-connect)

The ddp connection enables access to the existing server's methods, collections and publications.

**Links**:

[Splitting into multiple Meteor apps](https://guide.meteor.com/structure.html#splitting-your-app)

[Meteor multi app accounts](https://github.com/tmeasday/multi-app-accounts)

**npm packages added**:

- @babel/runtime (updated to work with latest meteor)
- bcrypt
- meteor-node-stubs
- prop-types
- react
- react-dom
- react-router-dom
- autoprefixer
- bootstrap
- simpl-schema

**Meteor packages added**:

- react-meteor-data       (provides HOCs to fetch data reactively from collections using `withTracker`)
- accounts-password
- alanning:roles
- mdg:validated-method
- aldeed:collection2@3.0.0
- matb33:collection-hooks
- msavin:mongol
- fourseven:scss          (sass/css support in .scss files)
- juliancwirko:postcss    (enables autoprefxer)
- browser-policy          (restrict allowed origins for added security)
- fortawesome:fontawesome (icons)

## What is not included?
There is no state management such as [Redux](https://github.com/reactjs/redux) or [MobX](https://github.com/mobxjs/mobx). This is partly because this template is so small and state is locally managed in components as needed. Also the Meteor collections reactively update the UI when changed. However, any state management tool can be easily added to the top level App component to provide a global store.
