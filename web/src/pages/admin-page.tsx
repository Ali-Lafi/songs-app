import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react"
import { createSong } from "../api/songs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AdminPage(){

    const [name, setName] =useState('');
    const [singer, setSinger] = useState('');
    const [album, setAlbum] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [duration, setDuration] = useState('');
    const [formError, setFormError] = useState('');

    const queryClient = useQueryClient();

    const createSongMutation = useMutation({
        mutationFn:createSong,
        onSuccess:()=>{
            setName('');
            setSinger('');
            setAlbum('');
            setCoverImageUrl('');
            setDuration('');
            queryClient.invalidateQueries({queryKey:['songs']})
        }
    })
    
    return (
    <div className="flex justify-center">
        <Card className="w-full max-w-xl ">
        <CardHeader>
            <CardTitle className="text-2xl">Add Song</CardTitle>
        </CardHeader>
        <CardContent>
         <form  className="grid gap-5" onSubmit={(event) =>{
            event.preventDefault();
            if(!name.trim() || !singer.trim()){
                setFormError('Song name and singer are required')
                return;
            }
           

            setFormError('');
            createSongMutation.mutate({name,singer,album, coverImageUrl: coverImageUrl || undefined, duration:duration || undefined });
        }}>
            <div className="grid gap-2">
            <Label htmlFor="name">Song Name</Label>
            <Input id="name" value={name} onChange={(event)=> setName(event.target.value)} placeholder="Enter song name"/>
            </div>
            
            <div className="grid gap-2">
            <Label htmlFor="album">Album</Label>
            <Input id="album" value={album} onChange={(event)=> setAlbum(event.target.value)} placeholder="Enter album name"/>
            </div>
          
            <div className="grid gap-2">
            <Label htmlFor="singer">Singer</Label>
            <Input id="singer" value={singer} onChange={(event)=> setSinger(event.target.value)} placeholder="Enter singer name"/>
            </div>
        
            <div className="grid gap-2">
            <Label htmlFor="coverImageUrl">Cover Image URL</Label>
            <Input id="coverImageUrl" value={coverImageUrl} onChange={(event)=> setCoverImageUrl(event.target.value)} placeholder="https://example.com/image.jpg"/>
            </div>
          
            <div className="grid gap-2">
            <Label htmlFor="duration">Duration</Label>
            <Input id="duration" value={duration} onChange={(event)=> setDuration(event.target.value)} placeholder="0:0"/>
            </div>
            <div className="flex justify-end">
            <Button className='w-fit cursor-pointer shadow-sm' variant='outline' type="submit" disabled={createSongMutation.isPending}> {createSongMutation.isPending? 'Creating...': 'Create Song'}</Button>
            </div>
        </form>

        {createSongMutation.isSuccess && <p className="text-sm text-green-600">Song Created Successfully !!!</p>}
        {createSongMutation.isError || formError && <p className="text-sm text-red-600">{formError || 'Song creation failed'}</p>}
        </CardContent>
        </Card>
        
       

    </div>)
}