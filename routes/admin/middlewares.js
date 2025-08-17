import { validationResult } from "express-validator";

export default {
    handleErrors(templateFunc,dataCb){
        return async (req,res,next) => {
            const errors = validationResult(req)

            if(!errors.isEmpty()){
                let data = {}
                if(dataCb){
                    data = await dataCb(req)
                }

                return res.send(templateFunc(data, errors))
            }

            next()
        }
    },

    requireAuth(req,res,next){
         if(!req.session.userId){
            res.redirect('/signin')
        }
        next()
    }
}