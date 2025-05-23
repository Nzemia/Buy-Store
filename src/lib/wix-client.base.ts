import { env } from "@/env";
import { createClient, OAuthStrategy, Tokens } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import {
  backInStockNotifications,
  checkout,
  currentCart,
  orders,
  recommendations,
} from "@wix/ecom";
import { files } from "@wix/media";
import { members } from "@wix/members";
import { redirects } from "@wix/redirects";
import { reviews } from "@wix/reviews";

export function getWixClient(tokens: Tokens | undefined) {
  return createClient({
    modules: {
      products,
      collections,
      currentCart,
      checkout,
      redirects,
      orders,
      recommendations,
      files,
      members,
      backInStockNotifications,
      reviews,
    },
    auth: OAuthStrategy({
      clientId: env.NEXT_PUBLIC_WIX_CLIENT_ID,
      tokens,
    }),
  });
}

//check : const wixClient = getWixClient()👇;
export type WixClient = ReturnType<typeof getWixClient>;
