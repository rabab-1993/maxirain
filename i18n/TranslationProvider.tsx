"use client";

import { createContext, useContext } from "react";

type Dictionary = Record<string, any>;

const TranslationContext = createContext<Dictionary | null>(null);

export function TranslationProvider({
  children,
  dictionary,
}: {
  children: React.ReactNode;
  dictionary: Dictionary;
}) {
  return (
    <TranslationContext.Provider value={dictionary}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error("useTranslation must be used inside TranslationProvider");
  }

  const t = (key: string): string => {
    return (
      key.split(".").reduce((acc: any, part) => acc?.[part], context) || key
    );
  };

  return { t };
}
