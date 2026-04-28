"use client";

import dynamic from "next/dynamic";

const GradientMeshInner = dynamic(
  () => import("./GradientMeshInner"),
  { ssr: false, loading: () => null }
);

export default function GradientMesh() {
  return <GradientMeshInner />;
}
