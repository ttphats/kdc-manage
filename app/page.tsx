"use client";

import React from "react";
import MainLayout from "../src/components/MainLayout";
import Dashboard from "../src/views/Dashboard";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
}
