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
                const loadedLogs = responseData.map(user => {
                    user.id = user._id
                    
                    return user
                });
                return logsAdapter.setAll(initialState, loadedLogs)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/logs',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: '/logs',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/logs`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetLogsQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
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
    selectById: selectUserById,
    selectIds: selectUserIds
    // Pass in a selector that returns the Logs slice of state
} = logsAdapter.getSelectors(state => selectLogsData(state) ?? initialState)