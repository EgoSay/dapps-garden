"use client";

import { AvatarComponent } from "@rainbow-me/rainbowkit";
import { blo } from "blo";
import { Avatar, AvatarImage } from "~~/components/ui/avatar";

// Custom Avatar for RainbowKit
export const BlockieAvatar: AvatarComponent = ({ address, ensImage, size }) => (
  // Don't want to use nextJS Image here (and adding remote patterns for the URL)
  // eslint-disable-next-line @next/next/no-img-element
  <Avatar style={{ width: size, height: size }}>
    <AvatarImage src={ensImage || blo(address as `0x${string}`)} alt={`${address} avatar`} />
  </Avatar>
);
