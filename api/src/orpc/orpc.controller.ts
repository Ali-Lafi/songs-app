import { Controller, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Implement, implement } from '@orpc/nest';
import { apiContract } from '@org/contracts';

import { LoginCommand } from '../auth/application/login.command';
import { ListSongsQuery } from '../songs/application/queries/list-songs.query';
import { CreateSongCommand } from '../songs/application/commands/create-song.command';
import { JwtAuthGaurd } from '../auth/infrastructure/jwt.guard';

@Controller()
export class OrpcController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Implement(apiContract.auth.login)
  login() {
    return implement(apiContract.auth.login).handler(({ input }) => {
      return this.commandBus.execute(
        new LoginCommand(input.email, input.password),
      );
    });
  }

  @Implement(apiContract.songs.list)
  listSongs() {
    return implement(apiContract.songs.list).handler(({ input }) => {
        try{
      return this.queryBus.execute(new ListSongsQuery(input));

        }catch(ex){
            console.log(ex);
            throw ex;
        }
    });
  }

    @UseGuards(JwtAuthGaurd)
  @Implement(apiContract.songs.create)
  createSong() {
    return implement(apiContract.songs.create).handler(({ input }) => {
      return this.commandBus.execute(new CreateSongCommand(input));
    });
  }
}