import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateSongData, SongRepository } from "../../domain/song.repository";

export class CreateSongCommand{
    constructor(public readonly data: CreateSongData){}
}

@CommandHandler(CreateSongCommand)
export class CreateSongHandler implements ICommandHandler<CreateSongCommand> {
    constructor(private readonly songRepo: SongRepository){}

    async execute(commmand: CreateSongCommand){
        return this.songRepo.create(commmand.data);
    }
}