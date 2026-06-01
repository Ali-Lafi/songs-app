import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ORPCModule } from "@orpc/nest";
import { AuthModule } from "../auth/auth.module";
import { SongsModule } from "../songs/songs.module";
import { OrpcController } from "./orpc.controller";


@Module({
    imports: [ORPCModule.forRoot({}),CqrsModule, AuthModule, SongsModule],
    controllers:[OrpcController]
})
export class OrpcModule{}
