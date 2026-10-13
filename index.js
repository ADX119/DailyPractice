"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function filteredUser(user) {
    return user.filter(x => x.age >= 18);
}
console.log(filteredUser([
    {
        firstName: "Aditya",
        lastName: "Andurkar",
        age: 2,
    },
    {
        firstName: "Underage",
        lastName: "Andurkar",
        age: 177,
    }
]));
//# sourceMappingURL=index.js.map