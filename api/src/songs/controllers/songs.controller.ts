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
    const parsedPageNumber = Number(pageNumber);
    const parsedPageSize = Number(pageSize);

    const safePageNumber = (Number.isFinite(parsedPageNumber) && parsedPageNumber>0) ? parsedPageNumber: 1;
    const safePageSize = (Number.isFinite(parsedPageSize) && parsedPageSize>0) ? parsedPageSize: 10;
    
    return this.queryBus.execute(new ListSongsQuery({pageNumber:Number(safePageNumber), pageSize:Number(safePageSize), search}))
  }

  @Post()
  async create(@Body() body: unknown){
    const request = createSongSchema.safeParse(body);
    if(!request.success) throw new BadRequestException(z.treeifyError( request.error));

    return this.commandBus.execute(new CreateSongCommand(request.data));
  }
}
