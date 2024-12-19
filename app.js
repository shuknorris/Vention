"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs/promises"));
const readline_sync_1 = __importDefault(require("readline-sync"));
const filePath = 'users.json';
function loadUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fs.readFile(filePath, 'utf-8');
            return JSON.parse(data);
        }
        catch (error) {
            yield fs.writeFile(filePath, '[]');
            return [];
        }
    });
}
function saveUsers(users) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs.writeFile(filePath, JSON.stringify(users, null, 2));
    });
}
function addUser(userId, username, userpassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield loadUsers();
        const userExists = users.some(user => user.id === userId);
        if (userExists) {
            console.log(`Error: User with ID ${userId} already exists`);
            return;
        }
        users.push({ id: userId, name: username, password: userpassword });
        yield saveUsers(users);
        console.log('User added successfully');
    });
}
function updateUser(userId, username, userpassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield loadUsers();
        const index = users.findIndex(user => user.id === userId);
        if (index === -1) {
            console.log(`Error: User with ID ${userId} not found`);
            return;
        }
        users[index] = { id: userId, name: username, password: userpassword };
        yield saveUsers(users);
        console.log('User updated successfully');
    });
}
function deleteUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield loadUsers();
        const filteredUsers = users.filter(user => user.id !== userId);
        if (filteredUsers.length === users.length) {
            console.log(`Error: User with ID ${userId} not found`);
            return;
        }
        yield saveUsers(filteredUsers);
        console.log('User deleted successfully');
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let command;
        do {
            command = readline_sync_1.default.question('Please enter a command: ');
            const [action, userId, username, userpassword] = command.split(/\s+/);
            const id = parseInt(userId, 10);
            switch (action) {
                case 'Adding':
                    yield addUser(id, username, userpassword);
                    break;
                case 'Updating':
                    yield updateUser(id, username, userpassword);
                    break;
                case 'Deleting':
                    yield deleteUser(id);
                    break;
                case 'Quit':
                    console.log('Exiting from the program.');
                    return;
                default:
                    console.log('Unknown command');
            }
        } while (command !== 'Quit');
    });
}
main();
