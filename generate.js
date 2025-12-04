import bcrypt from "bcryptjs";

const password = "Reader123";
const hash = bcrypt.hashSync(password, 10);

console.log("HASH:", hash);