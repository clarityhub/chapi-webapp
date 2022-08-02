# Clarity Hub Webapp

## Prerequisites

Make sure you have Clarity Hub API Gateway installed and running.

## Running

```bash
sh ./start
```

You can now access the following:

* Webapp: [https://app.clarityhub.app](https://app.clarityhub.app)

## Folder Structure

* `modules/*` – each folder under modules is a group of pages, routes, components, and contexts that work together to provide a set of functionality.
* `modules/*/pages/*` – pages are considered top level React components. They may include containers, state, and layout to create an entire page of functionality. They often do coordination as well of state, side-effects, etc.
* `modules/*/containers/*` – containers will often render `children()` with data passed through. Containers often load data or coordinate side-effects (like localStorage).
* `modules/*/components/*` – components are **reusable** React components. Components should not be causing side-effects or loading data.
