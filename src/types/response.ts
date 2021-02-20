export interface IResponse<T = null> {
    success: boolean;
    data?: T | null,
    message?: string | null;
}