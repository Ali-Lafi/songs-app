import { User } from "./users.entity";

export abstract class UsersRepository{
    abstract findByEmail(email:string):Promise<User>
}