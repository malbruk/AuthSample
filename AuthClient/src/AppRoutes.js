import React from 'react';
import Public from "./components/Public";
import Private from "./components/Private";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from './components/Register';

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/public',
        element: <Public />
    },
    {
        path: '/private',
        element: <Private />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }
];

export default AppRoutes;
