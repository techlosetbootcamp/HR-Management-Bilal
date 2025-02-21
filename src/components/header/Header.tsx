import React from "react";
import { Bell } from "lucide-react";
import Link from "next/link";
import SearchBar from "../searchbar/Searchbar";
import DropDown from "../dropdown/Dropdown";
// import { useSession } from "next-auth/react";

export type LAYOUT_PROPS = {
  heading: string;
  description: string;
};

const Header = ({ heading, description }: LAYOUT_PROPS) => {
    // const { data: session } = useSession();
  
  // const name = session?.user.name ? session.user.name : "default";
  return (
    <div className="h-[82px] pb-[10px] my-[15px] bg-primaryBlack sticky top-0 z-[99] flex items-center justify-between pe-[50px] ms-[10px]">
      <div className="flex items-center ">
        {/* <div className="flex flex-col">
        <h2 className="font-[600] text-[20px] dark:text-white">Hello {name}</h2>
        <p className="font-[200] text-[#A2A1A8] text-[14px]">Have a good day!</p>
        </div> */}
        <div className="flex flex-col">
          <div className="text-[20px] font-semibold">{heading}</div>
          <div className="text-[14px] text-customGrey">{description}</div>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <SearchBar
          searchText={""}
          setSearchText={(text) => console.log(text)}
          width={261}
        />

        <Link
          href="/notifications"
          className="bg-lightGreyShade w-[50px] h-[50px] flex items-center justify-center rounded-[10px]"
          aria-label="Notifications"
        >
          <Bell className="h-6 w-6" />
        </Link>

        <div className="w-[184px]">
          <DropDown />
        </div>
      </div>
    </div>
  );
};

export default Header;
