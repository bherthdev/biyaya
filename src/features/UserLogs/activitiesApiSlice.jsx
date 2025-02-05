import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const activitiesAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.active === b.active) ? 0 : b.active ? 1 : -1

})

const initialState = activitiesAdapter.getInitialState()

export const activitiesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getActivities: builder.query({
            query: () => '/activities',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedActivities = responseData.map(activity => {
                    activity.id = activity._id
                    
                    return activity
                });
                return activitiesAdapter.setAll(initialState, loadedActivities)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Activity', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Activity', id }))
                    ]
                } else return [{ type: 'Activity', id: 'LIST' }]
            }
        }),
        addNewActivity: builder.mutation({
            query: initialActivityData => ({
                url: '/activities',
                method: 'POST',
                body: {
                    ...initialActivityData,
                }
            }),
            invalidatesTags: [
                { type: 'Activity', id: "LIST" }
            ]
        }),
        updateActivity: builder.mutation({
            query: initialActivityData => ({
                url: '/activities',
                method: 'PATCH',
                body: {
                    ...initialActivityData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Activity', id: arg.id }
            ]
        }),
        deleteActivity: builder.mutation({
            query: ({ id }) => ({
                url: `/activities`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Activity', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetActivitiesQuery,
    useAddNewActivityMutation,
    useUpdateActivityMutation,
    useDeleteActivityMutation,
} = activitiesApiSlice

// returns the query result object
export const selectActivitiesResult = activitiesApiSlice.endpoints.getActivities.select()

// creates memoized selector
const selectActivitiesData = createSelector(
    selectActivitiesResult,
   activitiesResult =>activitiesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllActivities,
    selectById: selectActivityById,
    selectIds: selectActivityIds
    // Pass in a selector that returns the Activity slice of state
} = activitiesAdapter.getSelectors(state => selectActivitiesData(state) ?? initialState)