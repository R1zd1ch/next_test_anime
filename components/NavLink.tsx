import Link from 'next/link';

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label }) => {
  return (
    <Link href={href} passHref>
      <div className="p-2 border-2 rounded-md cursor-pointer hover:bg-neutral-800">{label}</div>
    </Link>
  );
};

export default NavLink;
