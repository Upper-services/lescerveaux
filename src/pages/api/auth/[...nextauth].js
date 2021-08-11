import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import { db } from "../../../../firebase";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      scope: "identify email",
      accessTokenUrl: "https://discord.com/api/oauth2/token",
      authorizationUrl:
        "https://discord.com/api/oauth2/authorize?response_type=code&prompt=none",
      profileUrl: "https://discord.com/api/users/@me",
      profile(profile) {
        if (profile.avatar === null) {
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = profile.avatar.startsWith("a_") ? "gif" : "png";
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
        }
        return {
          id: profile.id,
          name: profile.username,
          image: profile.image_url,
          email: profile.email,
        };
      },
    }),
    // ...add more providers here
  ],
  adapter: FirebaseAdapter(db),
});
