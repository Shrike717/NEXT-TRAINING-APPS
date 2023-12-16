import { SHA256 as sha256 } from "crypto-js";
// // We impot our prisma client
// import prisma from "../../../../lib/prisma";
// // Prisma will help handle and catch errors
// import { Prisma } from "@prisma/client";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req, res) {
  if (req.method === "POST") {
    // create user
    await createUserHandler(req, res);
  } else {
    return res.status(405).json({ message: "Method Not allowed" });
  }
}
// We hash the user entered password using crypto.js
export const hashPassword = (string) => {
  return sha256(string).toString();
};

// function to create user in our database
async function createUserHandler(req, res) {
  //   console.log("[signup.js Endpoint] req.body", req.body);
  const errors = [];
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email and password are required" });
  }

  if (password.length < 6) {
    errors.push("password length should be more than 6 characters");
    return res.status(400).json({ errors });
  }

  try {
    const user = await prisma.user.create({
      data: { name, email, password: hashPassword(password) },
    });
    // console.log("[signup.js Endpoint] user", user);
    return res.status(201).json({ user });
  } catch (e) {
    console.error("[signup.js Endpoint] Error:", e);
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return res.status(400).json({ message: e.message });
    }
    // Catch-all error handler
    return res.status(500).json({ message: "An unexpected error occurred." });
  }
}
