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

import { PatchedProblem, Problem } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Problem<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags problem
     * @name ProblemList
     * @summary Получение списка всех задач
     * @request GET:/api/problem/
     * @secure
     */
    problemList = (
        query?: {
            /** Which field to use when ordering the results. */
            ordering?: string;
            title?: string;
        },
        params: RequestParams = {},
    ) =>
        this.request<Problem[], any>({
            path: `/api/problem/`,
            method: "GET",
            query: query,
            secure: true,
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags problem
     * @name ProblemCreate
     * @summary Создание новой задачи
     * @request POST:/api/problem/
     * @secure
     */
    problemCreate = (data: Problem, params: RequestParams = {}) =>
        this.request<Problem, any>({
            path: `/api/problem/`,
            method: "POST",
            body: data,
            secure: true,
            type: ContentType.Json,
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags problem
     * @name ProblemRetrieve
     * @summary Детальная информация о конкретной задаче
     * @request GET:/api/problem/{id}/
     * @secure
     */
    problemRetrieve = (id: number, params: RequestParams = {}) =>
        this.request<Problem, any>({
            path: `/api/problem/${id}/`,
            method: "GET",
            secure: true,
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags problem
     * @name ProblemUpdate
     * @summary Обновление информации о конкретной задаче
     * @request PUT:/api/problem/{id}/
     * @secure
     */
    problemUpdate = (id: number, data: Problem, params: RequestParams = {}) =>
        this.request<Problem, any>({
            path: `/api/problem/${id}/`,
            method: "PUT",
            body: data,
            secure: true,
            type: ContentType.Json,
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags problem
     * @name ProblemPartialUpdate
     * @summary Частичное обновление информации о конкретной задаче
     * @request PATCH:/api/problem/{id}/
     * @secure
     */
    problemPartialUpdate = (id: number, data: PatchedProblem, params: RequestParams = {}) =>
        this.request<Problem, any>({
            path: `/api/problem/${id}/`,
            method: "PATCH",
            body: data,
            secure: true,
            type: ContentType.Json,
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags problem
     * @name ProblemDestroy
     * @summary Удаление конкретной задачи
     * @request DELETE:/api/problem/{id}/
     * @secure
     */
    problemDestroy = (id: number, params: RequestParams = {}) =>
        this.request<Problem, any>({
            path: `/api/problem/${id}/`,
            method: "DELETE",
            secure: true,
            format: "json",
            ...params,
        });
}
