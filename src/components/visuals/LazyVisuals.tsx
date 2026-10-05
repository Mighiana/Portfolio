"use client";

import dynamic from "next/dynamic";

export const LazyTopologyField = dynamic(() => import("./TopologyField"), { ssr: false });
export const LazyNodeSphere = dynamic(() => import("./NodeSphere"), { ssr: false });
