"use client";

import React from "react";
import MainLayout from "../../src/components/MainLayout";
import Households from "../../src/views/Households";

export const dynamic = "force-dynamic";

export default function HouseholdsPage() {
  return (
    <MainLayout>
      <Households />
    </MainLayout>
  );
}
