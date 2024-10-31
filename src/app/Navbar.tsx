import Link from "next/link";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client.server";
import ShoppingCartButton from "./ShoppingCartButton";
import UserButton from "@/components/UserButton";
import { getLoggedInMember } from "@/wix-api/members";

export default async function Navbar() {
  const wixClient = getWixServerClient();

  const [cart, loggedInMember] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
  ]);

  // const cart = await getCart(getWixServerClient());
  return (
    <header className="sticky top-0 z-50 bg-background shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4">
        <Link href="/" className="flex items-center gap-4">
          <Image src={logo} alt="logo" width={40} height={40} />
          <span className="text-xl font-bold">Buy Store</span>
        </Link>

        <div className="flex items-center justify-center gap-5">
          <UserButton loggedInMember={loggedInMember} />
          <ShoppingCartButton initialData={cart} />
        </div>
      </div>
    </header>
  );
}
