export type Song ={
    id: number;
    name: string;
    singer: string;
    coverImageUrl: string| null;
    album:string | null;
    duration: string | null;
    createdAt: Date;
}