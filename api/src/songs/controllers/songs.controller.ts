import { BadRequestException, Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ListSongsQuery } from '../application/queries/list-songs.query';
import { CreateSongCommand } from '../application/commands/create-song.command';
import { createSongSchema } from './validation/create-songs.schema';
import {z} from 'zod'
@Controller('songs')
export class SongsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async findMany(
    @Query('pageNumber') pageNumber = '1',
    @Query('pageSize') pageSize = '10',
    @Query('search') search?: string,
  ) {
    return this.queryBus.execute(new ListSongsQuery({pageNumber:Number(pageNumber), pageSize:Number(pageSize), search}))
  }

  @Post()
  async create(@Body() body: unknown){
    const request = createSongSchema.safeParse(body);
    if(!request.success) throw new BadRequestException(z.treeifyError( request.error));

    return this.commandBus.execute(new CreateSongCommand(request.data));
  }
}
