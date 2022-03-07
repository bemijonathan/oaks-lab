import { STATUS_CODES } from "@/src/types/app";
import { apiResponse } from "@/src/utils/api-responses";
import { startupSchema } from "../startup/startup.schema";
import { stepSchema } from "../step/step.schema";
import { IStage, stageSchema } from "./stage.schema";

class stageService {
    serviceResponse = apiResponse.serviceResponse
    stageSchema = stageSchema

    private validateObject(data: IStage) {
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
        return this.serviceResponse(stages, true, STATUS_CODES.SUCCESS)
    }

    async getOne(id: string) {
        const stage = await this.stageSchema.getById(id)
        if (!stage) {
            return this.serviceResponse({}, false, STATUS_CODES.NOT_FOUND, 'Stage not found!')
        }
        stage.steps = await stepSchema.findMany({ stageId: id })
        return this.serviceResponse(stage, true, STATUS_CODES.SUCCESS)
    }

    async createOne(stageDetails: IStage, id: string) {
        this.validateObject(stageDetails);
        const stages = await this.stageSchema.findMany({ name: stageDetails.name.toLowerCase() })
        const startUpIds = stages.map((e: IStage) => e.startUpId)
        if (stages && startUpIds.includes(id)) {
            return this.serviceResponse({}, false, STATUS_CODES.CONFLICT, 'Stage already exist!')
        }
        const startUp = await startupSchema.getById(id);
        if (!startUp) {
            return this.serviceResponse({}, false, STATUS_CODES.NOT_FOUND, 'Startup not found!')
        }
        const stage = await this.stageSchema.insertItem({
            name: stageDetails.name.toLowerCase(),
            completed: false,
            locked: true,
            startUpId: id
        })
        return this.serviceResponse(stage, true, STATUS_CODES.SUCCESS)
    }

    async updateOne(id: string, stageDetails: IStage) {
        const stageExists = await this.stageSchema.getById(id)
        if (!stageExists) {
            return this.serviceResponse({}, false, STATUS_CODES.NOT_FOUND, 'Step not found!')
        }
        if (stageDetails.completed) {
            if (stageDetails.locked) {
                return this.serviceResponse({}, false, STATUS_CODES.CONFLICT, 'Stage is locked!')
            }
        }
        return this.serviceResponse(await this.stageSchema.updateItem(id, stageDetails), true, STATUS_CODES.SUCCESS)
    }

    async deleteOne(id: string) {
        const stage = await this.stageSchema.getById(id)
        if (!stage) {
            return this.serviceResponse({}, false, STATUS_CODES.NOT_FOUND, 'Stage not found!')
        }
        const deletedItem = await this.stageSchema.deleteItem(id);
        await stepSchema.deleteMany({ stageId: id })
        return this.serviceResponse(deletedItem, true, STATUS_CODES.SUCCESS)
    }
}

export default new stageService()