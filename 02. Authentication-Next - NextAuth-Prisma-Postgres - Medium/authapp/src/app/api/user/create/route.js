// import { prisma } from "../../../../../lib/prisma";

// export async function POST(req, res) {
//   const { name, email, password } = req.body;

//   try {
//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password, // Remember to hash the password before storing it
//       },
//     });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message || error });
//   }
// }

import { prisma } from "../../../../../lib/prisma";

export async function POST(req, res) {
  console.log("[routes/user/create] req:", req);
  //   const body = await new Promise((resolve, reject) => {
  //     let data = "";
  //     req.on("data", (chunk) => (data += chunk));
  //     req.on("end", () => resolve(JSON.parse(data)));
  //     req.on("error", reject);
  //   });

  const { name, email, password } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // Remember to hash the password before storing it
      },
    });
    console.log("user", user);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
}
