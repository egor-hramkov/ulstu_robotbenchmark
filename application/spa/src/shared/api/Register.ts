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

import { UserRegister, UserRegisterResponse } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Register<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags register
     * @name RegisterCreate
     * @summary Регистрация нового пользователя
     * @request POST:/api/register/
     * @secure
     */
    registerCreate = (data: UserRegister, params: RequestParams = {}) =>
        this.request<UserRegisterResponse, UserRegister>({
            path: `/api/register/`,
            method: "POST",
            body: data,
            secure: true,
            type: ContentType.Json,
            format: "json",
            ...params,
        });
}
