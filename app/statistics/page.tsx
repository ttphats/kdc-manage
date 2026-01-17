"use client";

import React from "react";
import MainLayout from "../../src/components/MainLayout";
import Statistics from "../../src/views/Statistics";

export const dynamic = "force-dynamic";

export default function StatisticsPage() {
  return (
    <MainLayout>
      <Statistics />
    </MainLayout>
  );
}
