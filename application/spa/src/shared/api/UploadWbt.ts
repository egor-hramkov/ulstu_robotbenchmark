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

import { WBTFileUploadRequest } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class UploadWbt<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * @description Замена wbt файла у определённого турнира
     *
     * @tags upload-wbt
     * @name UploadWbtCreate
     * @request POST:/api/upload-wbt/
     * @secure
     */
    uploadWbtCreate = (data: WBTFileUploadRequest, params: RequestParams = {}) =>
        this.request<Record<string, any>, any>({
            path: `/api/upload-wbt/`,
            method: "POST",
            body: data,
            secure: true,
            type: ContentType.Json,
            format: "json",
            ...params,
        });
}
