"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useTranslation } from "@/i18n/TranslationProvider";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.replace("/admin");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#0e514c] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-teal-950 dark:text-[#F5E1D0] p-8 shadow-lg">
        <h1 className="mb-2 text-3xl font-bold text-teal-900 dark:text-[#fdd3ad]">
          {t("admin.loginHero")}
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border dark:text-[#F5E1D0] text-teal-700 border-teal-500 px-4 py-3 outline-none focus:border-teal-600"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border dark:text-[#F5E1D0] text-teal-700 border-teal-500 px-4 py-3 outline-none focus:border-teal-600"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="cursor-pointer w-full rounded-xl bg-teal-700 px-4 py-3 text-[#fdd3ad] font-bold transition hover:bg-teal-800 disabled:opacity-60"
          >
            {loading ? t("admin.loggingIn") : t("admin.login")}
          </button>
        </div>
      </div>
    </div>
  );
}
