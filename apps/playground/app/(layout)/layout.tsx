"use client";
import type {ReactNode} from "react";

import Header from "../../components/header";

export default function PlaygroundLayout({children}: {children: ReactNode}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {children}
    </div>
  );
}
