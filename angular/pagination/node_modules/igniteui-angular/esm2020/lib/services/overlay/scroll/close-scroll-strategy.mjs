import { ScrollStrategy } from './scroll-strategy';
/**
 * Uses a tolerance and closes the shown component upon scrolling if the tolerance is exceeded
 */
export class CloseScrollStrategy extends ScrollStrategy {
    constructor(scrollContainer) {
        super();
        this._initialized = false;
        this.onScroll = (ev) => {
            if (!this._sourceElement) {
                this._sourceElement = ev.target;
                this.initialScrollTop = this._sourceElement.scrollTop;
                this.initialScrollLeft = this._sourceElement.scrollLeft;
            }
            if (this._overlayInfo.elementRef.nativeElement.contains(this._sourceElement)) {
                return;
            }
            if (Math.abs(this._sourceElement.scrollTop - this.initialScrollTop) > this._threshold ||
                Math.abs(this._sourceElement.scrollLeft - this.initialScrollLeft) > this._threshold) {
                this._overlayService.hide(this._id);
            }
        };
        this._scrollContainer = scrollContainer;
        this._threshold = 10;
    }
    /** @inheritdoc */
    initialize(document, overlayService, id) {
        if (this._initialized) {
            return;
        }
        this._overlayService = overlayService;
        this._id = id;
        this._document = document;
        this._initialized = true;
        this._overlayInfo = overlayService.getOverlayById(id);
    }
    /** @inheritdoc */
    attach() {
        if (this._scrollContainer) {
            this._scrollContainer.addEventListener('scroll', this.onScroll);
            this._sourceElement = this._scrollContainer;
        }
        else {
            this._document.addEventListener('scroll', this.onScroll, true);
        }
    }
    /** @inheritdoc */
    detach() {
        // TODO: check why event listener removes only on first call and remains on each next!!!
        if (this._scrollContainer) {
            this._scrollContainer.removeEventListener('scroll', this.onScroll);
        }
        else {
            this._document.removeEventListener('scroll', this.onScroll, true);
        }
        this._sourceElement = null;
        this._initialized = false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2Utc2Nyb2xsLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWduaXRldWktYW5ndWxhci9zcmMvbGliL3NlcnZpY2VzL292ZXJsYXkvc2Nyb2xsL2Nsb3NlLXNjcm9sbC1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sbUJBQW9CLFNBQVEsY0FBYztJQVluRCxZQUFZLGVBQTZCO1FBQ3JDLEtBQUssRUFBRSxDQUFDO1FBTkosaUJBQVksR0FBRyxLQUFLLENBQUM7UUE2Q3JCLGFBQVEsR0FBRyxDQUFDLEVBQVMsRUFBRSxFQUFFO1lBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQyxNQUFhLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztnQkFDdEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDO2FBQzNEO1lBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRTtnQkFDMUUsT0FBTzthQUNWO1lBQ0QsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVO2dCQUNqRixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3JGLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN2QztRQUNMLENBQUMsQ0FBQztRQXBERSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxrQkFBa0I7SUFDWCxVQUFVLENBQUMsUUFBa0IsRUFBRSxjQUFpQyxFQUFFLEVBQVU7UUFDL0UsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25CLE9BQU87U0FDVjtRQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxrQkFBa0I7SUFDWCxNQUFNO1FBQ1QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7U0FDL0M7YUFBTTtZQUNILElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDbEU7SUFDTCxDQUFDO0lBRUQsa0JBQWtCO0lBQ1gsTUFBTTtRQUNULHdGQUF3RjtRQUN4RixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN0RTthQUFNO1lBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNyRTtRQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBQzlCLENBQUM7Q0FpQkoiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJZ3hPdmVybGF5U2VydmljZSB9IGZyb20gJy4uL292ZXJsYXknO1xuaW1wb3J0IHsgT3ZlcmxheUluZm8gfSBmcm9tICcuLi91dGlsaXRpZXMnO1xuaW1wb3J0IHsgU2Nyb2xsU3RyYXRlZ3kgfSBmcm9tICcuL3Njcm9sbC1zdHJhdGVneSc7XG5cbi8qKlxuICogVXNlcyBhIHRvbGVyYW5jZSBhbmQgY2xvc2VzIHRoZSBzaG93biBjb21wb25lbnQgdXBvbiBzY3JvbGxpbmcgaWYgdGhlIHRvbGVyYW5jZSBpcyBleGNlZWRlZFxuICovXG5leHBvcnQgY2xhc3MgQ2xvc2VTY3JvbGxTdHJhdGVneSBleHRlbmRzIFNjcm9sbFN0cmF0ZWd5IHtcbiAgICBwcml2YXRlIF9kb2N1bWVudDogRG9jdW1lbnQ7XG4gICAgcHJpdmF0ZSBfb3ZlcmxheVNlcnZpY2U6IElneE92ZXJsYXlTZXJ2aWNlO1xuICAgIHByaXZhdGUgX2lkOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBpbml0aWFsU2Nyb2xsVG9wOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBpbml0aWFsU2Nyb2xsTGVmdDogbnVtYmVyO1xuICAgIHByaXZhdGUgX3RocmVzaG9sZDogbnVtYmVyO1xuICAgIHByaXZhdGUgX2luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfc291cmNlRWxlbWVudDogRWxlbWVudDtcbiAgICBwcml2YXRlIF9zY3JvbGxDb250YWluZXI6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgX292ZXJsYXlJbmZvOiBPdmVybGF5SW5mbztcblxuICAgIGNvbnN0cnVjdG9yKHNjcm9sbENvbnRhaW5lcj86IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3Njcm9sbENvbnRhaW5lciA9IHNjcm9sbENvbnRhaW5lcjtcbiAgICAgICAgdGhpcy5fdGhyZXNob2xkID0gMTA7XG4gICAgfVxuXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXG4gICAgcHVibGljIGluaXRpYWxpemUoZG9jdW1lbnQ6IERvY3VtZW50LCBvdmVybGF5U2VydmljZTogSWd4T3ZlcmxheVNlcnZpY2UsIGlkOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb3ZlcmxheVNlcnZpY2UgPSBvdmVybGF5U2VydmljZTtcbiAgICAgICAgdGhpcy5faWQgPSBpZDtcbiAgICAgICAgdGhpcy5fZG9jdW1lbnQgPSBkb2N1bWVudDtcbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9vdmVybGF5SW5mbyA9IG92ZXJsYXlTZXJ2aWNlLmdldE92ZXJsYXlCeUlkKGlkKTtcbiAgICB9XG5cbiAgICAvKiogQGluaGVyaXRkb2MgKi9cbiAgICBwdWJsaWMgYXR0YWNoKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fc2Nyb2xsQ29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbCk7XG4gICAgICAgICAgICB0aGlzLl9zb3VyY2VFbGVtZW50ID0gdGhpcy5fc2Nyb2xsQ29udGFpbmVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogQGluaGVyaXRkb2MgKi9cbiAgICBwdWJsaWMgZGV0YWNoKCk6IHZvaWQge1xuICAgICAgICAvLyBUT0RPOiBjaGVjayB3aHkgZXZlbnQgbGlzdGVuZXIgcmVtb3ZlcyBvbmx5IG9uIGZpcnN0IGNhbGwgYW5kIHJlbWFpbnMgb24gZWFjaCBuZXh0ISEhXG4gICAgICAgIGlmICh0aGlzLl9zY3JvbGxDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbENvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY3JvbGwsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NvdXJjZUVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByaXZhdGUgb25TY3JvbGwgPSAoZXY6IEV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5fc291cmNlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fc291cmNlRWxlbWVudCA9IGV2LnRhcmdldCBhcyBhbnk7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxTY3JvbGxUb3AgPSB0aGlzLl9zb3VyY2VFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbFNjcm9sbExlZnQgPSB0aGlzLl9zb3VyY2VFbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fb3ZlcmxheUluZm8uZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRoaXMuX3NvdXJjZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMuX3NvdXJjZUVsZW1lbnQuc2Nyb2xsVG9wIC0gdGhpcy5pbml0aWFsU2Nyb2xsVG9wKSA+IHRoaXMuX3RocmVzaG9sZCB8fFxuICAgICAgICAgICAgTWF0aC5hYnModGhpcy5fc291cmNlRWxlbWVudC5zY3JvbGxMZWZ0IC0gdGhpcy5pbml0aWFsU2Nyb2xsTGVmdCkgPiB0aGlzLl90aHJlc2hvbGQpIHtcbiAgICAgICAgICAgIHRoaXMuX292ZXJsYXlTZXJ2aWNlLmhpZGUodGhpcy5faWQpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbiJdfQ==