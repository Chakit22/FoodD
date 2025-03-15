"use client";

import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { Input } from "./ui/input";
import { CiLocationOn, CiLogout } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

interface NavbarProps {
  handleSignOut: () => Promise<void>;
}

export default function Navbar({ handleSignOut }: NavbarProps) {
  return (
    <div className="w-full h-[20px] flex justify-between items-center gap-2 p-8">
      {/* Sidebar */}
      <SidebarTrigger />
      {/* Search Bar */}
      <div className="flex px-4 gap-2 justify-start items-center md:border md:rounded-full">
        <IoIosSearch size={30} className="cursor-pointer md:cursor-default" />
        <Input
          id="search_item"
          type="text"
          className="hidden md:block md:focus-visible:ring-0 md:border-none md:shadow-none"
        />
      </div>
      <div className="flex gap-8 justify-center items-center">
        {/* Location Icon */}
        <CiLocationOn size={30} className="cursor-pointer" />
        {/* Cart Icon */}
        <FaShoppingCart size={30} className="cursor-pointer" />
        {/* Sign out button */}
        <Button className="hidden md:block" onClick={handleSignOut}>
          Sign Out
        </Button>
        <CiLogout
          size={30}
          className="cursor-pointer md:hidden"
          onClick={handleSignOut}
        />
      </div>
    </div>
  );
}
