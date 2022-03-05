export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
  }
}

export class ApiResponse {
  constructor(public data: any, public status: number) {}
}