import { z } from "zod";

export const stockTransfer = z.object({
  from_account: z.string(),
  to_account: z.string(),
  amounts: z.string(),
});

export const stockTransferDefault: z.infer<typeof stockTransfer> = {
  from_account: "",
  to_account: "",
  amounts: "1",
};

export const stockBuy = z.object({
  buyer: z.string().min(1),
  amounts: z.string(),
});

export const stockBuyDefault: z.infer<typeof stockBuy> = {
  buyer: "",
  amounts: "1",
};
