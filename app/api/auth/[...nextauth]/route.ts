import connectMongoDB from "@/config/database";
import User from "@/models/user";
import NextAuth from "next-auth";
import { comparePassword } from "@/utils/hashComPass";
import Credentials from "next-auth/providers/credentials";

export const authOption = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials: user) {
        await connectMongoDB();
        const user = await User.findOne({
          email: credentials.email,
        });

        // User.findOne({ email: credentials.email }, async (err, user) => {
        //   if (err) {
        //     console.log("User not found");
        //   }
        //   if (user) {
        //     const isPasswordMatch = await comparePassword(
        //       credentials.password as string,
        //       user.password
        //     );
        //     if (isPasswordMatch) {
        //       return user;
        //     }
        //     if (!isPasswordMatch) {
        //       console.log("Wrong Password");
        //       return null;
        //     }
        //   }
        // });

        if (!user) {
          throw new Error("User not found");
        }
        const checkPassword = await comparePassword(
          credentials.password as string,
          user.password
        );

        if (!checkPassword) {
          throw new Error("Wrong password");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/sign",
  },

  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session }: { session: sessionUser }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();

      return session;
    },
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
