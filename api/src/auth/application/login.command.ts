import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UsersRepository } from "../../users/domain/users.repository";
import {JwtService} from '@nestjs/jwt'
import { UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs'

export class LoginCommand{
    constructor(public readonly email:string, public readonly password:string){}
} 

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand>{

    constructor(private readonly usersRepo: UsersRepository, private readonly jwtService: JwtService){}

    async execute(command: LoginCommand): Promise<any> {
        const user = await this.usersRepo.findByEmail(command.email)

        if(!user) throw new UnauthorizedException("Invalid email or password");

        const isPasswordValid = await bcrypt.compare(command.password, user.passwordHash)
    
        if(!isPasswordValid) throw new UnauthorizedException("Invalid email or password");

        const accessToken = await this.jwtService.signAsync({
            sub:user.id,
            email:user.email,
            role: user.role
        });

        return {accessToken:accessToken};
    }

}