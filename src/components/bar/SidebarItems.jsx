import { Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

import { MdSpaceDashboard } from "react-icons/md";
import { FaWallet } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";

const SidebarItems = () => {
  return (
    <>
        <Link 
            display={"flex"}
            to="/"
            as={RouterLink}
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "blackAlpha.200" }}
            borderRadius={6}
            p={2}
            w={"full"}
            justifyContent={"flex-start"}
        >
            <MdSpaceDashboard size={25} />
            Dashboard
        </Link>
        <Link 
            display={"flex"}
            to="/"
            as={RouterLink}
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "blackAlpha.200" }}
            borderRadius={6}
            p={2}
            w={"full"}
            justifyContent={"flex-start"}
        >
            <FaWallet size={25} />
            Transactions
        </Link>
        <Link 
            display={"flex"}
            to="/"
            as={RouterLink}
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "blackAlpha.200" }}
            borderRadius={6}
            p={2}
            w={"full"}
            justifyContent={"flex-start"}
        >
            <IoMdSettings size={25} />
            Settings
        </Link>
    </>
  )
}

export default SidebarItems