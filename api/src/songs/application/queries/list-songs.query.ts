import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ListSongsParams, PaginatedSongs, SongRepository } from "../../domain/song.repository";

export class ListSongsQuery{
    constructor(public readonly params: ListSongsParams){}
}

@QueryHandler(ListSongsQuery)
export class ListSongsHandler implements IQueryHandler<ListSongsQuery>{
    constructor(private readonly songsRepo: SongRepository){}
    execute(query: ListSongsQuery): Promise<PaginatedSongs> {
        return this.songsRepo.findMany(query.params);
    }

}