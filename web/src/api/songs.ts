import type { CreateSongInput, ListSongsInput } from '@org/contracts';

export type Song = {
    id:number;
    name: string;
    singer: string;
    coverImageUrl: string|null;
    album: string | null;
    duration: string | null;
    createdAt: string;
}

export type SongsResponse={
    items: Song[];
    total: number;
    pageNumber: number;
    pageSize: number;
}

export async function getSongs(params:ListSongsInput): Promise<SongsResponse>{
    const searchParams = new URLSearchParams({pageNumber: String(params.pageNumber), pageSize: String(params.pageSize)});
    if(params.search) searchParams.set('search', params.search)
    
    const response = await fetch(`http://localhost:3000/api/songs?${searchParams.toString()}`);
    if(!response.ok) throw new Error('Failed to fetch songs');

    return response.json();
}

export async function createSong(input:CreateSongInput):Promise<Song>{
    const token = localStorage.getItem('accessToken');
    const response = await fetch('http://localhost:3000/api/songs',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(input)
    });
    
    if(response.status === 401){
        localStorage.removeItem('accessToken');
        window.location.href = '/login?reason=session-expired';

        throw new Error('Session Expired')
    }

    if(!response.ok) throw new Error('Failed to create song');

    return response.json();
}