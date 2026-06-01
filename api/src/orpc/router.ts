import { apiContract } from "@org/contracts";
import {implement} from '@orpc/server'

const os = implement(apiContract)

export const orpcRouter ={
    auth:{
        login: os.auth.login.handler(async ({input}) =>{
            return {
                accessToken:""
            }
        })
    }
}
