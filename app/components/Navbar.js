// app/components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white px-6 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">Atul Kumbhar</div>
                <ul className="flex space-x-6">
                    <li><Link href="#about" className="hover:text-blue-400">About</Link></li>
                    <li><Link href="#skills" className="hover:text-blue-400">Skills</Link></li>
                    <li><Link href="#projects" className="hover:text-blue-400">Projects</Link></li>
                    <li><Link href="#contact" className="hover:text-blue-400">Contact</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
