"use client";

import Badge from "@/components/ui/badge";
import { products } from "@wix/stores";
import ProductOptions from "./ProductOptions";
import { useState } from "react";
import { checkIsVariantInStock, findVariant } from "@/lib/utils";
import ProductPrice from "./ProductPrice";
import ProductMedia from "./ProductMedia";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InfoIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductDetailsProps {
  product: products.Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  //i also don't know what happened down here, but it works. i generated using chatgpt
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(
    product.productOptions
      ?.map((option) => ({
        [option.name || ""]: option.choices?.[0].description || "",
      }))
      ?.reduce((acc, curr) => ({ ...acc, ...curr }), {}) || {},
  );

  const selectedVariant = findVariant(product, selectedOptions);

  const inStock = checkIsVariantInStock(product, selectedOptions);

  const availableQuantity =
    selectedVariant?.stock?.quantity ?? product.stock?.quantity;

  const availableQuantityExceeded =
    !!availableQuantity && quantity > availableQuantity;

  const selectedOptionsMedia = product.productOptions?.flatMap((option) => {
    const selectedChoice = option.choices?.find(
      (choice) => choice.description === selectedOptions[option.name || ""],
    );
    return selectedChoice?.media?.items ?? [];
  });
  return (
    <div className="flex flex-col gap-10 md:flex-row lg:gap-20">
      <ProductMedia
        media={
          !!selectedOptionsMedia?.length
            ? selectedOptionsMedia
            : product.media?.items
        }
      />
      <div className="basis-3/5 space-y-5">
        <div className="space-y-2.5">
          <h1 className="text-3xl font-bold lg:text-4xl">{product.name}</h1>
          {product.brand && (
            <div className="text-muted-foreground">{product.brand}</div>
          )}
          {product.ribbon && <Badge className="block">{product.ribbon}</Badge>}
        </div>

        {/**i used typography plugin to make the text look good, also remember to add it to require in tailwind.config.ts */}
        {product.description && (
          <div
            dangerouslySetInnerHTML={{ __html: product.description }}
            className="prose dark:prose-invert"
          />
        )}

        {/**price */}
        <ProductPrice product={product} selectedVariant={selectedVariant} />

        {/**options */}
        <ProductOptions
          product={product}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />

        {/**for debugging purposes */}
        {/* <div>Selected options: {JSON.stringify(selectedOptions)}</div> */}

        {/* <div>Variant: { JSON.stringify(selectedVariant?.choices) }</div> */}

        <div className="space-y-1.5">
          <Label htmlFor="quantity">Quantity</Label>
          <div className="flex items-center gap-2.5">
            <Input
              name="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-24"
              disabled={!inStock}
            />
            {!!availableQuantity &&
              (availableQuantityExceeded || availableQuantity < 10) && (
                <span className="text-destructive">
                  Only {availableQuantity} left in stock!
                </span>
              )}
          </div>
        </div>
        {/**more information about the product */}
        {!!product.additionalInfoSections?.length && (
          <div className="space-y-1.5 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <InfoIcon className="h-4 w-4" />
              <span>Additional product information</span>
            </span>
            <Accordion type="multiple">
              {product.additionalInfoSections.map((section) => (
                <AccordionItem value={section.title || ""} key={section.title}>
                  <AccordionTrigger>{section.title}</AccordionTrigger>
                  <AccordionContent>
                    <div
                      className="prose text-sm text-muted-foreground dark:prose-invert"
                      dangerouslySetInnerHTML={{
                        __html: section.description || "",
                      }}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
}
