import { Request, Response } from "express";
import { NewsEntity } from './task.pod.entity';
import { AppDataSource } from './databaseConfig';
import { Repository} from 'typeorm';
import { FindOperator } from "typeorm/find-options/FindOperator";


export class News {

    private newsRepository: Repository<NewsEntity>;

    constructor() {
        this.newsRepository = AppDataSource.getRepository(NewsEntity)
    };

 // Handle the POST request to build a news agency
    public async buildNewsAgency(req: Request, res: Response): Promise<Response>{
        
        const { newsAgency, newsHeadline, newsText, agencyName } = req.body;

        try {

            const news = this.newsRepository.create({
                newsAgency,
                newsHeadline,
                newsText,
                agencyName,
            });

            const buildNews = await this.newsRepository.save(news);


            if (!buildNews) {
             return  res.status(400).json({
                    success: false,
                    msg : "Error Not Found"
                })
            }

           return res.status(201).json({
                success: true,
                msg: 'News registered successfully'
           });
            
        } catch (err) {
            console.log(err)
           return  res.status(500).json({
                success: false,
                msg :"Internal Server Error"
            })
        }
    }
  // Handle the PUT request to update a news agency
    public async updateNewsAgency(req: Request, res: Response): Promise<Response> {
        
        const { id } = req.params;
        
        const { newsAgency, newsHeadline, newsText, agencyName } = req.body;
       
        try {

            const updateNewsAgency = await this.newsRepository.findOneBy(
                    { id: id }
            )
            
            await this.newsRepository
                .createQueryBuilder()
                .update()
                .set({
                    newsAgency,
                    newsHeadline,
                    newsText,
                    agencyName
                })
                .where("id = :id", { id: id })
                .execute();
            
            if (!updateNewsAgency) {
                return res.status(404).json({
                    success: false,
                    msg :"Error Not Found for update NewsAgency"
                })
            };

            return res.status(201).json({
                success: true,
                msg: "Successfully update NewsAgency"
            });

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                msg: "Internal Server Error"
            });
        }
    }
// Handle the DELETE request to delete a news agency
    public async deleteNewsAgency(req: Request, res: Response): Promise<Response>{

        const { id } = req.params;
        
        try {

            const result = await this.newsRepository.findOneBy({ id });

            if (!result) {
                return res.status(404).json({
                     success: false,
                     msg : "Error not Found For find id of NEwsAgency"
                })
            }

            this.newsRepository
                .createQueryBuilder()
                .delete()
                .from(NewsEntity)
                .where("id = :id", { id: id})
                .execute();
            
            return res.status(200).json({
                success: true,
                msg :"Successfully delete data query of entity "
            })

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                msg : "Internal Server Error"
        })
        }
    }
// Handle the GET request to fetch news agency information
    public async newsInformation(req: Request, res: Response): Promise<Response> {

        
        const { newsAgency, date } = req.query;
        
        try { 

            const resultNewAgency = await this.newsRepository.find({
                where : {
                    newsAgency: newsAgency as string,
                    date: date as unknown as FindOperator<Date>,
                }
            })

            if (resultNewAgency.length===0) {
                return res.status(404).json({
                    success: false,
                    msg : "No news found for the specified agency and date"
                })
            }

            return res.status(200).json({
                success: true,
                data:{resultNewAgency},
                msg : "Successfully  get NewAgency with specified date"
            })

        } catch (err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                msg : "Internal Server Error"
            })
        }
    };
};


