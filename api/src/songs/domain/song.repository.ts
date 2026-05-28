import { Song } from './song.entity';

export type CreateSongData = {
  name: string;
  singer: string;
  coverImageUrl?: string;
  album?: string;
  duration?: string;
};

export type ListSongsParams = {
  pageNumber: number;
  pageSize: number;
  search?: string;
};

export type PaginatedSongs = {
  items: Song[];
  total: number;
  pageNumber: number;
  pageSize: number;
};

export abstract class SongRepository{
    abstract create(data:CreateSongData): Promise<Song>;
    abstract findMany(params:ListSongsParams):Promise<PaginatedSongs>;
}