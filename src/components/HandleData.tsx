import { SocialNetwork, UserHandle } from "../types"

type HandleDataProps = {
    data: UserHandle
}

const HandleData = ({data}:HandleDataProps) => {
    const linksEnabled:SocialNetwork[] = JSON.parse(data.links).filter((link : SocialNetwork)=> link.enabled)


    return (
        <>
            <div className="space-y-6 text-white">
                <p className="text-5xl text-center font-black">{data.handle}</p>
                {data.image && <img alt="imgen red social" src={data.image} className="max-w-[250px] mx-auto"/>}

                <p className="text-lg text-center font-bold">{data.description}</p>

                <div className="mt-20 flex flex-col gap-6">
                    {linksEnabled.length ? 
                    linksEnabled.map(link=>(
                        <a 
                        className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
                        href={link.url}
                        target="_blank"
                        rel="noreferrer noopenner"
                        key={link.name}
                        >
                            <img src={`/social/icon_${link.name}.svg`} alt="imagen red-social" className="w-12" />
                            <p className="text-black capitalize font-bold text-lg">
                            Visita Mi: {link.name}
                            </p>
                        </a>
                    ))
                        :
                    <p 
                    className="text-center"
                    >No existen links activos</p>}
                </div>
            </div>
        </>
    )
}
export default HandleData