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

export class Schema<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
    /**
     * @description OpenApi3 schema for this API. Format can be selected via content negotiation. - YAML: application/vnd.oai.openapi - JSON: application/vnd.oai.openapi+json
     *
     * @tags schema
     * @name SchemaRetrieve
     * @request GET:/api/schema/
     * @secure
     */
    schemaRetrieve = (
        query?: {
            format?: "json" | "yaml";
            lang?:
                | "af"
                | "ar"
                | "ar-dz"
                | "ast"
                | "az"
                | "be"
                | "bg"
                | "bn"
                | "br"
                | "bs"
                | "ca"
                | "ckb"
                | "cs"
                | "cy"
                | "da"
                | "de"
                | "dsb"
                | "el"
                | "en"
                | "en-au"
                | "en-gb"
                | "eo"
                | "es"
                | "es-ar"
                | "es-co"
                | "es-mx"
                | "es-ni"
                | "es-ve"
                | "et"
                | "eu"
                | "fa"
                | "fi"
                | "fr"
                | "fy"
                | "ga"
                | "gd"
                | "gl"
                | "he"
                | "hi"
                | "hr"
                | "hsb"
                | "hu"
                | "hy"
                | "ia"
                | "id"
                | "ig"
                | "io"
                | "is"
                | "it"
                | "ja"
                | "ka"
                | "kab"
                | "kk"
                | "km"
                | "kn"
                | "ko"
                | "ky"
                | "lb"
                | "lt"
                | "lv"
                | "mk"
                | "ml"
                | "mn"
                | "mr"
                | "ms"
                | "my"
                | "nb"
                | "ne"
                | "nl"
                | "nn"
                | "os"
                | "pa"
                | "pl"
                | "pt"
                | "pt-br"
                | "ro"
                | "ru"
                | "sk"
                | "sl"
                | "sq"
                | "sr"
                | "sr-latn"
                | "sv"
                | "sw"
                | "ta"
                | "te"
                | "tg"
                | "th"
                | "tk"
                | "tr"
                | "tt"
                | "udm"
                | "ug"
                | "uk"
                | "ur"
                | "uz"
                | "vi"
                | "zh-hans"
                | "zh-hant";
        },
        params: RequestParams = {},
    ) =>
        this.request<Record<string, any>, any>({
            path: `/api/schema/`,
            method: "GET",
            query: query,
            secure: true,
            format: "json",
            ...params,
        });
}
