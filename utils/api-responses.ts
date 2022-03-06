type meta = {
  data?: any,
  message?: string,
  code?: number
}


class ApiResponse {
  serviceResponse(data: any, success: boolean, code: number): {
    data: any,
    success: boolean,
    code: number
  } {
    return {
      data,
      success,
      code
    }
  }

  errorResponse(res: any, error: Error, meta?: meta) {
    // logger.error(error)
    const { data, message, code } = meta || {};
    return res.status(code).send({
      data,
      message: error?.message || message || 'An Error Occured!',
      status: false
    })
  }

  successResponse<T>(res: any, { data, message, code }: {
    data: T,
    message?: string,
    code?: number
  }) {

    return res.status(code || 200).send({
      data,
      message: message || 'Success',
      status: true,
    })
  }
}


export const apiResponse = new ApiResponse()