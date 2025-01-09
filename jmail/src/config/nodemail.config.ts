import { dotenvValues } from "./env.config"

export  const nodeMailerConfig = {
    transport: {
        host : 'smtp.gmail.com', 
        port: 587,
        secure: false,
        auth: {
            user: dotenvValues.forwader,
            pass: dotenvValues.password
        },
    },
    defaults :  {
        from :`Nest js ${dotenvValues.forwader}`
    }
}