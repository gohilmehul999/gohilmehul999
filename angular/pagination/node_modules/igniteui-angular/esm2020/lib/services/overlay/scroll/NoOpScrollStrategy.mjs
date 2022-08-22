import { ScrollStrategy } from './scroll-strategy';
/**
 * Empty scroll strategy. Does nothing.
 */
export class NoOpScrollStrategy extends ScrollStrategy {
    constructor() {
        super();
    }
    /** @inheritdoc */
    initialize() { }
    /** @inheritdoc */
    attach() { }
    /** @inheritdoc */
    detach() { }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm9PcFNjcm9sbFN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWduaXRldWktYW5ndWxhci9zcmMvbGliL3NlcnZpY2VzL292ZXJsYXkvc2Nyb2xsL05vT3BTY3JvbGxTdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sa0JBQW1CLFNBQVEsY0FBYztJQUNsRDtRQUNJLEtBQUssRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUNELGtCQUFrQjtJQUNYLFVBQVUsS0FBSyxDQUFDO0lBRXZCLGtCQUFrQjtJQUNYLE1BQU0sS0FBVyxDQUFDO0lBRXpCLGtCQUFrQjtJQUNYLE1BQU0sS0FBVyxDQUFDO0NBQzVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2Nyb2xsU3RyYXRlZ3kgfSBmcm9tICcuL3Njcm9sbC1zdHJhdGVneSc7XG5cbi8qKlxuICogRW1wdHkgc2Nyb2xsIHN0cmF0ZWd5LiBEb2VzIG5vdGhpbmcuXG4gKi9cbmV4cG9ydCBjbGFzcyBOb09wU2Nyb2xsU3RyYXRlZ3kgZXh0ZW5kcyBTY3JvbGxTdHJhdGVneSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xuICAgIHB1YmxpYyBpbml0aWFsaXplKCkgeyB9XG5cbiAgICAvKiogQGluaGVyaXRkb2MgKi9cbiAgICBwdWJsaWMgYXR0YWNoKCk6IHZvaWQgeyB9XG5cbiAgICAvKiogQGluaGVyaXRkb2MgKi9cbiAgICBwdWJsaWMgZGV0YWNoKCk6IHZvaWQgeyB9XG59XG4iXX0=