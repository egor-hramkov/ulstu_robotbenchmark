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

import { PatchedUser, User } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Users<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags users
     * @name UsersList
     * @summary Получение списка всех пользователей
     * @request GET:/api/users/
     * @secure
     */
    usersList = (
        query?: {
            username?: string;
        },
        params: RequestParams = {},
    ) =>
        this.request<User[], any>({
            path: `/api/users/`,
            method: "GET",
            query: query,
            secure: true,
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags users
     * @name UsersCreate
     * @summary Создание нового пользователя
     * @request POST:/api/users/
     * @secure
     */
    usersCreate = (data: User, params: RequestParams = {}) =>
        this.request<User, any>({
            path: `/api/users/`,
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
     * @tags users
     * @name UsersRetrieve
     * @summary Детальная информация о конкретном пользователе
     * @request GET:/api/users/{id}/
     * @secure
     */
    usersRetrieve = (id: number, params: RequestParams = {}) =>
        this.request<User, any>({
            path: `/api/users/${id}/`,
            method: "GET",
            secure: true,
            format: "json",
            ...params,
        });
    /**
     * No description
     *
     * @tags users
     * @name UsersUpdate
     * @summary Обновление информации о конкретном пользователе
     * @request PUT:/api/users/{id}/
     * @secure
     */
    usersUpdate = (id: number, data: User, params: RequestParams = {}) =>
        this.request<User, any>({
            path: `/api/users/${id}/`,
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
     * @tags users
     * @name UsersPartialUpdate
     * @summary Частичное обновление информации о конкретном пользователе
     * @request PATCH:/api/users/{id}/
     * @secure
     */
    usersPartialUpdate = (id: number, data: PatchedUser, params: RequestParams = {}) =>
        this.request<User, any>({
            path: `/api/users/${id}/`,
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
     * @tags users
     * @name UsersDestroy
     * @summary Удаление конкретного пользователя
     * @request DELETE:/api/users/{id}/
     * @secure
     */
    usersDestroy = (id: number, params: RequestParams = {}) =>
        this.request<User, any>({
            path: `/api/users/${id}/`,
            method: "DELETE",
            secure: true,
            format: "json",
            ...params,
        });
}
