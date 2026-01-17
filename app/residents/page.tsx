"use client";

import React from "react";
import MainLayout from "../../src/components/MainLayout";
import Residents from "../../src/views/Residents";

export const dynamic = "force-dynamic";

export default function ResidentsPage() {
  return (
    <MainLayout>
      <Residents />
    </MainLayout>
  );
}
