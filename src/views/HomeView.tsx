import HeaderComponent from "../components/Header"
import SearchForm from "../components/SearchForm"

const HomeView = () => {
    return (
        <>
            <HeaderComponent />

            <main className="bg-gray-200 py-10 min-h-screen lg:bg-home bg-no-repeat bg-right-top lg:bg-home-xl">
                <div className="max-w-5xl mx-auto mt-10">
                    <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
                        <h1 className="text-6xl font-black">
                            Todos las <span className="text-cyan-400"> Redes Sociales </span>
                            En un enlace.
                        </h1>

                        <p className="text-slate-800 text-xl">Conecta con mas clientes compartiendo proyectos desde tus redes sociales activas</p>

                        <SearchForm />
                    </div>
                </div>
            </main>
        </>
    )
}
export default HomeView