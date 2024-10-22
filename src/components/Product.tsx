import { products } from "@wix/stores";
import Link from "next/link";
import WixImageResize from "./WixImageResize";
import Badge from "./ui/badge";
import { formatCurrency } from "@/lib/utils";
import DiscountBadge from "./DiscountBadge";

interface ProductProps {
  product: products.Product;
}

export function Product({ product }: ProductProps) {
  const mainImage = product.media?.mainMedia?.image;

  // const resizeImageUrl = mainImage?.url
  //   ? wixMedia.getScaledToFillImageUrl(mainImage.url, 700, 700, {})
  //   : null;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="h-full rounded-md bg-card"
    >
      <div className="relative overflow-hidden">
        <WixImageResize
          mediaIdentifier={mainImage?.url}
          alt={mainImage?.altText}
          width={700}
          height={700}
          className="transition-transform duration-300 hover:scale-110"
        />

        <div className="absolute bottom-3 right-3 flex flex-wrap items-center gap-2">
          {/**ribbon, like, new, best seller etc */}
          {product.ribbon && <Badge>{product.ribbon}</Badge>}

          {/**discounts */}
          {product.discount && <DiscountBadge data={product.discount} />}

          {/**price */}
          <Badge className="bg-secondary font-semibold text-secondary-foreground">
            {getFormattedPrice(product)}
          </Badge>
        </div>
      </div>
      <div className="space-y-3 p-3">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <div
          className="line-clamp-5"
          dangerouslySetInnerHTML={{ __html: product.description || "" }}
        />
      </div>
    </Link>
  );
}

function getFormattedPrice(product: products.Product) {
  const minPrice = product.priceRange?.minValue;
  const maxPrice = product.priceRange?.maxValue;

  if (minPrice && maxPrice && minPrice !== maxPrice) {
    return `from ${formatCurrency(minPrice, product.priceData?.currency)}`;
  } else {
    return (
      product.priceData?.formatted?.discountedPrice ||
      product.priceData?.formatted?.price ||
      "n/a"
    );
  }
}
