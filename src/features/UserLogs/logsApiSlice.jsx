import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const logsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.active === b.active) ? 0 : b.active ? 1 : -1

})

const initialState = logsAdapter.getInitialState()

export const logsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLogs: builder.query({
            query: () => '/logs',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedLogs = responseData.map(log => {
                    log.id = log._id
                    
                    return log
                });
                return logsAdapter.setAll(initialState, loadedLogs)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Log', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Log', id }))
                    ]
                } else return [{ type: 'Log', id: 'LIST' }]
            }
        }),
        addNewLog: builder.mutation({
            query: initialLogData => ({
                url: '/logs',
                method: 'POST',
                body: {
                    ...initialLogData,
                }
            }),
            invalidatesTags: [
                { type: 'Log', id: "LIST" }
            ]
        }),
        updateLog: builder.mutation({
            query: initialLogData => ({
                url: '/logs',
                method: 'PATCH',
                body: {
                    ...initialLogData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Log', id: arg.id }
            ]
        }),
        deleteLog: builder.mutation({
            query: ({ id }) => ({
                url: `/logs`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Log', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetLogsQuery,
    useAddNewLogMutation,
    useUpdateLogMutation,
    useDeleteLogMutation,
} = logsApiSlice

// returns the query result object
export const selectLogsResult = logsApiSlice.endpoints.getLogs.select()

// creates memoized selector
const selectLogsData = createSelector(
    selectLogsResult,
   logsResult =>logsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllLogs,
    selectById: selectLogById,
    selectIds: selectLogIds
    // Pass in a selector that returns the Logs slice of state
} = logsAdapter.getSelectors(state => selectLogsData(state) ?? initialState)