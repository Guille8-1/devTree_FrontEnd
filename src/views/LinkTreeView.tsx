import { useEffect, useState } from "react"
import { social } from "../data/social"
import DevTreeInput from "../components/DevTreeInput";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/DevTreeAPI";
import { User, SocialNetwork } from "../types";

const LinkTreeView = () => {
    const [treeLinks, setTreeLinks] = useState(social);

    const queryClient = useQueryClient();
    const user:User = queryClient.getQueryData(['user'])!
    
    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error)=>{
            toast.error(error.message);
        },
        onSuccess: ()=>{
            toast.success('Direcciones URL actualizadas!');
        }
    })

    useEffect(()=>{
        const updatedData = treeLinks.map( item => {
            const userLink = JSON.parse(user.links).find((link: SocialNetwork)=>link.name === item.name)
            if(userLink){
                return {...item, url: userLink.url, enabled: userLink.enabled}
            }
            return item
        })
        setTreeLinks(updatedData)
    },[])

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedLinks = treeLinks.map(link=>{
            if(link.name === e.target.name){
                return {...link, url: e.target.value}
            }
            return link
        })
        setTreeLinks(updatedLinks);
    }
    const links: SocialNetwork[] = JSON.parse(user.links);

    const handleEnableLink = (socialUrl: string)=>{
        const updatedLinks = treeLinks.map(link => {
            if(link.name === socialUrl){
                if(isValidUrl(link.url)){
                    return {...link, enabled: !link.enabled}
                } else {
                    toast.error("Url No Valida")
                }
            }
            return link
        })
        setTreeLinks(updatedLinks);

        let updatedItems : SocialNetwork[] = [];

        const selectSocialNetwork = updatedLinks.find(link => link.name === socialUrl);
        if(selectSocialNetwork?.enabled){
            const id = links.filter(link => link.id > 0).length + 1
            if(links.some(link => link.name === socialUrl)){
                
                updatedItems = links.map(link => {
                    if(link.name === socialUrl){
                        return {
                            ...link,
                            enabled: true,
                            id
                        }
                    }else{
                       return link 
                    }
                })
            }else {
                const newItem = {
                    ...selectSocialNetwork,
                    id
                }
                updatedItems = [...links, newItem]
            }
        } else {
          const indexToUpdated = links.findIndex(link => link.name === socialUrl)
          updatedItems = links.map(link =>{
            if(link.name === socialUrl){
                return {
                    ...link,
                    id:0,
                    enabled: false
                }
            } else if(link.id > indexToUpdated){
                return {
                    ...link,
                    id: link.id - 1
                }
            } else {
                return link
            }
          })
        }
          console.log(updatedItems);

        queryClient.setQueryData(['user'], (prevData:User)=>{ 
            return {
                ...prevData, 
                links: JSON.stringify(updatedItems)
            }
        })
    }
    return (
        <>
            <div className="space-y-5">
                {treeLinks.map( item =>(
                   <DevTreeInput 
                    key={item.name}
                    item={item}
                    handleEnableLink={handleEnableLink}
                    handleUrlChange={handleUrlChange}
                   /> 
                ))}
            </div>
            <button 
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 font-bold mt-10 rounded-lg"
                onClick={()=>mutate(queryClient.getQueryData(['user'])!)}
            >Guardar Cambios</button>
        </>
    )
}

export default LinkTreeView