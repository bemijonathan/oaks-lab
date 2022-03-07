import { STATUS_CODES } from "@/types/app";
import { apiResponse } from "@/utils/api-responses";
import { stageSchema } from "../stage/stage.schema";
import { IStep, stepSchema } from "./step.schema";

class stepService {
    apiResponse = apiResponse
    stepSchema = stepSchema

    validateObject(data: IStep) {
        if (!data.name) {
            throw new Error('Name is required!')
        }

        if (data.stageId) {
            throw new Error('StageId is not required!')
        }
    }

    async getOne(id: string) {
        const step = await this.stepSchema.getById(id)
        if (!step) {
            return this.apiResponse.serviceResponse({}, false, STATUS_CODES.NOT_FOUND, 'Step not found!')
        }
        return this.apiResponse.serviceResponse(step, true, STATUS_CODES.SUCCESS)
    }

    async createOne(stepDetails: IStep, id: string) {
        this.validateObject({ ...stepDetails, stageId: id });
        const stepExist = await this.stepSchema.findOne({ name: stepDetails.name.toLowerCase(), stepId: id })
        if (stepExist) {
            return this.apiResponse.serviceResponse({}, false, STATUS_CODES.CONFLICT, 'Step already exist!')
        }
        const stageExist = await this.stepSchema.getById(id)
        if (!stageExist) {
            return this.apiResponse.serviceResponse({}, false, STATUS_CODES.NOT_FOUND, 'Stage not found!')
        }
        if (stepDetails.stageId) {
            return this.apiResponse.serviceResponse({}, false, STATUS_CODES.NOT_FOUND, 'Stage not found!')
        }
        const step = await this.stepSchema.insertItem({
            name: stepDetails.name.toLowerCase(),
            completed: false,
            stepId: id
        })
        return this.apiResponse.serviceResponse(step, true, STATUS_CODES.SUCCESS)
    }

    async updateOne(id: string, stepDetails: IStep) {
        const stepExists = await this.stepSchema.getById(id)
        if (!stepExists) {
            return this.apiResponse.serviceResponse({}, false, STATUS_CODES.NOT_FOUND, 'Step not found!')
        }
        if (stepDetails.completed) {
            // get all the step with this stage Id
            const steps = await this.stepSchema.findMany({ stageId: id })

            // // find the index of the current step
            const currentStepIndex = steps.findIndex((step: IStep) => step.id === id)

            // // find the index of the previous step
            const previousStepIndex = currentStepIndex - 1

            // // check if the previous step is completed

            if (previousStepIndex > 0 && !steps[previousStepIndex].completed) {
                return this.apiResponse.serviceResponse({}, false, STATUS_CODES.BAD_REQUEST, 'Previous step is not completed!')
            }
            // if currentStepIndex is the last step then complete the stage

            if (currentStepIndex === steps.length - 1) {
                const stage = await stageSchema.getById(id)
                if (!stage) {
                    return this.apiResponse.serviceResponse({}, false, STATUS_CODES.NOT_FOUND, 'Stage not found!')
                }
                await stageSchema.updateItem(id, { completed: true })
            }
        }
        const step = await this.stepSchema.updateItem(id, stepDetails)
        return this.apiResponse.serviceResponse(step, true, STATUS_CODES.SUCCESS)
    }

    async deleteOne(id: string) {
        const step = await this.stepSchema.getById(id)
        if (!step) {
            return this.apiResponse.serviceResponse({}, false, STATUS_CODES.NOT_FOUND, 'Step not found!')
        }
        const deletedItem = await this.stepSchema.deleteItem(id);
        return this.apiResponse.serviceResponse(deletedItem, true, STATUS_CODES.SUCCESS)
    }
}

export default new stepService()