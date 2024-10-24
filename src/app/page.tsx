import banner from "@/assets/banner.jpg";
import { Product } from "@/components/Product";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { delay } from "@/lib/utils";
import { getCollectionBySlug } from "@/wix-api/collection";
import { queryProducts } from "@/wix-api/products";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      <div className="flex items-center bg-secondary md:h-96">
        {/**Text */}
        <div className="space-y-7 p-10 text-center md:w-1/2">
          <h1 className="text-3xl font-bold md:text-4xl">
            Fill the void in your heart with our products!
          </h1>

          <p>
            Tough day? Credit card? No worries, we got you covered. Buy some
            stuff and become happy again!
          </p>

          <Button asChild>
            <Link href="/shop">
              Shop Now
              <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
        </div>

        {/** Image */}
        <div className="relative hidden h-full w-1/2 md:block">
          <Image
            src={banner}
            alt="banner image"
            className="h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-transparent to-transparent" />
        </div>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </main>
  );
}

async function FeaturedProducts() {
  // await delay(1000);

  const collection = await getCollectionBySlug("featured-products");

  if (!collection?._id) return null;

  const featuredProducts = await queryProducts({
    collectionIds: collection._id,
  });

  if (!featuredProducts?.items?.length) return null;

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Featured Products</h2>
      <div className="flex grid-cols-2 flex-col gap-5 sm:grid md:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.items.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      {/** JSON View, just for testing purposes*/}
      {/* <pre>{JSON.stringify(featuredProducts, null, 2)}</pre> */}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex grid-cols-2 flex-col gap-5 pt-12 sm:grid md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-[20rem] w-full" />
      ))}
    </div>
  );
}
