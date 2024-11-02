import { getWixClient, WixClient } from "@/lib/wix-client.base";
import { collections } from "@wix/stores";
import { cache } from "react";

export const getCollectionBySlug = cache(
  async (wixClient: WixClient, slug: string) => {
    // const wixClient = getWixClient();

    const { collection } =
      await wixClient.collections.getCollectionBySlug("featured-products");

    return collection || null;
  },
);

//the first ne is all products, while the second is for the featured products collection
export const getCollections = cache(
  async (wixClient: WixClient): Promise<collections.Collection[]> => {
    const collections = await wixClient.collections
      .queryCollections()
      .ne("_id", "00000000-000000-000000-000000000001")
      .ne("_id", "15765997-bbeb-8c9b-1ce1-d16a08dfe05b")
      .find();

    return collections.items;
  },
);
