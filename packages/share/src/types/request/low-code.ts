import type { ILowCode, IComponent } from "..";

export type PostReleaseRequest = Omit<
  ILowCode,
  "id" | "account_id" | "components"
> & { components: Omit<IComponent, "account_id" | "page_id">[] };
