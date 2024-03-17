import React from 'react';

class UserClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // useState()
            userInfo: {
                name: "Dummy",
                location: "Default",
                avatar_url: "https://dummy.com"
            }
        };
    }

    async componentDidMount() {
        // useEffect()
        const data = await fetch("https://api.github.com/users/chauhannaman98")
        const json = await data.json();

        this.setState({
            userInfo: json,
        })
    }

    render() {
        // const { name, location } = this.props;
        const { name, location, avatar_url } = this.state.userInfo;

        return (
            <div className="user-card">
                <img src={avatar_url} alt="github-avatar" />
                {/* <h2>Count: {count}</h2>
                <button onClick={() => {
                    this.setState({
                        count: this.state.count + 1
                    })
                }}>
                    Click to Increment
                </button>
                <h2>Count2: {count2}</h2> */}
                <h2>Name: {name}</h2>
                <h3>Location: {location}</h3>
                <h4>Contact: techmirtz@gmail.com</h4>
            </div>
        );
    }
}

export default UserClass;