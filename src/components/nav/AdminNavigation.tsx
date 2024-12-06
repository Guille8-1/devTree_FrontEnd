import { useQueryClient } from '@tanstack/react-query';

const AdminNavigation = () => {
  const queryClient = useQueryClient()
  const logOut = () => {
    localStorage.removeItem('auth_token')
    queryClient.invalidateQueries({queryKey: ['user']})
  }
  return (
    <>
      <button
        className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
        onClick={logOut}
      >
        Cerrar Sesión
      </button>
    </>
  );
};

export default AdminNavigation;
