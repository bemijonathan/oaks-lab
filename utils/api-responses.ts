type meta = {
  data?: any,
  message?: string,
  code?: number
}


class ApiResponse {
  /**
   * 
   * @param data response DAta
   * @param success boolean
   * @param code number status code
   * @returns 
   */
  serviceResponse(data: any, success: boolean, code: number, message?: string): {
    data: any,
    success: boolean,
    code: number,
    message?: string
  } {
    return {
      data,
      success,
      code,
      message
    }
  }

  /**
   * @param res Response
   * @param meta serviceResponse
   * @param error Error Object
   * @returns 
   */
  errorResponse(res: any, meta?: meta, error?: Error) {
    // logger.error(error)
    const { message, code } = meta || {};
    return res.status(code || 500).send({
      message: error?.message || message || 'An Error Occured!',
      status: false
    })
  }

  /**
   * @param res Response
   * @param serviceResponse 
   * @returns 
   */
  successResponse(res: any, serviceResponse: {
    data: any,
    message?: string,
    code: number,
    success: boolean
  }) {

    const { data, message, code, success } = serviceResponse;
    console.log(serviceResponse)
    if (success) {
      return res.status(code || 200).send({
        data,
        message: message || 'Success',
        status: true,
      })
    }
    return apiResponse.errorResponse(res, { code, message: message || 'Something went wrong' });
  }
}


export const apiResponse = new ApiResponse()