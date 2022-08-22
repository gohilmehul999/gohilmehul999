import { HierarchicalTransactionService } from './hierarchical-transaction';
import { HierarchicalState, HierarchicalTransaction, State, Transaction, TransactionService } from './transaction';
import * as i0 from "@angular/core";
/**
 * The type of the transaction that should be provided.
 * When batchEditing is disabled, `None` is provided.
 * When enabled - `Base` is provided.
 * An enum instead of a boolean value leaves room for extra scenarios in the future.
 */
export declare const enum TRANSACTION_TYPE {
    'None' = "None",
    'Base' = "Base"
}
/**
 * Factory service for instantiating TransactionServices
 */
export declare class IgxFlatTransactionFactory {
    /**
     * Creates a new Transaction service instance depending on the specified type.
     *
     * @param type The type of the transaction
     * @returns a new instance of TransactionService<Transaction, State>
     */
    create(type: TRANSACTION_TYPE): TransactionService<Transaction, State>;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxFlatTransactionFactory, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxFlatTransactionFactory>;
}
/**
 * Factory service for instantiating HierarchicalTransactionServices
 */
export declare class IgxHierarchicalTransactionFactory extends IgxFlatTransactionFactory {
    /**
     * Creates a new HierarchialTransaction service instance depending on the specified type.
     *
     * @param type The type of the transaction
     * @returns a new instance of HierarchialTransaction<HierarchialTransaction, HierarchialState>
     */
    create(type: TRANSACTION_TYPE): HierarchicalTransactionService<HierarchicalTransaction, HierarchicalState>;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxHierarchicalTransactionFactory, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxHierarchicalTransactionFactory>;
}
