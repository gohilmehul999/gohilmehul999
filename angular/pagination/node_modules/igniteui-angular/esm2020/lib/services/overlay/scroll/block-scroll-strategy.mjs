import { ScrollStrategy } from './scroll-strategy';
/**
 * Prevents scrolling while the overlay content is shown.
 */
export class BlockScrollStrategy extends ScrollStrategy {
    constructor() {
        super();
        this._initialized = false;
        this.onScroll = (ev) => {
            ev.preventDefault();
            if (!this._sourceElement || this._sourceElement !== ev.target) {
                this._sourceElement = ev.target;
                this._initialScrollTop = this._sourceElement.scrollTop;
                this._initialScrollLeft = this._sourceElement.scrollLeft;
            }
            this._sourceElement.scrollTop = this._initialScrollTop;
            this._sourceElement.scrollLeft = this._initialScrollLeft;
        };
    }
    /** @inheritdoc */
    initialize(document) {
        if (this._initialized) {
            return;
        }
        this._document = document;
        this._initialized = true;
    }
    /** @inheritdoc */
    attach() {
        this._document.addEventListener('scroll', this.onScroll, true);
    }
    /** @inheritdoc */
    detach() {
        this._document.removeEventListener('scroll', this.onScroll, true);
        this._sourceElement = null;
        this._initialScrollTop = 0;
        this._initialScrollLeft = 0;
        this._initialized = false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2stc2Nyb2xsLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWduaXRldWktYW5ndWxhci9zcmMvbGliL3NlcnZpY2VzL292ZXJsYXkvc2Nyb2xsL2Jsb2NrLXNjcm9sbC1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsY0FBYztJQU9uRDtRQUNJLEtBQUssRUFBRSxDQUFDO1FBUEosaUJBQVksR0FBRyxLQUFLLENBQUM7UUFrQ3JCLGFBQVEsR0FBRyxDQUFDLEVBQVMsRUFBRSxFQUFFO1lBQzdCLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUU7Z0JBQzNELElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDLE1BQWlCLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDO2FBQzVEO1lBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ3ZELElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUM3RCxDQUFDLENBQUM7SUFwQ0YsQ0FBQztJQUVELGtCQUFrQjtJQUNYLFVBQVUsQ0FBQyxRQUFrQjtRQUNoQyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbkIsT0FBTztTQUNWO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUVELGtCQUFrQjtJQUNYLE1BQU07UUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxrQkFBa0I7SUFDWCxNQUFNO1FBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNsRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDOUIsQ0FBQztDQWFKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2Nyb2xsU3RyYXRlZ3kgfSBmcm9tICcuL3Njcm9sbC1zdHJhdGVneSc7XG5cbi8qKlxuICogUHJldmVudHMgc2Nyb2xsaW5nIHdoaWxlIHRoZSBvdmVybGF5IGNvbnRlbnQgaXMgc2hvd24uXG4gKi9cbmV4cG9ydCBjbGFzcyBCbG9ja1Njcm9sbFN0cmF0ZWd5IGV4dGVuZHMgU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHByaXZhdGUgX2luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50O1xuICAgIHByaXZhdGUgX2luaXRpYWxTY3JvbGxUb3A6IG51bWJlcjtcbiAgICBwcml2YXRlIF9pbml0aWFsU2Nyb2xsTGVmdDogbnVtYmVyO1xuICAgIHByaXZhdGUgX3NvdXJjZUVsZW1lbnQ6IEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICAvKiogQGluaGVyaXRkb2MgKi9cbiAgICBwdWJsaWMgaW5pdGlhbGl6ZShkb2N1bWVudDogRG9jdW1lbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kb2N1bWVudCA9IGRvY3VtZW50O1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXG4gICAgcHVibGljIGF0dGFjaCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXG4gICAgcHVibGljIGRldGFjaCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX3NvdXJjZUVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9pbml0aWFsU2Nyb2xsVG9wID0gMDtcbiAgICAgICAgdGhpcy5faW5pdGlhbFNjcm9sbExlZnQgPSAwO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25TY3JvbGwgPSAoZXY6IEV2ZW50KSA9PiB7XG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICghdGhpcy5fc291cmNlRWxlbWVudCB8fCB0aGlzLl9zb3VyY2VFbGVtZW50ICE9PSBldi50YXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NvdXJjZUVsZW1lbnQgPSBldi50YXJnZXQgYXMgRWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxTY3JvbGxUb3AgPSB0aGlzLl9zb3VyY2VFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxTY3JvbGxMZWZ0ID0gdGhpcy5fc291cmNlRWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fc291cmNlRWxlbWVudC5zY3JvbGxUb3AgPSB0aGlzLl9pbml0aWFsU2Nyb2xsVG9wO1xuICAgICAgICB0aGlzLl9zb3VyY2VFbGVtZW50LnNjcm9sbExlZnQgPSB0aGlzLl9pbml0aWFsU2Nyb2xsTGVmdDtcbiAgICB9O1xufVxuIl19