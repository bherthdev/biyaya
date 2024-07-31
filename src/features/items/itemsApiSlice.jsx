import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const itemsAdapter = createEntityAdapter({})

const initialState = itemsAdapter.getInitialState()

export const itemsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getItems: builder.query({
            query: () => '/items',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedItems = responseData.map(item => {
                    item.id = item._id
                    return item
                });
                return itemsAdapter.setAll(initialState, loadedItems)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Item', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Item', id }))
                    ]
                } else return [{ type: 'Item', id: 'LIST' }]
            }
        }),
        addNewItem: builder.mutation({
            query: initialItemData => ({
                url: '/items',
                method: 'POST',
                body: {
                    ...initialItemData,
                }
            }),
            invalidatesTags: [
                { type: 'Item', id: "LIST" }
            ]
        }),
        updateItem: builder.mutation({
            query: initialItemData => ({
                url: '/items',
                method: 'PATCH',
                body: {
                    ...initialItemData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Item', id: arg.id }
            ]
        }),
        deleteItem: builder.mutation({
            query: ({ id }) => ({
                url: `/items`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Item', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetItemsQuery,
    useAddNewItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
} = itemsApiSlice

// returns the query result object
export const selectItemsResult = itemsApiSlice.endpoints.getItems.select()

// creates memoized selector
const selectItemsData = createSelector(
    selectItemsResult,
    itemsResult => itemsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllItems,
    selectById: selectItemById,
    selectIds: selectItemIds
    // Pass in a selector that returns the users slice of state
} = itemsAdapter.getSelectors(state => selectItemsData(state) ?? initialState)