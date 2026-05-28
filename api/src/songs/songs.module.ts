import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SongRepository } from './domain/song.repository';
import { DrizzleSongRepository } from './infrastructure/drizzle-song.repository';
import { CreateSongCommand, CreateSongHandler } from './application/commands/create-song.command';
import { ListSongsHandler, ListSongsQuery } from './application/queries/list-songs.query';
import { SongsController } from './controllers/songs.controller';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [DatabaseModule, CqrsModule],
  providers: [
    {
      provide: SongRepository,
      useClass: DrizzleSongRepository,
    },
    CreateSongHandler,
    ListSongsHandler,
  ],
  exports: [SongRepository],
  controllers: [SongsController],
})
export class SongsModule {}
