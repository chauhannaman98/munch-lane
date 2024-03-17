import User from "./User";
import UserClass from "./UserClass";

const About = () => {
    return (
        <div>
            <h1>About</h1>
            <h2>This is Munch Lane by Techmirtz</h2>
            <User name={"Naman Chauhan (function)"} />

            <UserClass
                username={"chauhannaman98"}
                location={"Gurugram"}
            />
        </div>
    );
};

export default About;