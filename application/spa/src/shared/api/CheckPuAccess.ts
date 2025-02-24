/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import { HttpClient, RequestParams } from "./http-client";

export class CheckPuAccess<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags check-pu-access
     * @name CheckPuAccessRetrieve
     * @summary Проверяет доступ к задаче по токену и порту
     * @request GET:/api/check-pu-access/
     * @secure
     */
    checkPuAccessRetrieve = (params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/check-pu-access/`,
            method: "GET",
            secure: true,
            ...params,
        });
}
