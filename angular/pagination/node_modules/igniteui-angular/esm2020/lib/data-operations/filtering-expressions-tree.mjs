export var FilteringExpressionsTreeType;
(function (FilteringExpressionsTreeType) {
    FilteringExpressionsTreeType[FilteringExpressionsTreeType["Regular"] = 0] = "Regular";
    FilteringExpressionsTreeType[FilteringExpressionsTreeType["Advanced"] = 1] = "Advanced";
})(FilteringExpressionsTreeType || (FilteringExpressionsTreeType = {}));
export class FilteringExpressionsTree {
    constructor(operator, fieldName) {
        /**
         * Sets/gets the filtering operands.
         * ```typescript
         * const gridExpressionsTree = new FilteringExpressionsTree(FilteringLogic.And);
         * const expression = [
         * {
         *   condition: IgxStringFilteringOperand.instance().condition('contains'),
         *   fieldName: 'Column Field',
         *   searchVal: 'Value',
         *   ignoreCase: false
         * }];
         * gridExpressionsTree.filteringOperands.push(expression);
         * this.grid.filteringExpressionsTree = gridExpressionsTree;
         * ```
         * ```typescript
         * let filteringOperands = gridExpressionsTree.filteringOperands;
         * ```
         *
         * @memberof FilteringExpressionsTree
         */
        this.filteringOperands = [];
        this.operator = operator;
        this.fieldName = fieldName;
    }
    /**
     * Checks if filtering expressions tree is empty.
     *
     * @param expressionTree filtering expressions tree.
     */
    static empty(expressionTree) {
        return !expressionTree || !expressionTree.filteringOperands || !expressionTree.filteringOperands.length;
    }
    /**
     * Returns the filtering expression for a column with the provided fieldName.
     * ```typescript
     * let filteringExpression = gridExpressionTree.find('Column Field');
     * ```
     *
     * @memberof FilteringExpressionsTree
     */
    find(fieldName) {
        const index = this.findIndex(fieldName);
        if (index > -1) {
            return this.filteringOperands[index];
        }
        return null;
    }
    /**
     * Returns the index of the filtering expression for a column with the provided fieldName.
     * ```typescript
     * let filteringExpressionIndex = gridExpressionTree.findIndex('Column Field');
     * ```
     *
     * @memberof FilteringExpressionsTree
     */
    findIndex(fieldName) {
        let expr;
        for (let i = 0; i < this.filteringOperands.length; i++) {
            expr = this.filteringOperands[i];
            if (expr instanceof FilteringExpressionsTree) {
                if (this.isFilteringExpressionsTreeForColumn(expr, fieldName)) {
                    return i;
                }
            }
            else {
                if (expr.fieldName === fieldName) {
                    return i;
                }
            }
        }
        return -1;
    }
    isFilteringExpressionsTreeForColumn(expressionsTree, fieldName) {
        if (expressionsTree.fieldName === fieldName) {
            return true;
        }
        for (const expr of expressionsTree.filteringOperands) {
            if ((expr instanceof FilteringExpressionsTree)) {
                return this.isFilteringExpressionsTreeForColumn(expr, fieldName);
            }
            else {
                return expr.fieldName === fieldName;
            }
        }
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyaW5nLWV4cHJlc3Npb25zLXRyZWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9pZ25pdGV1aS1hbmd1bGFyL3NyYy9saWIvZGF0YS1vcGVyYXRpb25zL2ZpbHRlcmluZy1leHByZXNzaW9ucy10cmVlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU0sQ0FBTixJQUFZLDRCQUdYO0FBSEQsV0FBWSw0QkFBNEI7SUFDcEMscUZBQU8sQ0FBQTtJQUNQLHVGQUFRLENBQUE7QUFDWixDQUFDLEVBSFcsNEJBQTRCLEtBQTVCLDRCQUE0QixRQUd2QztBQVlELE1BQU0sT0FBTyx3QkFBd0I7SUErRGpDLFlBQVksUUFBd0IsRUFBRSxTQUFrQjtRQTdEeEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7V0FtQkc7UUFDSSxzQkFBaUIsR0FBeUQsRUFBRSxDQUFDO1FBMENoRixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBR0Q7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBeUM7UUFDekQsT0FBTyxDQUFDLGNBQWMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7SUFDNUcsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxJQUFJLENBQUMsU0FBaUI7UUFDekIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV4QyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNaLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hDO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxTQUFTLENBQUMsU0FBaUI7UUFDOUIsSUFBSSxJQUFJLENBQUM7UUFDVCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNwRCxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksSUFBSSxZQUFZLHdCQUF3QixFQUFFO2dCQUMxQyxJQUFJLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLEVBQUU7b0JBQzNELE9BQU8sQ0FBQyxDQUFDO2lCQUNaO2FBQ0o7aUJBQU07Z0JBQ0gsSUFBSyxJQUE2QixDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7b0JBQ3hELE9BQU8sQ0FBQyxDQUFDO2lCQUNaO2FBQ0o7U0FDSjtRQUVELE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDZCxDQUFDO0lBRVMsbUNBQW1DLENBQUMsZUFBMEMsRUFBRSxTQUFpQjtRQUN2RyxJQUFJLGVBQWUsQ0FBQyxTQUFTLEtBQUssU0FBUyxFQUFFO1lBQ3pDLE9BQU8sSUFBSSxDQUFDO1NBQ2Y7UUFFRCxLQUFLLE1BQU0sSUFBSSxJQUFJLGVBQWUsQ0FBQyxpQkFBaUIsRUFBRTtZQUNsRCxJQUFJLENBQUMsSUFBSSxZQUFZLHdCQUF3QixDQUFDLEVBQUU7Z0JBQzVDLE9BQU8sSUFBSSxDQUFDLG1DQUFtQyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQzthQUNwRTtpQkFBTTtnQkFDSCxPQUFRLElBQTZCLENBQUMsU0FBUyxLQUFLLFNBQVMsQ0FBQzthQUNqRTtTQUNKO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSUZpbHRlcmluZ0V4cHJlc3Npb24sIEZpbHRlcmluZ0xvZ2ljIH0gZnJvbSAnLi9maWx0ZXJpbmctZXhwcmVzc2lvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSUJhc2VFdmVudEFyZ3MgfSBmcm9tICcuLi9jb3JlL3V0aWxzJztcblxuZXhwb3J0IGVudW0gRmlsdGVyaW5nRXhwcmVzc2lvbnNUcmVlVHlwZSB7XG4gICAgUmVndWxhcixcbiAgICBBZHZhbmNlZFxufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgSUZpbHRlcmluZ0V4cHJlc3Npb25zVHJlZSBleHRlbmRzIElCYXNlRXZlbnRBcmdzIHtcbiAgICBmaWx0ZXJpbmdPcGVyYW5kczogKElGaWx0ZXJpbmdFeHByZXNzaW9uc1RyZWUgfCBJRmlsdGVyaW5nRXhwcmVzc2lvbilbXTtcbiAgICBvcGVyYXRvcjogRmlsdGVyaW5nTG9naWM7XG4gICAgZmllbGROYW1lPzogc3RyaW5nO1xuICAgIHR5cGU/OiBGaWx0ZXJpbmdFeHByZXNzaW9uc1RyZWVUeXBlO1xuXG4gICAgZmluZChmaWVsZE5hbWU6IHN0cmluZyk6IElGaWx0ZXJpbmdFeHByZXNzaW9uc1RyZWUgfCBJRmlsdGVyaW5nRXhwcmVzc2lvbjtcbiAgICBmaW5kSW5kZXgoZmllbGROYW1lOiBzdHJpbmcpOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBGaWx0ZXJpbmdFeHByZXNzaW9uc1RyZWUgaW1wbGVtZW50cyBJRmlsdGVyaW5nRXhwcmVzc2lvbnNUcmVlIHtcblxuICAgIC8qKlxuICAgICAqIFNldHMvZ2V0cyB0aGUgZmlsdGVyaW5nIG9wZXJhbmRzLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBjb25zdCBncmlkRXhwcmVzc2lvbnNUcmVlID0gbmV3IEZpbHRlcmluZ0V4cHJlc3Npb25zVHJlZShGaWx0ZXJpbmdMb2dpYy5BbmQpO1xuICAgICAqIGNvbnN0IGV4cHJlc3Npb24gPSBbXG4gICAgICoge1xuICAgICAqICAgY29uZGl0aW9uOiBJZ3hTdHJpbmdGaWx0ZXJpbmdPcGVyYW5kLmluc3RhbmNlKCkuY29uZGl0aW9uKCdjb250YWlucycpLFxuICAgICAqICAgZmllbGROYW1lOiAnQ29sdW1uIEZpZWxkJyxcbiAgICAgKiAgIHNlYXJjaFZhbDogJ1ZhbHVlJyxcbiAgICAgKiAgIGlnbm9yZUNhc2U6IGZhbHNlXG4gICAgICogfV07XG4gICAgICogZ3JpZEV4cHJlc3Npb25zVHJlZS5maWx0ZXJpbmdPcGVyYW5kcy5wdXNoKGV4cHJlc3Npb24pO1xuICAgICAqIHRoaXMuZ3JpZC5maWx0ZXJpbmdFeHByZXNzaW9uc1RyZWUgPSBncmlkRXhwcmVzc2lvbnNUcmVlO1xuICAgICAqIGBgYFxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBsZXQgZmlsdGVyaW5nT3BlcmFuZHMgPSBncmlkRXhwcmVzc2lvbnNUcmVlLmZpbHRlcmluZ09wZXJhbmRzO1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEZpbHRlcmluZ0V4cHJlc3Npb25zVHJlZVxuICAgICAqL1xuICAgIHB1YmxpYyBmaWx0ZXJpbmdPcGVyYW5kczogKElGaWx0ZXJpbmdFeHByZXNzaW9uc1RyZWUgfCBJRmlsdGVyaW5nRXhwcmVzc2lvbilbXSA9IFtdO1xuXG4gICAgLyoqXG4gICAgICogU2V0cy9nZXRzIHRoZSBvcGVyYXRvci5cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogZ3JpZEV4cHJlc3Npb25zVHJlZS5vcGVyYXRvciA9IEZpbHRlcmluZ0xvZ2ljLkFuZDtcbiAgICAgKiBgYGBcbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogbGV0IG9wZXJhdG9yID0gZ3JpZEV4cHJlc3Npb25zVHJlZS5vcGVyYXRvcjtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBGaWx0ZXJpbmdFeHByZXNzaW9uc1RyZWVcbiAgICAgKi9cbiAgICBwdWJsaWMgb3BlcmF0b3I6IEZpbHRlcmluZ0xvZ2ljO1xuXG4gICAgLyoqXG4gICAgICogU2V0cy9nZXRzIHRoZSBmaWVsZCBuYW1lIG9mIHRoZSBjb2x1bW4gd2hlcmUgdGhlIGZpbHRlcmluZyBleHByZXNzaW9uIGlzIHBsYWNlZC5cbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogIGdyaWRFeHByZXNzaW9uVHJlZS5maWVsZE5hbWUgPSAnQ29sdW1uIEZpZWxkJztcbiAgICAgKiBgYGBcbiAgICAgKiBgYGB0eXBlc2NyaXB0XG4gICAgICogbGV0IGNvbHVtbkZpZWxkID0gZXhwcmVzc2lvblRyZWUuZmllbGROYW1lO1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQG1lbWJlcm9mIEZpbHRlcmluZ0V4cHJlc3Npb25zVHJlZVxuICAgICAqL1xuICAgIHB1YmxpYyBmaWVsZE5hbWU/OiBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBTZXRzL2dldHMgdGhlIHR5cGUgb2YgdGhlIGZpbHRlcmluZyBleHByZXNzaW9ucyB0cmVlLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiAgZ3JpZEV4cHJlc3Npb25UcmVlLnR5cGUgPSBGaWx0ZXJpbmdFeHByZXNzaW9uc1RyZWUuQWR2YW5jZWQ7XG4gICAgICogYGBgXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIGxldCB0eXBlID0gZXhwcmVzc2lvblRyZWUudHlwZTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBGaWx0ZXJpbmdFeHByZXNzaW9uc1RyZWVcbiAgICAgKi9cbiAgICBwdWJsaWMgdHlwZT86IEZpbHRlcmluZ0V4cHJlc3Npb25zVHJlZVR5cGU7XG5cbiAgICBjb25zdHJ1Y3RvcihvcGVyYXRvcjogRmlsdGVyaW5nTG9naWMsIGZpZWxkTmFtZT86IHN0cmluZykge1xuICAgICAgICB0aGlzLm9wZXJhdG9yID0gb3BlcmF0b3I7XG4gICAgICAgIHRoaXMuZmllbGROYW1lID0gZmllbGROYW1lO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGZpbHRlcmluZyBleHByZXNzaW9ucyB0cmVlIGlzIGVtcHR5LlxuICAgICAqXG4gICAgICogQHBhcmFtIGV4cHJlc3Npb25UcmVlIGZpbHRlcmluZyBleHByZXNzaW9ucyB0cmVlLlxuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZW1wdHkoZXhwcmVzc2lvblRyZWU6IElGaWx0ZXJpbmdFeHByZXNzaW9uc1RyZWUpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICFleHByZXNzaW9uVHJlZSB8fCAhZXhwcmVzc2lvblRyZWUuZmlsdGVyaW5nT3BlcmFuZHMgfHwgIWV4cHJlc3Npb25UcmVlLmZpbHRlcmluZ09wZXJhbmRzLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBmaWx0ZXJpbmcgZXhwcmVzc2lvbiBmb3IgYSBjb2x1bW4gd2l0aCB0aGUgcHJvdmlkZWQgZmllbGROYW1lLlxuICAgICAqIGBgYHR5cGVzY3JpcHRcbiAgICAgKiBsZXQgZmlsdGVyaW5nRXhwcmVzc2lvbiA9IGdyaWRFeHByZXNzaW9uVHJlZS5maW5kKCdDb2x1bW4gRmllbGQnKTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBGaWx0ZXJpbmdFeHByZXNzaW9uc1RyZWVcbiAgICAgKi9cbiAgICBwdWJsaWMgZmluZChmaWVsZE5hbWU6IHN0cmluZyk6IElGaWx0ZXJpbmdFeHByZXNzaW9uc1RyZWUgfCBJRmlsdGVyaW5nRXhwcmVzc2lvbiB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5maW5kSW5kZXgoZmllbGROYW1lKTtcblxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyaW5nT3BlcmFuZHNbaW5kZXhdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGZpbHRlcmluZyBleHByZXNzaW9uIGZvciBhIGNvbHVtbiB3aXRoIHRoZSBwcm92aWRlZCBmaWVsZE5hbWUuXG4gICAgICogYGBgdHlwZXNjcmlwdFxuICAgICAqIGxldCBmaWx0ZXJpbmdFeHByZXNzaW9uSW5kZXggPSBncmlkRXhwcmVzc2lvblRyZWUuZmluZEluZGV4KCdDb2x1bW4gRmllbGQnKTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBtZW1iZXJvZiBGaWx0ZXJpbmdFeHByZXNzaW9uc1RyZWVcbiAgICAgKi9cbiAgICBwdWJsaWMgZmluZEluZGV4KGZpZWxkTmFtZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IGV4cHI7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5maWx0ZXJpbmdPcGVyYW5kcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZXhwciA9IHRoaXMuZmlsdGVyaW5nT3BlcmFuZHNbaV07XG4gICAgICAgICAgICBpZiAoZXhwciBpbnN0YW5jZW9mIEZpbHRlcmluZ0V4cHJlc3Npb25zVHJlZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRmlsdGVyaW5nRXhwcmVzc2lvbnNUcmVlRm9yQ29sdW1uKGV4cHIsIGZpZWxkTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoKGV4cHIgYXMgSUZpbHRlcmluZ0V4cHJlc3Npb24pLmZpZWxkTmFtZSA9PT0gZmllbGROYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaXNGaWx0ZXJpbmdFeHByZXNzaW9uc1RyZWVGb3JDb2x1bW4oZXhwcmVzc2lvbnNUcmVlOiBJRmlsdGVyaW5nRXhwcmVzc2lvbnNUcmVlLCBmaWVsZE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoZXhwcmVzc2lvbnNUcmVlLmZpZWxkTmFtZSA9PT0gZmllbGROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoY29uc3QgZXhwciBvZiBleHByZXNzaW9uc1RyZWUuZmlsdGVyaW5nT3BlcmFuZHMpIHtcbiAgICAgICAgICAgIGlmICgoZXhwciBpbnN0YW5jZW9mIEZpbHRlcmluZ0V4cHJlc3Npb25zVHJlZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc0ZpbHRlcmluZ0V4cHJlc3Npb25zVHJlZUZvckNvbHVtbihleHByLCBmaWVsZE5hbWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGV4cHIgYXMgSUZpbHRlcmluZ0V4cHJlc3Npb24pLmZpZWxkTmFtZSA9PT0gZmllbGROYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiJdfQ==