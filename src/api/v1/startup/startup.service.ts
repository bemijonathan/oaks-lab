import { STATUS_CODES } from "@/src/types/app";
import { apiResponse } from "@/src/utils/api-responses";
import { IStage, stageSchema } from "../stage/stage.schema";
import stageService from "../stage/stage.service";
import { stepSchema } from "../step/step.schema";
import { Istartup, startupSchema } from "./startup.schema";

class startupService {
    serviceResponse = apiResponse.serviceResponse
    startupSchema = startupSchema

    validateObject(data: Istartup) {
        if (!data.name) {
            throw new Error('Name is required!')
        }
    }

    async getOne(id: string) {
        const startup = await this.startupSchema.getById(id)

        let stages = await stageSchema.findMany({ startUpId: id });

        stages = await Promise.all(
            stages.map(async (stage: IStage) => {
                stage.steps = await stepSchema.findMany({ stageId: stage.id })
                return stage
            })
        )

        startup.stages = stages;

        if (!startup) {
            return this.serviceResponse({}, false, STATUS_CODES.NOT_FOUND, 'startup not found!')
        }
        return this.serviceResponse(startup, true, STATUS_CODES.SUCCESS)
    }

    async createOne(startupDetails: Istartup, id: string) {
        this.validateObject(startupDetails);
        let startup = await this.startupSchema.findOne({ name: startupDetails.name.toLowerCase() })
        if (startup) {
            return this.serviceResponse({}, false, STATUS_CODES.CONFLICT, 'startup already exist!')
        }
        startup = await this.startupSchema.insertItem({
            name: startupDetails.name.toLowerCase()
        })
        return this.serviceResponse(startup, true, STATUS_CODES.SUCCESS)
    }

    async updateOne(id: string, startupDetails: Istartup) {
        const startupExists = await this.startupSchema.getById(id)
        const startup = await this.startupSchema.updateItem(id, { ...startupExists, ...startupDetails })
        return this.serviceResponse(startup, true, STATUS_CODES.SUCCESS)
    }

    async deleteOne(id: string) {
        const startup = await this.startupSchema.getById(id)
        if (!startup) {
            return this.serviceResponse({}, false, STATUS_CODES.NOT_FOUND, 'startup not found!')
        }
        const deletedItem = await this.startupSchema.deleteItem(id);
        return this.serviceResponse(deletedItem, true, STATUS_CODES.SUCCESS)
    }
}

export default new startupService()