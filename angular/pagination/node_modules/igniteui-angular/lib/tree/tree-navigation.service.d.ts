import { OnDestroy } from '@angular/core';
import { IgxTree, IgxTreeNode } from './common';
import { IgxTreeService } from './tree.service';
import { IgxTreeSelectionService } from './tree-selection.service';
import * as i0 from "@angular/core";
/** @hidden @internal */
export declare class IgxTreeNavigationService implements OnDestroy {
    private treeService;
    private selectionService;
    private tree;
    private _focusedNode;
    private _lastFocusedNode;
    private _activeNode;
    private _visibleChildren;
    private _invisibleChildren;
    private _disabledChildren;
    private _cacheChange;
    constructor(treeService: IgxTreeService, selectionService: IgxTreeSelectionService);
    register(tree: IgxTree): void;
    get focusedNode(): IgxTreeNode<any>;
    set focusedNode(value: IgxTreeNode<any>);
    get activeNode(): IgxTreeNode<any>;
    set activeNode(value: IgxTreeNode<any>);
    get visibleChildren(): IgxTreeNode<any>[];
    update_disabled_cache(node: IgxTreeNode<any>): void;
    init_invisible_cache(): void;
    update_visible_cache(node: IgxTreeNode<any>, expanded: boolean, shouldEmit?: boolean): void;
    /**
     * Sets the node as focused (and active)
     *
     * @param node target node
     * @param isActive if true, sets the node as active
     */
    setFocusedAndActiveNode(node: IgxTreeNode<any>, isActive?: boolean): void;
    /** Handler for keydown events. Used in tree.component.ts */
    handleKeydown(event: KeyboardEvent): void;
    ngOnDestroy(): void;
    private handleNavigation;
    private handleArrowLeft;
    private handleArrowRight;
    private handleUpDownArrow;
    private handleAsterisk;
    private handleSpace;
    /** Gets the next visible node in the given direction - 1 -> next, -1 -> previous */
    private getVisibleNode;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxTreeNavigationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxTreeNavigationService>;
}
