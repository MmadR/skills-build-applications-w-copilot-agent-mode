# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

# OctoFit Tracker presentation tier

React 19 presentation app powered by Vite, React Router, and Bootstrap. It
displays activities, leaderboard standings, teams, users, and workouts from the
OctoFit API.

## Run locally

```sh
npm install
npm run dev
```

The frontend runs on port `5173`. The API defaults to `http://localhost:8000`
when `VITE_CODESPACE_NAME` is not set.

## GitHub Codespaces

Define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` when using
the frontend in Codespaces. It must be the Codespace name, not the full URL, so
the app can build the API URL `https://<name>-8000.app.github.dev`.

For example:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite reads this value when it starts; restart the dev server after changing the
file. The frontend calls `/api/activities/`, `/api/leaderboard/`, `/api/teams/`,
`/api/users/`, and `/api/workouts/`. Collection responses may be plain arrays or
paginated objects containing `results`, `items`, or `data` arrays.
