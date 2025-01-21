import { useUser } from "../context/UserContext";

const Header: React.FC = () => {
  const { user, logout } = useUser();

  return (
    <header className="bg-blue-500 text-white p-4 flex flex-row justify-between items-center">
      <h1 className="text-xl font-bold">Journal App</h1>
      <div className="flex flex-row gap-4 items-center">
        Ciao, {user?.name}
        <button
          onClick={() => logout()}
          className="px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
