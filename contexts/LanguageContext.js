"use client";

import { createContext, useContext } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children, lang }) => {
  return (
    <LanguageContext.Provider value={lang}>{children}</LanguageContext.Provider>
  );
};

export const useLanguageClient = () => {
  return useContext(LanguageContext);
};
