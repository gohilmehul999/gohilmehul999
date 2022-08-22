import * as i0 from "@angular/core";
/** @hidden */
export declare class IgxSelectionAPIService {
    /**
     * If primaryKey is defined, then multiple selection is based on the primaryKey, and it is array of numbers, strings, etc.
     * If the primaryKey is omitted, then selection is based on the item data
     */
    protected selection: Map<string, Set<any>>;
    /**
     * Get current component selection.
     *
     * @param componentID ID of the component.
     */
    get(componentID: string): Set<any>;
    /**
     * Set new component selection.
     *
     * @param componentID ID of the component.
     * @param newSelection The new component selection to be set.
     */
    set(componentID: string, newSelection: Set<any>): void;
    /**
     * Clears selection for component.
     *
     * @param componentID ID of the component.
     */
    clear(componentID: string): void;
    /**
     * Get current component selection length.
     *
     * @param componentID ID of the component.
     */
    size(componentID: string): number;
    /**
     * Creates new selection that consist of the new item added to the current component selection.
     * The returned collection is new Set,
     * therefore if you want to update component selection you need to call in addition the set_selection() method
     * or instead use the select_item() one.
     *
     * @param componentID ID of the component, which we add new item to.
     * @param itemID ID of the item to add to component selection.
     * @param sel Used internally only by the selection (add_items method) to accumulate selection for multiple items.
     *
     * @returns Selection after the new item is added.
     */
    add_item(componentID: string, itemID: any, sel?: Set<any>): Set<any>;
    /**
     * Creates new selection that consist of the new items added to the current component selection.
     * The returned collection is new Set,
     * therefore if you want to update component selection you need to call in addition the set_selection() method
     * or instead use the select_items() one.
     *
     * @param componentID ID of the component, which we add new items to.
     * @param itemIDs Array of IDs of the items to add to component selection.
     * @param clearSelection If true it will clear previous selection.
     *
     * @returns Selection after the new items are added.
     */
    add_items(componentID: string, itemIDs: any[], clearSelection?: boolean): Set<any>;
    /**
     * Add item to the current component selection.
     *
     * @param componentID ID of the component, which we add new item to.
     * @param itemID ID of the item to add to component selection.
     * @param sel Used internally only by the selection (select_items method) to accumulate selection for multiple items.
     */
    select_item(componentID: string, itemID: any, sel?: Set<any>): void;
    /**
     * Add items to the current component selection.
     *
     * @param componentID ID of the component, which we add new items to.
     * @param itemIDs Array of IDs of the items to add to component selection.
     * @param clearSelection If true it will clear previous selection.
     */
    select_items(componentID: string, itemID: any[], clearSelection?: boolean): void;
    /**
     * Creates new selection that consist of the new items excluded from the current component selection.
     * The returned collection is new Set,
     * therefore if you want to update component selection you need to call in addition the set_selection() method
     * or instead use the deselect_item() one.
     *
     * @param componentID ID of the component, which we remove items from.
     * @param itemID ID of the item to remove from component selection.
     * @param sel Used internally only by the selection (delete_items method) to accumulate deselected items.
     *
     * @returns Selection after the item is removed.
     */
    delete_item(componentID: string, itemID: any, sel?: Set<any>): Set<any>;
    /**
     * Creates new selection that consist of the new items removed to the current component selection.
     * The returned collection is new Set,
     * therefore if you want to update component selection you need to call in addition the set_selection() method
     * or instead use the deselect_items() one.
     *
     * @param componentID ID of the component, which we remove items from.
     * @param itemID ID of the items to remove from component selection.
     *
     * @returns Selection after the items are removed.
     */
    delete_items(componentID: string, itemIDs: any[]): Set<any>;
    /**
     * Remove item from the current component selection.
     *
     * @param componentID ID of the component, which we remove item from.
     * @param itemID ID of the item to remove from component selection.
     * @param sel Used internally only by the selection (deselect_items method) to accumulate selection for multiple items.
     */
    deselect_item(componentID: string, itemID: any, sel?: Set<any>): void;
    /**
     * Remove items to the current component selection.
     *
     * @param componentID ID of the component, which we add new items to.
     * @param itemIDs Array of IDs of the items to add to component selection.
     */
    deselect_items(componentID: string, itemID: any[], clearSelection?: boolean): void;
    /**
     * Check if the item is selected in the component selection.
     *
     * @param componentID ID of the component.
     * @param itemID ID of the item to search.
     *
     * @returns If item is selected.
     */
    is_item_selected(componentID: string, itemID: any): boolean;
    /**
     * Get first element in the selection.
     * This is correct when we have only one item in the collection (for single selection purposes)
     * and the method returns that item.
     *
     * @param componentID ID of the component.
     *
     * @returns First element in the set.
     */
    first_item(componentID: string): any;
    /**
     * Returns whether all items are selected.
     *
     * @param componentID ID of the component.
     * @param dataCount: number Number of items in the data.
     *
     * @returns If all items are selected.
     */
    are_all_selected(componentID: string, dataCount: number): boolean;
    /**
     * Returns whether any of the items is selected.
     *
     * @param componentID ID of the component.
     * @param data Entire data array.
     *
     * @returns If there is any item selected.
     */
    are_none_selected(componentID: string): boolean;
    /**
     * Get all primary key values from a data array. If there isn't a primary key defined that the entire data is returned instead.
     *
     * @param data Entire data array.
     * @param primaryKey Data primary key.
     *
     * @returns Array of identifiers, either primary key values or the entire data array.
     */
    get_all_ids(data: any, primaryKey?: any): any;
    /**
     * Returns empty selection collection.
     *
     * @returns empty set.
     */
    get_empty(): Set<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxSelectionAPIService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxSelectionAPIService>;
}
