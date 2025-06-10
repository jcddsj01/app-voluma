import { Search } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="flex justify-between w-full items-center py-4 px-6 bg-[#fafafa] rounded-t-md">
            <Link to="/">
                <img src="./voluma-logo.png" alt="" className="w-32" />
            </Link>
            <nav className="flex items-center justify-center gap-2">
                <div className="flex gap-2 px-2 items-center border border-[#EE7354] py-2 w-52 rounded-md">
                    <button>
                        <Search color="#EE7354" />
                    </button>
                    <input type="search" name="" id="" className="text-black/50" placeholder="Pesquisar" />
                </div>
                <button type="button" className="bg-[#EE7354] rounded-md py-2 px-4 text-white cursor-pointer">Login</button>
            </nav>
        </div>
    )
};

export default Header;