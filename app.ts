import * as fs from 'fs/promises';
import readlineSync from 'readline-sync';

const filePath = 'users.json';

async function loadUsers() {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        await fs.writeFile(filePath, '[]');
        return [];
    }
}

async function saveUsers(users) {
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}

async function addUser(userId, username, userpassword) {
    const users = await loadUsers();
    const userExists = users.some(user => user.id === userId);
    if (userExists) {
        console.log(`Error: User with ID ${userId} already exists`);
        return;
    }
    users.push({ id: userId, name: username, password: userpassword });
    await saveUsers(users);
    console.log('User added successfully');
}

async function updateUser(userId, username, userpassword) {
    const users = await loadUsers();
    const index = users.findIndex(user => user.id === userId);
    if (index === -1) {
        console.log(`Error: User with ID ${userId} not found`);
        return;
    }
    users[index] = { id: userId, name: username, password: userpassword };
    await saveUsers(users);
    console.log('User updated successfully');
}

async function deleteUser(userId) {
    const users = await loadUsers();
    const filteredUsers = users.filter(user => user.id !== userId);
    if (filteredUsers.length === users.length) {
        console.log(`Error: User with ID ${userId} not found`);
        return;
    }
    await saveUsers(filteredUsers);
    console.log('User deleted successfully');
}

async function main() {
    let command;
    do {
        command = readlineSync.question('Please enter a command: ');
        const [action, userId, username, userpassword] = command.split(/\s+/);
        const id = parseInt(userId, 10);

        switch (action) {
            case 'Adding':
                await addUser(id, username, userpassword);
                break;
            case 'Updating':
                await updateUser(id, username, userpassword);
                break;
            case 'Deleting':
                await deleteUser(id);
                break;
            case 'Quit':
                console.log('Exiting from the program.');
                return;
            default:
                console.log('Unknown command');
        }
    } while (command !== 'Quit');
}

main();
