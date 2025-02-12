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

export class Register<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags register
     * @name RegisterCreate
     * @request POST:/api/register/
     * @secure
     */
    registerCreate = (params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/register/`,
            method: "POST",
            secure: true,
            ...params,
        });
}
