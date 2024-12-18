import Link from "next/link";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { getCart } from "@/wix-api/cart";
import { getWixServerClient } from "@/lib/wix-client.server";
import ShoppingCartButton from "./ShoppingCartButton";
import UserButton from "@/components/UserButton";
import { getLoggedInMember } from "@/wix-api/members";
import { getCollections } from "@/wix-api/collection";
import MainNavigation from "./MainNavigation";
import SearchField from "@/components/SearchField";
import MobileMenu from "./MobileMenu";

export default async function Navbar() {
  const wixClient = getWixServerClient();

  const [cart, loggedInMember, collections] = await Promise.all([
    getCart(wixClient),
    getLoggedInMember(wixClient),
    getCollections(wixClient),
  ]);

  // const cart = await getCart(getWixServerClient());
  return (
    <header className="sticky top-0 z-50 bg-background shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4">

        {/* Mobile menu */}
        <MobileMenu collections={collections} loggedInMember={loggedInMember} />


        {/* Logo */}
        <div className="flex flex-wrap items-center gap-5">
          <Link href="/" className="flex items-center gap-4">
            <Image src={logo} alt="logo" width={40} height={40} />
            <span className="text-xl font-bold">Buy Store</span>
          </Link>

          {/* Navigation menu*/}
          <MainNavigation collections={collections} className="hidden lg:flex"/>
        </div>

        {/**search */}
        <SearchField className="hidden lg:inline max-w-96" />

        <div className="flex items-center justify-center gap-5">
          <UserButton loggedInMember={loggedInMember} className="hidden lg:inline-flex" />
          <ShoppingCartButton initialData={cart} />
        </div>
      </div>
    </header>
  );
}
