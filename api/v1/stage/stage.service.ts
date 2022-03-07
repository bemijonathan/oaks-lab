import { STATUS_CODES } from "@/types/app";
import { apiResponse } from "@/utils/api-responses";
import { stepSchema } from "../step/step.schema";
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
        let stages = await this.stageSchema.getAll()
        stages = await Promise.all(
            stages.map(async (stage: IStage) => {
                stage.steps = await stepSchema.findMany({ stageId: stage.id })
                return stage
            })
        )
        return this.apiResponse.serviceResponse(stages, true, STATUS_CODES.SUCCESS)
    }

    async getOne(id: string) {
        const stage = await this.stageSchema.getById(id)
        if (!stage) {
            return this.apiResponse.serviceResponse({}, false, STATUS_CODES.NOT_FOUND, 'Stage not found!')
        }
        stage.steps = await stepSchema.findMany({ stageId: id })
        return this.apiResponse.serviceResponse(stage, true, STATUS_CODES.SUCCESS)
    }

    async createOne(stageDetails: IStage) {
        this.validateObject(stageDetails);
        const stageExist = await this.stageSchema.findOne({ name: stageDetails.name.toLowerCase() })
        if (stageExist) {
            return this.apiResponse.serviceResponse({}, false, STATUS_CODES.CONFLICT, 'Stage already exist!')
        }
        const stage = await this.stageSchema.insertItem({ name: stageDetails.name.toLowerCase(), completed: false })
        return this.apiResponse.serviceResponse(stage, true, STATUS_CODES.SUCCESS)
    }

    async updateOne(id: string, stageDetails: IStage) {
        const stage = await this.stageSchema.updateItem(id, { name: stageDetails })
        return this.apiResponse.serviceResponse(stage, true, STATUS_CODES.SUCCESS)
    }

    async deleteOne(id: string) {
        const stage = await this.stageSchema.getById(id)
        if (!stage) {
            return this.apiResponse.serviceResponse({}, false, STATUS_CODES.NOT_FOUND, 'Stage not found!')
        }
        const deletedItem = await this.stageSchema.deleteItem(id);
        await stepSchema.deleteMany({ stageId: id })
        return this.apiResponse.serviceResponse(deletedItem, true, STATUS_CODES.SUCCESS)
    }
}

export default new stageService()