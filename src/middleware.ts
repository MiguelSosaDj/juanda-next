import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/login" }
});

export const config = {
  matcher: [
    "/nino-sano/:path*",
    "/gestante/:path*",
    "/lactante/:path*",
    "/bajo-peso/:path*",
    "/sobre-peso/:path*",
    "/gemelar/:path*",
    "/alumno/:path*",
  ],
};
