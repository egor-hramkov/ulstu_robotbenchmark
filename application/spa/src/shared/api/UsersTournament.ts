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

import { PatchedTournamentUser, TournamentUser } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class UsersTournament<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags users-tournament
     * @name UsersTournamentList
     * @summary Получение списка всех соревнований у конкретного пользователя
     * @request GET:/api/users-tournament/
     * @secure
     */
    usersTournamentList = (
        query?: {
            /** Which field to use when ordering the results. */
            ordering?: string;
        },
        params: RequestParams = {},
    ) =>
        this.request<TournamentUser[], any>({
            path: `/api/users-tournament/`,
            method: "GET",
            query: query,
            secure: true,
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags users-tournament
     * @name UsersTournamentCreate
     * @summary Создание нового соревнования для конкретного пользователя
     * @request POST:/api/users-tournament/
     * @secure
     */
    usersTournamentCreate = (data: TournamentUser, params: RequestParams = {}) =>
        this.request<TournamentUser, any>({
            path: `/api/users-tournament/`,
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
     * @tags users-tournament
     * @name UsersTournamentRetrieve
     * @summary Детальная информация о соревнованиях конкретного пользователя
     * @request GET:/api/users-tournament/{id}/
     * @secure
     */
    usersTournamentRetrieve = (id: number, params: RequestParams = {}) =>
        this.request<TournamentUser, any>({
            path: `/api/users-tournament/${id}/`,
            method: "GET",
            secure: true,
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags users-tournament
     * @name UsersTournamentUpdate
     * @summary Обновление информации о соревновании конкретного пользователя
     * @request PUT:/api/users-tournament/{id}/
     * @secure
     */
    usersTournamentUpdate = (id: number, data: TournamentUser, params: RequestParams = {}) =>
        this.request<TournamentUser, any>({
            path: `/api/users-tournament/${id}/`,
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
     * @tags users-tournament
     * @name UsersTournamentPartialUpdate
     * @summary Частичное обновление информации о соревновании конкретного пользователя
     * @request PATCH:/api/users-tournament/{id}/
     * @secure
     */
    usersTournamentPartialUpdate = (id: number, data: PatchedTournamentUser, params: RequestParams = {}) =>
        this.request<TournamentUser, any>({
            path: `/api/users-tournament/${id}/`,
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
     * @tags users-tournament
     * @name UsersTournamentDestroy
     * @summary Удаление соревнования у конкретного пользователя
     * @request DELETE:/api/users-tournament/{id}/
     * @secure
     */
    usersTournamentDestroy = (id: number, params: RequestParams = {}) =>
        this.request<TournamentUser, any>({
            path: `/api/users-tournament/${id}/`,
            method: "DELETE",
            secure: true,
            format: "json",
            ...params,
        });
}
