import { Request, Response, NextFunction } from "express";
import Joi from 'joi';

export const validateNewsAgency = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        newsAgency: Joi.string().regex(/^[a-zA-Z]+$/).required(),
        newsHeadline: Joi.string().regex(/^[a-zA-Z]+$/).required(),
        newsText: Joi.string().required(),
        agencyName: Joi.string().regex(/^[a-zA-Z]+$/).required(),
    })

    try {
        const { error } = schema.validate(req.body,{ allowUnknown: true });

        if (error) {
            
            const errorMessage = error.details.map((detail) => detail.message);

            if (errorMessage) {
                return res.status(400).json({
                    success: false,
                    msg: errorMessage.join(', ') // Join the error messages into a single string
                });
            }
        }
        
        return next();

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            msg: "Internal Server Error"
        });
    };
}
