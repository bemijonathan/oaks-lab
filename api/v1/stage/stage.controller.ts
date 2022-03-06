
import { apiResponse } from "@/utils/api-responses";
import stageService from "./stage.service";


export class StageController {
    private apiResponse = apiResponse
    private service = stageService
    public getAll = async (req: any, res: any, next: any) => {
        try {
            const stage = await this.service.getAll()
            return this.apiResponse.successResponse(res, {
                data: stage.data,
            })
        } catch (error) {
            return this.apiResponse.errorResponse(res, error as Error);
        }
    }

    public getOne = async (req: any, res: any, next: any) => {
        try {
            const stage = await this.service.getOne(req.params.id)
            return this.apiResponse.successResponse(res, {
                data: stage.data,
            })
        } catch (error) {
            return this.apiResponse.errorResponse(res, error as Error);
        }
    }

    public deleteOne = async (req: any, res: any, next: any) => {
        try {
            const stage = await this.service.getOne(req.params.id)
            return this.apiResponse.successResponse(res, {
                data: stage.data,
            })
        } catch (error) {
            return this.apiResponse.errorResponse(res, error as Error);
        }
    }

    public createOne = async (req: any, res: any, next: any) => {
        try {
            const stage = await this.service.createOne(req.body)
            return this.apiResponse.successResponse(res, {
                data: stage.data,
            })
        } catch (error) {
            return this.apiResponse.errorResponse(res, error as Error);
        }
    }

    public updateOne = async (req: any, res: any, next: any) => {
        try {
            const stage = await this.service.updateOne(req.params.id, req.body)
            return this.apiResponse.successResponse(res, {
                data: stage.data,
            })
        } catch (error) {
            return this.apiResponse.errorResponse(res, error as Error);
        }
    }
}

export const stageController = new StageController()