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

import { RegisterRequest } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Register<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags register
     * @name RegisterCreate
     * @request POST:/api/register/
     * @secure
     */
    registerCreate = (data: RegisterRequest,params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/register/`,
            method: "POST",
            body: data,
            type: ContentType.Json,
            format: "json",
            ...params,
        });
}
