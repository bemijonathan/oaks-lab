
import { apiResponse } from "@/utils/api-responses";
import stepService from "./step.service";


export class StepController {
    private successResponse = apiResponse.successResponse
    private errorResponse = apiResponse.errorResponse
    private service = stepService

    public getOne = async (req: any, res: any, next: any) => {
        try {
            const serviceResponse = await this.service.getOne(req.params.id)
            return this.successResponse(res, serviceResponse)
        } catch (error) {
            return this.errorResponse(res, error as Error);
        }
    }

    public deleteOne = async (req: any, res: any, next: any) => {
        try {
            const serviceResponse = await this.service.deleteOne(req.params.id)
            return this.successResponse(res, serviceResponse)
        } catch (error) {
            return this.errorResponse(res, error as Error);
        }
    }

    public createOne = async (req: any, res: any, next: any) => {
        try {
            const serviceResponse = await this.service.createOne(req.body, req.params.id)
            return this.successResponse(res, serviceResponse)
        } catch (error) {
            return this.errorResponse(res, error as Error);
        }
    }

    public updateOne = async (req: any, res: any, next: any) => {
        try {
            const serviceResponse = await this.service.updateOne(req.params.id, req.body)
            return this.successResponse(res, serviceResponse)
        } catch (error) {
            return this.errorResponse(res, error as Error);
        }
    }
}



export const stepController = new StepController()