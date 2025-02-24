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

export class VsCodeRestart<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * @description Принимает идентификатор задачи-пользователя в виде `problem_user_id`, затем формирует команду для перезапуска контейнера и запуска VS Code.
     *
     * @tags vs-code-restart
     * @name VsCodeRestartRetrieve
     * @summary Перезапустить контейнер и запустить VS Code
     * @request GET:/api/vs-code-restart/{problem_user_id}/
     * @secure
     */
    vsCodeRestartRetrieve = (problemUserId: number, params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/vs-code-restart/${problemUserId}/`,
            method: "GET",
            secure: true,
            ...params,
        });
}
