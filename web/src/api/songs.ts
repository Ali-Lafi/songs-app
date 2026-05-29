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

export async function getSongs(params:{pageNumber:number; pageSize:number; search?:string}): Promise<SongsResponse>{
    const searchParams = new URLSearchParams({pageNumber: String(params.pageNumber), pageSize: String(params.pageSize)});
    if(params.search) searchParams.set('search', params.search)
    
    const response = await fetch(`http://localhost:3000/api/songs?${searchParams.toString()}`);
    if(!response.ok) throw new Error('Failed to fetch songs');

    return response.json();
}