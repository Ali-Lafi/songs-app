import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginSchema } from '@org/contracts';
import {z} from 'zod'
import { LoginCommand } from '../application/login.command';

@Controller('auth')
export class AuthController {
    constructor(private readonly commandBus: CommandBus){}

    @Post('login')
    async login(@Body() body:unknown){
        const request = LoginSchema.safeParse(body);
        if(!request.success) throw new BadRequestException(z.treeifyError(request.error));

        return this.commandBus.execute(new LoginCommand(request.data.email, request.data.password));
    }
}
