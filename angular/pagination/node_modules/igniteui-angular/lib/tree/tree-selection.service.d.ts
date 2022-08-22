import { IgxTree, IgxTreeNode } from './common';
import * as i0 from "@angular/core";
/** @hidden @internal */
export declare class IgxTreeSelectionService {
    private tree;
    private nodeSelection;
    private indeterminateNodes;
    private nodesToBeSelected;
    private nodesToBeIndeterminate;
    register(tree: IgxTree): void;
    /** Select range from last selected node to the current specified node. */
    selectMultipleNodes(node: IgxTreeNode<any>, event?: Event): void;
    /** Select the specified node and emit event. */
    selectNode(node: IgxTreeNode<any>, event?: Event): void;
    /** Deselect the specified node and emit event. */
    deselectNode(node: IgxTreeNode<any>, event?: Event): void;
    /** Clears node selection */
    clearNodesSelection(): void;
    isNodeSelected(node: IgxTreeNode<any>): boolean;
    isNodeIndeterminate(node: IgxTreeNode<any>): boolean;
    /** Select specified nodes. No event is emitted. */
    selectNodesWithNoEvent(nodes: IgxTreeNode<any>[], clearPrevSelection?: boolean, shouldEmit?: boolean): void;
    /** Deselect specified nodes. No event is emitted. */
    deselectNodesWithNoEvent(nodes?: IgxTreeNode<any>[], shouldEmit?: boolean): void;
    /** Called on `node.ngOnDestroy` to ensure state is correct after node is removed */
    ensureStateOnNodeDelete(node: IgxTreeNode<any>): void;
    /** Retriggers a node's selection state */
    private retriggerNodeState;
    /** Returns array of the selected nodes. */
    private getSelectedNodes;
    /** Returns array of the nodes in indeterminate state. */
    private getIndeterminateNodes;
    private emitNodeSelectionEvent;
    private areEqualCollections;
    private cascadeSelectNodesWithNoEvent;
    private cascadeDeselectNodesWithNoEvent;
    /**
     * populates the nodesToBeSelected and nodesToBeIndeterminate sets
     * with the nodes which will be eventually in selected/indeterminate state
     */
    private calculateNodesNewSelectionState;
    /** Ensures proper selection state for all predescessors and descendants during a selection event */
    private cascadeSelectionState;
    private emitCascadeNodeSelectionEvent;
    /**
     * recursively handle the selection state of the direct and indirect parents
     */
    private handleParentSelectionState;
    /**
     * Handle the selection state of a given node based the selection states of its direct children
     */
    private handleNodeSelectionState;
    /**
     * Get a collection of all nodes affected by the change event
     *
     * @param nodesToBeProcessed set of the nodes to be selected/deselected
     * @returns a collection of all affected nodes and all their parents
     */
    private getCascadingNodeCollection;
    /**
     * retrieve the nodes which should be added/removed to/from the old selection
     */
    private populateAddRemoveArgs;
    /** Emits the `selectedChange` event for each node affected by the selection */
    private emitSelectedChangeEvent;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxTreeSelectionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxTreeSelectionService>;
}
