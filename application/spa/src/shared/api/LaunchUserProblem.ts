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

export class LaunchUserProblem<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * @description Запуск решения командой пользователя (передача в контейнер команды)
     *
     * @tags launch-user-problem
     * @name LaunchUserProblemRetrieve
     * @request GET:/api/launch-user-problem/{problem_user_id}
     * @secure
     */
    launchUserProblemRetrieve = (problemUserId: number, params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/launch-user-problem/${problemUserId}`,
            method: "GET",
            secure: true,
            ...params,
        });
}
