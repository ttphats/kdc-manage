"use client";

import React from "react";
import MainLayout from "../../src/components/MainLayout";
import TamTruTamVang from "../../src/views/TamTruTamVang";

export const dynamic = "force-dynamic";

export default function TamTruVangPage() {
  return (
    <MainLayout>
      <TamTruTamVang />
    </MainLayout>
  );
}
