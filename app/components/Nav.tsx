import Link from "next/link";

const Nav = () => {
  return (
    <div>
      <nav className="flex flex-row text-base">
        <Link className="underline mr-4" href="/">
          Home
        </Link>
        <Link className="underline mr-4" href="/srroster">
          Roster
        </Link>
        <Link className="underline" href="/activeprojects">
          Active Project
        </Link>
      </nav>
    </div>
  );
};

export default Nav;
