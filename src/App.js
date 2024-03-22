import React, { lazy, Suspense, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Auxiliary/Error";
import RestaurantMenu from "./components/Restaurant/RestaurantMenu";
import Shimmer from "./components/Auxiliary/Shimmer";
import UserContext from "./utils/UserContext";
import appStore from "./utils/redux/appStore";
import Cart from "./components/Cart/Cart";

const Grocery = lazy(() => import("./components/Grocery"));

const AppLayout = () => {
    const [username, setUsername] = useState();

    // authentication
    useEffect(() => {
        // make an API call and send username and password
        const data = {
            name: "Naman Chauhan"
        };
        setUsername(data.name);
    }, []);

    return (
        <Provider store={appStore}>
            <UserContext.Provider value={{ loggedInUser: username, setUsername }}>
                <div className="app">
                    <Header />
                    <Outlet />
                </div>
            </UserContext.Provider>
        </Provider>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Body />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/grocery",
                element: <Suspense
                    fallback={<Shimmer />}
                >
                    <Grocery />
                </Suspense>,
            },
            {
                path: '/restaurants/:resID',
                element: <RestaurantMenu />,
            },
            {
                path: '/cart',
                element: <Cart />,
            }
        ],
        errorElement: <Error />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);