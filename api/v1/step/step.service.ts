import { STATUS_CODES } from "@/types/app";
import { apiResponse } from "@/utils/api-responses";
import { stageSchema } from "../stage/stage.schema";
import { IStep, stepSchema } from "./step.schema";

class stepService {
    serviceResponse = apiResponse.serviceResponse
    stepSchema = stepSchema

    validateObject(data: IStep) {
        if (!data.name) {
            throw new Error('Name is required!')
        }

        if (!data.stageId) {
            throw new Error('StageId is  required!')
        }
    }

    async getOne(id: string) {
        const step = await this.stepSchema.getById(id)
        if (!step) {
            return this.serviceResponse({}, false, STATUS_CODES.NOT_FOUND, 'Step not found!')
        }
        return this.serviceResponse(step, true, STATUS_CODES.SUCCESS)
    }

    async createOne(stepDetails: IStep, id: string) {
        this.validateObject({ ...stepDetails, stageId: id, completed: false });
        const steps = await this.stepSchema.findMany({ name: stepDetails.name.toLowerCase() })
        const stageIds = steps.map((e: IStep) => e.stageId)
        if (steps && stageIds.includes(id)) {
            return this.serviceResponse({}, false, STATUS_CODES.CONFLICT, 'Step already exist!')
        }
        const stageExist = await stageSchema.getById(id)
        if (!stageExist) {
            return this.serviceResponse({}, false, STATUS_CODES.NOT_FOUND, 'Stage not found!')
        }
        const step = await this.stepSchema.insertItem({
            name: stepDetails.name.toLowerCase(),
            completed: false,
            stageId: id
        })
        return this.serviceResponse(step, true, STATUS_CODES.SUCCESS)
    }

    async updateOne(id: string, stepDetails: IStep) {
        const stepExists = await this.stepSchema.getById(id)
        if (!stepExists) {
            return this.serviceResponse({}, false, STATUS_CODES.NOT_FOUND, 'Step not found!')
        }
        const stage = await stageSchema.getById(stepExists.stageId)
        if (!stage) {
            return this.serviceResponse({}, false, STATUS_CODES.NOT_FOUND, 'Stage not found!')
        }
        if (stepDetails.completed) {
            // get all the step with this stage Id
            const steps = await this.stepSchema.findMany({ stageId: stepExists.stageId })

            // // find the index of the current step
            const currentStepIndex = steps.findIndex((step: IStep) => step.id === id)

            // // find the index of the previous step
            const previousStepIndex = currentStepIndex - 1

            // // check if the previous step is completed

            if (previousStepIndex >= 0 && !steps[previousStepIndex].completed) {
                return this.serviceResponse({}, false, STATUS_CODES.BAD_REQUEST, 'Previous step is not completed!')
            }
            // if currentStepIndex is the last step then complete the stage
            if (currentStepIndex === steps.length - 1) {
                await stageSchema.updateItem(stepExists.stageId, { ...stage, completed: true, locked: false })
            }
        }
        const step = await this.stepSchema.updateItem(id, { ...stepExists, ...stepDetails })
        return this.serviceResponse(step, true, STATUS_CODES.SUCCESS)
    }

    async deleteOne(id: string) {
        const step = await this.stepSchema.getById(id)
        if (!step) {
            return this.serviceResponse({}, false, STATUS_CODES.NOT_FOUND, 'Step not found!')
        }
        const deletedItem = await this.stepSchema.deleteItem(id);
        return this.serviceResponse(deletedItem, true, STATUS_CODES.SUCCESS)
    }
}

export default new stepService()