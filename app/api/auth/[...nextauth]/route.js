import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/lib/mongodb";
import Admin from "@/models/Admin";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
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
        
        // Normally you'd hash the password and store it in the DB too. 
        // For now, we still use the ENV password, but verify the email exists in DB or matches the fallback.
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
    },
    async signIn({ user }) {
      try {
        await connectMongo();
        
        const userEmail = user?.email?.toLowerCase();
        if (!userEmail) return false;

        // SECURITY: Check if email exists in MongoDB Admin collection
        const adminUser = await Admin.findOne({ email: userEmail });
        const fallbackAdminEmail = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'setuarchitect@gmail.com').toLowerCase();
        
        if (adminUser || userEmail === fallbackAdminEmail) {
          return true; 
        }
        // Return false to reject unauthorized user and trigger NextAuth AccessDenied error redirect to pages.error ('/')
        return false;
      } catch (error) {
        console.error("Auth Error:", error);
        return false;
      }
    }
  },
  pages: {
    signIn: '/',
    error: '/',
  }
});

export { handler as GET, handler as POST };
