"use client";

import { FaHome } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";

export const items = [
  {
    title: "Home",
    url: "/home",
    icon: <FaHome style={{ width: "28px", height: "28px" }} />,
  },
  {
    title: "Orders",
    url: "#",
    icon: <CiViewList style={{ width: "28px", height: "28px" }} />,
  },
  {
    title: "Profile",
    url: "#",
    icon: <MdAccountCircle style={{ width: "28px", height: "28px" }} />,
  },
];
