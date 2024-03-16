import { useRouteError } from "react-router-dom";

const Error = () => {
    const err = useRouteError();
    console.log(err);

    return (
        <div>
            <h1>Oopss! {err.internal ? "Internal" : "External"} Error</h1>
            <h2>{err.status}: {err.statusText}</h2>
        </div>
    );
};

export default Error;