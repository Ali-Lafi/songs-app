import { Inject } from "@nestjs/common";
import { Song } from "../domain/song.entity";
import { CreateSongData, ListSongsParams, PaginatedSongs, SongRepository } from "../domain/song.repository";
import { DATABASE_CONNECTION } from "../../database/database-connection";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from './schema'
import { count, ilike, or } from "drizzle-orm";
export class DrizzleSongRepository extends SongRepository{
  
  constructor(@Inject(DATABASE_CONNECTION) private readonly database : NodePgDatabase<typeof schema>){
    super();
  }

    override async create(data: CreateSongData): Promise<Song> {
        const createdSong = await this.database.insert(schema.songsTable).values(data).returning();
        return createdSong[0];
    }
    override async findMany(params: ListSongsParams): Promise<PaginatedSongs> {
        const {pageNumber, pageSize, search} = params;
        
        const searchQuery = search?
            or(ilike(schema.songsTable.name, search),ilike(schema.songsTable.singer, search),ilike(schema.songsTable.album, search))
            : undefined;
        const offset = pageNumber -1;
        
        const items = await this.database.select().from(schema.songsTable).where(searchQuery).limit(pageSize).offset(offset);
        const total = await this.database.select({value:count()}).from(schema.songsTable).where(searchQuery);
        
        return{
            items,
            total: total[0].value,
            pageNumber,
            pageSize
        }
        
    }

}