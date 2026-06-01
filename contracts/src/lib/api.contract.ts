import {oc} from '@orpc/contract';
import { loginResponseSchema, LoginSchema } from './auth.contract.js';
import { createSongSchema, listSongsSchema, paginatedSongsSchema, songSchema } from './songs.contract.js';

export const apiContract = {
    auth:{
        login: oc.route({method:'POST', path:'/orpc/auth/login'}).input(LoginSchema).output(loginResponseSchema)
        
    },
    songs:{
        list:oc.route({method:'GET', path:'/orpc/songs'}).input(listSongsSchema).output(paginatedSongsSchema),
        create: oc.route({method:'POST', path:'/orpc/songs'}).input(createSongSchema).output(songSchema)
    }
}