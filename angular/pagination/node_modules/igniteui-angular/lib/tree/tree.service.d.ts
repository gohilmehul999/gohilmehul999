import { IgxTree, IgxTreeNode } from './common';
import * as i0 from "@angular/core";
/** @hidden @internal */
export declare class IgxTreeService {
    expandedNodes: Set<IgxTreeNode<any>>;
    collapsingNodes: Set<IgxTreeNode<any>>;
    private tree;
    /**
     * Adds the node to the `expandedNodes` set and fires the nodes change event
     *
     * @param node target node
     * @param uiTrigger is the event triggered by a ui interraction (so we know if we should animate)
     * @returns void
     */
    expand(node: IgxTreeNode<any>, uiTrigger?: boolean): void;
    /**
     * Adds a node to the `collapsing` collection
     *
     * @param node target node
     */
    collapsing(node: IgxTreeNode<any>): void;
    /**
     * Removes the node from the 'expandedNodes' set and emits the node's change event
     *
     * @param node target node
     * @returns void
     */
    collapse(node: IgxTreeNode<any>): void;
    isExpanded(node: IgxTreeNode<any>): boolean;
    register(tree: IgxTree): void;
    private siblingComparer;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxTreeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxTreeService>;
}
