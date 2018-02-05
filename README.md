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

## authentication / routing
Authentication and routing are based on [this Meteor Chef article](https://themeteorchef.com/tutorials/getting-started-with-react-router-v4) using React Router 4.

2 higher order components `<Authenticated />` and `<Public />` are used in the top level App.js component. They are used to render routes and redirect as needed.  When logged in, users are redirected to the '/profile' route. When logged out, users are redirect to the '/login' route.

## folder structure

The folder structure is developer friendly, easy to navigate and follows the official Meteor docs. 
### pages
Each 'route' is represented by a folder in the 'pages' directory. All data fetching is done at this top page level.

### components
Reusable components in the 'components' directory are imported as needed. If a component requires data, it is passed as props from the parent component. This means props are usually passed only 1 component away.

### api
The 'api' folder contains 1 folder per collection (all methods and publications for each endpoint are exclusive to each folder). This makes it easy to maintain each collection.

The overall folder structure and component code are designed to be as modular as possible.

## scss
SCSS is also locally scoped to each page/component folder. This makes managing styles easy, as .scss files are in the same folder as the component file.

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

[Multi Meteor app single sign on](https://github.com/tmeasday/multi-app-accounts)

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

**Meteor packages added**:

- fourseven:scss          (sass/css support in .scss files)
- react-meteor-data       (provides HOCs to fetch data reactively from collections using `withTracker`)
- accounts-password
- meteortoys:allthings    (collection diagnostics)
- juliancwirko:postcss    (enables autoprefxer)
- browser-policy          (restrict allowed origins for added security)
- fortawesome:fontawesome (icons)

## What is not included?
There is no state management such as [Redux](https://github.com/reactjs/redux) or [MobX](https://github.com/mobxjs/mobx). This is partly because this template is so small and state is locally managed in components as needed. Also the Meteor collections reactively update the UI when changed. However, any state management tool can be easily added to the top level App component to provide a global store.
