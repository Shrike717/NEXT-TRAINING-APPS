import { SHA256 as sha256 } from "crypto-js";
// import prisma client
// import prisma from "../../../../lib/prisma";
import hashPassword from "./signup";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req, res) {
  if (req.method === "POST") {
    // login user
    await loginUserHandler(req, res);
  } else {
    return res.status(405);
  }
}

async function loginUserHandler(req, res) {
  console.log("[login.js loginUserHandler] req.body", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "invalid inputs" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        // image: true,
      },
    });
    if (user && user.password === hashPassword(password)) {
      // exclude password from json response
      return res.status(200).json(exclude(user, ["password"]));
    } else {
      return res.status(401).json({ message: "invalid credentials" });
    }
  } catch (e) {
    console.error("[login.js loginUserHandler] Error:", e);
    throw new Error(e);
  }
}
// Function to exclude user password returned from prisma
function exclude(user, keys) {
  for (const key of keys) {
    delete user[key];
  }
  return user;
}
