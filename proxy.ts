import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { updateSession } from "@/lib/supabase/middleware ";
import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { i18n, Lang } from "./i18n/config";

function getLocale(request: NextRequest): Lang {
  const headers = {
    "accept-language": request.headers.get("accept-language") || "",
  };

  const languages = new Negotiator({ headers }).languages();
  return match(languages, i18n.languages, i18n.defaultLocale) as Lang;
}

function getLocaleFromPathname(pathname: string): Lang | null {
  const segment = pathname.split("/")[1];
  return i18n.languages.includes(segment as Lang) ? (segment as Lang) : null;
}

function stripLocaleFromPathname(pathname: string, lang: Lang | null) {
  if (!lang) return pathname;

  const stripped = pathname.replace(new RegExp(`^/${lang}`), "") || "/";
  return stripped.startsWith("/") ? stripped : `/${stripped}`;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isMissingLocale = i18n.languages.every(
    (lang) => !pathname.startsWith(`/${lang}/`) && pathname !== `/${lang}`,
  );

  if (isMissingLocale) {
    const locale = getLocale(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  const lang = getLocaleFromPathname(pathname);
  const appPathname = stripLocaleFromPathname(pathname, lang);

  let response = await updateSession(request);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const currentLocale = lang ?? i18n.defaultLocale;
  const isLoginPage = appPathname === "/login";
  const isAdminPage = appPathname.startsWith("/admin");

  if (!user && isAdminPage) {
    const url = request.nextUrl.clone();
    url.pathname = `/${currentLocale}/login`;
    return NextResponse.redirect(url);
  }

  if (user && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = `/${currentLocale}/admin`;
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
