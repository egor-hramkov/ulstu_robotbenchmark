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

export class Block<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags block
     * @name BlockCreate
     * @request POST:/api/block/{tournament_id}/
     * @secure
     */
    blockCreate = (tournamentId: number, params: RequestParams = {}) =>
        this.request<void, any>({
            path: `/api/block/${tournamentId}/`,
            method: "POST",
            secure: true,
            ...params,
        });
}
