import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react"
import { createSong } from "../api/songs";

export function AdminPage(){

    const [name, setName] =useState('');
    const [singer, setSinger] = useState('');
    const [album, setAlbum] = useState('');
    const queryClient = useQueryClient();

    const createSongMutation = useMutation({
        mutationFn:createSong,
        onSuccess:()=>{
            setName('');
            setSinger('');
            setAlbum('');
            queryClient.invalidateQueries({queryKey:['songs']})
        }
    })
    
    return (<div>
        <h1>Add Song</h1>
        <form onSubmit={(event) =>{
            event.preventDefault();
            createSongMutation.mutate({name,singer,album});
        }}>
            <label>Name</label>
            <input value={name} onChange={(event)=> setName(event.target.value)}/>
            
            <label>Singer</label>
            <input value={singer} onChange={(event)=> setSinger(event.target.value)}/>

            <label>Album</label>
            <input value={album} onChange={(event)=> setAlbum(event.target.value)}/>
            <button type="submit" disabled={createSongMutation.isPending}> {createSongMutation.isPending? 'Creating...': 'Create Song'}</button>
        </form>

        {createSongMutation.isSuccess && <p>Song Created Successfully !!!</p>}
        {createSongMutation.isError && <p>Failed to create song</p>}

    </div>)
}