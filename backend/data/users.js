import bcrypt from "bcrypt";

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 12),
        isAdmin: true,
    },
    {
        name: 'Naman Chauhan',
        email: 'naman@example.com',
        password: bcrypt.hashSync('123456', 12),
        isAdmin: false,
    },
    {
        name: 'Techmirtz',
        email: 'techmirtz@example.com',
        password: bcrypt.hashSync('123456', 12),
        isAdmin: false,
    }
];

export default users;