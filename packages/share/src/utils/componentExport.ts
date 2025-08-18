import type { FC } from "react";
import type { TComponentTypes } from "..";
import { VideoComponent } from "..";

// @ts-ignore
export const componentList: Record<TComponentTypes, FC<any>> = {
  video: VideoComponent,
};
