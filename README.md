# Facetix

Event platform front end: browse events, register, and manage the ones you signed
up for.

React · Vite · Bootstrap · React Hook Form

## Scope

This repository holds the **client only**. The API it talks to is configured in
[`src/api/api_base.js`](facetix-frontend/src/api/api_base.js) and is not part of
this repo, so the app needs a backend pointed at it before it does anything
useful.

## Screens

| Screen | Purpose |
|---|---|
| `main_page` | Landing |
| `eventos_page` | Browse available events |
| `miseventos_page` | Events the user signed up for |
| `register_page` | Account creation |
| `contactus_page` | Contact form |

Forms are built with React Hook Form; feedback uses SweetAlert2 for confirmations
and react-hot-toast for transient messages.

## Running it

```bash
cd facetix-frontend
npm install
npm run dev
```

## Known limitations

- Front end only — no backend in this repository, and the API base URL is
  hardcoded
- No automated tests
- No authenticated route guards: navigation is not gated on login state
