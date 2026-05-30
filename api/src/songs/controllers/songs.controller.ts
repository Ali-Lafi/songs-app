import { BadRequestException, Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ListSongsQuery } from '../application/queries/list-songs.query';
import { CreateSongCommand } from '../application/commands/create-song.command';
import { createSongSchema, listSongsSchema } from '@org/contracts';
import {z} from 'zod'
import { JwtAuthGaurd } from '../../auth/infrastructure/jwt.guard';
@Controller('songs')
export class SongsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async findMany(@Query() query:unknown ) {
    const request = listSongsSchema.safeParse(query);
    if(!request.success)  throw new BadRequestException(z.treeifyError( request.error));
    
    return this.queryBus.execute(new ListSongsQuery(request.data))
  }

  @UseGuards(JwtAuthGaurd)
  @Post()
  async create(@Body() body: unknown){
    const request = createSongSchema.safeParse(body);
    if(!request.success) throw new BadRequestException(z.treeifyError( request.error));

    return this.commandBus.execute(new CreateSongCommand(request.data));
  }
}
