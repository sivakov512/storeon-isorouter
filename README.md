# Storeon Isomorphic Router

[![Build Status](https://travis-ci.com/sivakov512/storeon-isorouter.svg?branch=master)](https://travis-ci.com/sivakov512/storeon-isorouter) [![Coverage Status](https://coveralls.io/repos/github/sivakov512/storeon-isorouter/badge.svg?branch=master)](https://coveralls.io/github/sivakov512/storeon-isorouter?branch=master)
[![Code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![npm](https://img.shields.io/npm/v/storeon-isorouter.svg)](https://www.npmjs.com/package/storeon-isorouter)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/storeon-isorouter.svg)](https://bundlephobia.com/result?p=storeon-isorouter)
[![unpkg](https://img.shields.io/badge/unpkg-umd-lightgrey.svg)](https://unpkg.com/storeon-isorouter)
     
[Storeon](https://github.com/storeon/storeon) Router which solves the problem of routing your application on server and browser.


## Installation

```
npm install storeon-isorouter
# or 
yarn add storeon-isorouter
```


## Usage

Import the `isorouter.createRouter` from `storeon-isorouter` and add this module to `createStore`.

```js
import createStore from 'storeon'
import isorouter from 'storeon-isorouter'

const store = createStore([
  isorouter.createRouter()
])

const Root = () => {
  const { [isorouter.key]: route } = useStoreon(isorouter.key)

  switch (route.path) {
    case "/":
      return <Main/>

    case "/blog/":
      return <Blog/>

    default:
      return <NotFound/>
  }
}

store.dispatch(isorouter.navigate, '/')
```

Define your own link component and subsribe route changing on click events.

```js
import isorouter from 'storeon-isorouter'

const Link = ({href, children}) => {
  const { dispatch } = useStoreon(isorouter.key)

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(isorouter.navigate, href)
  }

  return <a href={href} onClick={handleClick}>{children}</a>
}
```


## API

```js
import isorouter from 'storeon-isorouter'

const moduleRouter = isorouter.createRouter()
```

`isorouter.key` – key for store.

`isorouter.navigate` – navigation action.


## LICENSE

MIT
