# Restaurant Menu App

This is a simple Restaurant Menu web application built with React and Vite. It allows you to view, add, edit, and delete menu items. The app demonstrates basic CRUD operations and uses a mock REST API powered by `json-server`.

## Features
- View a list of menu items
- Add new products
- Edit existing products
- Delete products
- Loading spinner while fetching data

## Getting Started

### 1. Start the Mock API Server

The app requires a REST API to function. The `server` folder contains a `menu.json` file, which acts as the database for the menu items. You need to run `json-server@0.17` to serve this file.

#### Install json-server (version 0.17)

If you don't have `json-server` installed globally, run:

```
npm install -g json-server@0.17
```

#### Start the server

Navigate to the `server` directory and run:

```
json-server --watch menu.json --port 3000
```

This will start the API server at `http://localhost:3000/menu`.

> **Note:** The loading spinner in the app will only show if the server is running and data is being fetched.

### 2. Start the React App

Navigate to the `project` directory and install dependencies:

```
cd project
npm install
```

Then start the development server:

```
npm run dev
```

The app will be available at the URL shown in your terminal (usually `http://localhost:5173`).

## Folder Structure

- `server/menu.json` - Mock database for menu items
- `project/src/components` - React components (Admin, ProductForm, Menu, etc.)
- `project/public` - Static assets

## Requirements
- Node.js (v14 or higher recommended)
- npm
- json-server@0.17

## License

This project is open source and free to use for learning purposes.
