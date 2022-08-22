import { DefaultPivotSortingStrategy } from '../../data-operations/pivot-sort-strategy';
import { SortingDirection } from '../../data-operations/sorting-strategy';
import { PivotUtil } from './pivot-util';
export class PivotSortUtil {
    static generateDimensionSortingExpressions(dimensions) {
        const expressions = [];
        PivotUtil.flatten(dimensions).forEach(x => {
            if (x.sortDirection) {
                expressions.push({
                    dir: x.sortDirection,
                    fieldName: x.memberName,
                    strategy: DefaultPivotSortingStrategy.instance()
                });
            }
            else {
                expressions.push({
                    dir: SortingDirection.None,
                    fieldName: x.memberName,
                    strategy: DefaultPivotSortingStrategy.instance()
                });
            }
        });
        return expressions;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGl2b3Qtc29ydC11dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWduaXRldWktYW5ndWxhci9zcmMvbGliL2dyaWRzL3Bpdm90LWdyaWQvcGl2b3Qtc29ydC11dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hGLE9BQU8sRUFBc0IsZ0JBQWdCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUU5RixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXpDLE1BQU0sT0FBTyxhQUFhO0lBQ2YsTUFBTSxDQUFDLG1DQUFtQyxDQUFDLFVBQTZCO1FBQzNFLE1BQU0sV0FBVyxHQUF5QixFQUFFLENBQUM7UUFDN0MsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLENBQUMsYUFBYSxFQUFFO2dCQUNqQixXQUFXLENBQUMsSUFBSSxDQUFDO29CQUNiLEdBQUcsRUFBRSxDQUFDLENBQUMsYUFBYTtvQkFDcEIsU0FBUyxFQUFFLENBQUMsQ0FBQyxVQUFVO29CQUN2QixRQUFRLEVBQUUsMkJBQTJCLENBQUMsUUFBUSxFQUFFO2lCQUNuRCxDQUFDLENBQUM7YUFDTjtpQkFBTTtnQkFDSCxXQUFXLENBQUMsSUFBSSxDQUFDO29CQUNiLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJO29CQUMxQixTQUFTLEVBQUUsQ0FBQyxDQUFDLFVBQVU7b0JBQ3ZCLFFBQVEsRUFBRSwyQkFBMkIsQ0FBQyxRQUFRLEVBQUU7aUJBQ25ELENBQUMsQ0FBQzthQUNOO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLFdBQVcsQ0FBQztJQUN2QixDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEZWZhdWx0UGl2b3RTb3J0aW5nU3RyYXRlZ3kgfSBmcm9tICcuLi8uLi9kYXRhLW9wZXJhdGlvbnMvcGl2b3Qtc29ydC1zdHJhdGVneSc7XG5pbXBvcnQgeyBJU29ydGluZ0V4cHJlc3Npb24sIFNvcnRpbmdEaXJlY3Rpb24gfSBmcm9tICcuLi8uLi9kYXRhLW9wZXJhdGlvbnMvc29ydGluZy1zdHJhdGVneSc7XG5pbXBvcnQgeyBJUGl2b3REaW1lbnNpb24gfSBmcm9tICcuL3Bpdm90LWdyaWQuaW50ZXJmYWNlJztcbmltcG9ydCB7IFBpdm90VXRpbCB9IGZyb20gJy4vcGl2b3QtdXRpbCc7XG5cbmV4cG9ydCBjbGFzcyBQaXZvdFNvcnRVdGlsIHtcbiAgICBwdWJsaWMgc3RhdGljIGdlbmVyYXRlRGltZW5zaW9uU29ydGluZ0V4cHJlc3Npb25zKGRpbWVuc2lvbnM6IElQaXZvdERpbWVuc2lvbltdKTogSVNvcnRpbmdFeHByZXNzaW9uW10ge1xuICAgICAgICBjb25zdCBleHByZXNzaW9uczogSVNvcnRpbmdFeHByZXNzaW9uW10gPSBbXTtcbiAgICAgICAgUGl2b3RVdGlsLmZsYXR0ZW4oZGltZW5zaW9ucykuZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgICAgIGlmICh4LnNvcnREaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBleHByZXNzaW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZGlyOiB4LnNvcnREaXJlY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgIGZpZWxkTmFtZTogeC5tZW1iZXJOYW1lLFxuICAgICAgICAgICAgICAgICAgICBzdHJhdGVneTogRGVmYXVsdFBpdm90U29ydGluZ1N0cmF0ZWd5Lmluc3RhbmNlKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGRpcjogU29ydGluZ0RpcmVjdGlvbi5Ob25lLFxuICAgICAgICAgICAgICAgICAgICBmaWVsZE5hbWU6IHgubWVtYmVyTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgc3RyYXRlZ3k6IERlZmF1bHRQaXZvdFNvcnRpbmdTdHJhdGVneS5pbnN0YW5jZSgpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZXhwcmVzc2lvbnM7XG4gICAgfVxufSJdfQ==