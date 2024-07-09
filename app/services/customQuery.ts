import { GraphQLClient } from 'graphql-request'
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'

/** 
 * TODO: This should be in .env.local
 * Porcini Graph URL
 */
export const GRAPHQL_URL = "https://subgraph-stage.rootnameservice.com/subgraphs/name/graphprotocol/ens"
export const client = new GraphQLClient(GRAPHQL_URL)

export interface CustomRequestOptions {
    baseUrl?: string,
    client?: GraphQLClient
}

export interface CustomRequestConfig extends AxiosRequestConfig {
    document?: string,
    variables?: any,
    credentials: string
}

export const customBaseQuery = (options: CustomRequestOptions): BaseQueryFn<any> => {
    return async (axiosRequestConfig: CustomRequestConfig) => {
        let responseData = null
        try {

            // Check if the request is from graphql
            // if no provided url, then graphql
            if (axiosRequestConfig?.url) {
                const response = await axios({
                    ...axiosRequestConfig,
                    withCredentials: axiosRequestConfig.credentials === "include"
                })
                responseData = response.data
            } else {
                const graphqlQuery = {
                    operationName: 'MyQuery',
                    query: axiosRequestConfig.document,
                    variables: axiosRequestConfig.variables,
                }

                const response = await axios({
                    url: GRAPHQL_URL,
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    data: graphqlQuery,
                })

                responseData = response.data.data
            }

            return { data: responseData }

        } catch (error) {
            console.log("error-custom:: ", error)
            return {
                error: {
                    status: (error as AxiosError).response?.status,
                    data: (error as AxiosError).response?.data,
                },
            };
        }
    };
}

export const getHeader = (token: string = "") => {
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*"
    }
}