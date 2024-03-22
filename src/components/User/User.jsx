import { useEffect } from "react";

const User = ({ name }) => {

    useEffect(() => {
        const timer = setInterval(() => {
            console.log('Hello World!');
        }, 1000);

        // stop timer on unmounting the component
        return () => {
            clearInterval(timer);
        }
    }), [];

    return (
        <div className="user-card">
            <h2>Name: {name}</h2>
            <h3>Location: Jammu</h3>
            <h4>Contact: techmirtz@gmail.com</h4>
        </div>
    );
};

export default User;