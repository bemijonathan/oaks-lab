import { STATUS_CODES } from "@/types/app";
import { apiResponse } from "@/utils/api-responses";
import { IStage, stageSchema } from "./stage.schema";

class stageService {
    apiResponse = apiResponse
    stageSchema = stageSchema

    validateObject(data: IStage) {
        if (!data.name) {
            throw new Error('Name is required!')
        }
    }

    async getAll() {
        const stages = await this.stageSchema.getAll()
        return this.apiResponse.serviceResponse(stages, true, STATUS_CODES.SUCCESS)
    }

    async getOne(id: string) {
        const stage = await this.stageSchema.getById(id)
        return this.apiResponse.serviceResponse(stage, true, STATUS_CODES.SUCCESS)
    }

    async createOne(stageDetails: IStage) {
        this.validateObject(stageDetails);
        const stage = await this.stageSchema.insertItem(stageDetails)
        return this.apiResponse.serviceResponse(stage, true, STATUS_CODES.SUCCESS)
    }

    async updateOne(id: string, stageDetails: IStage) {
        const stage = await this.stageSchema.updateItem(id, stageDetails)
        return this.apiResponse.serviceResponse(stage, true, STATUS_CODES.SUCCESS)
    }
}

export default new stageService()