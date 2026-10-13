interface User {
	firstName: string;
	lastName: string;
	age: number;
}

function filteredUser (user : User[]) {
        return user.filter(x => x.age>=18);
}

console.log(
  filteredUser([
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
  ]),
);