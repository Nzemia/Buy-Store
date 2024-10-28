import Link from "next/link";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client.server";

export default async function Navbar() {
  const cart = await getCart(getWixServerClient());

  const totalQuantity =
    cart?.lineItems.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0;
  return (
    <header className="sticky top-0 z-50 bg-background shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4">
        <Link href="/" className="flex items-center gap-4">
          <Image src={logo} alt="logo" width={40} height={40} />
          <span className="text-xl font-bold">Buy Store</span>
        </Link>
        {totalQuantity}items in your cart
      </div>
    </header>
  );
}
