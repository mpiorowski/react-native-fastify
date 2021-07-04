import React from "react";

export const AuthContext = React.createContext<{
  setIsUsername: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCode: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);
