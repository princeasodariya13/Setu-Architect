import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/lib/mongodb";
import Admin from "@/models/Admin";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectMongo();
        
        // Find admin in DB
        const adminUser = await Admin.findOne({ email: credentials?.email.toLowerCase() });
        const fallbackAdminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'setuarchitect@gmail.com';
        
        const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'Setu@Admin2026';

        if (
          (adminUser || credentials?.email.toLowerCase() === fallbackAdminEmail.toLowerCase()) &&
          credentials?.password === adminPassword
        ) {
          return { id: "1", name: "Admin", email: credentials.email };
        }
        return null; // Return null if login fails
      }
    })
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (!url) return '/';
      if (url.startsWith("https://") || url.startsWith("http://")) {
        try {
          const u = new URL(url);
          const b = new URL(baseUrl || 'http://localhost:3000');
          if (u.origin === b.origin) {
            return u.pathname + u.search + u.hash;
          }
          return url;
        } catch (e) {
          return url;
        }
      }
      if (url.startsWith("/")) return url;
      return '/';
    }
  },
  pages: {
    signIn: '/',
    error: '/',
  }
});

export { handler as GET, handler as POST };

