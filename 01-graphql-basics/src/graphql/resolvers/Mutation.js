import { v4 } from "uuid";

let Mutation = {
  createUser: (parent, args, { db }, info) => {
    const { name, age } = args;
    if (typeof name !== "string") {
      throw new Error("Name can not be empty");
    }
    if (typeof age !== "number") {
      throw new Error("Age can not be empty");
    }

    let newUser = {
      id: v4(),
      name,
      age,
    };

    db.users.push(newUser);
    return newUser;
  },
};

export default Mutation;
