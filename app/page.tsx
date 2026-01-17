"use client";

import React from "react";
import MainLayout from "../src/components/MainLayout";
import Dashboard from "../src/pages/Dashboard";

export default function Home() {
  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
}
