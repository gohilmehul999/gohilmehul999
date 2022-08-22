import { ScrollStrategy } from './scroll-strategy';
/**
 * On scroll reposition the overlay content.
 */
export class AbsoluteScrollStrategy extends ScrollStrategy {
    constructor(scrollContainer) {
        super();
        this._initialized = false;
        this.onScroll = (e) => {
            const overlayInfo = this._overlayService.getOverlayById(this._id);
            if (!overlayInfo) {
                return;
            }
            if (!overlayInfo.elementRef.nativeElement.contains(e.target)) {
                this._overlayService.reposition(this._id);
            }
        };
        this._scrollContainer = scrollContainer;
    }
    /** @inheritdoc */
    initialize(document, overlayService, id) {
        if (this._initialized) {
            return;
        }
        this._overlayService = overlayService;
        this._id = id;
        this._document = document;
        this._zone = overlayService.getOverlayById(id).ngZone;
        this._initialized = true;
    }
    /** @inheritdoc */
    attach() {
        if (this._zone) {
            this._zone.runOutsideAngular(() => {
                this.addScrollEventListener();
            });
        }
        else {
            this.addScrollEventListener();
        }
    }
    /** @inheritdoc */
    detach() {
        if (this._scrollContainer) {
            this._scrollContainer.removeEventListener('scroll', this.onScroll, true);
        }
        else {
            // Tired of this thing throwing every other time. Fix it ffs!
            this._document?.removeEventListener('scroll', this.onScroll, true);
        }
        this._initialized = false;
    }
    addScrollEventListener() {
        if (this._scrollContainer) {
            this._scrollContainer.addEventListener('scroll', this.onScroll, true);
        }
        else {
            this._document.addEventListener('scroll', this.onScroll, true);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzb2x1dGUtc2Nyb2xsLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWduaXRldWktYW5ndWxhci9zcmMvbGliL3NlcnZpY2VzL292ZXJsYXkvc2Nyb2xsL2Fic29sdXRlLXNjcm9sbC1zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkQ7O0dBRUc7QUFDSCxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsY0FBYztJQVF0RCxZQUFZLGVBQTZCO1FBQ3JDLEtBQUssRUFBRSxDQUFDO1FBUkosaUJBQVksR0FBRyxLQUFLLENBQUM7UUF1RHJCLGFBQVEsR0FBRyxDQUFDLENBQVEsRUFBRSxFQUFFO1lBQzVCLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsRSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNkLE9BQU87YUFDVjtZQUNELElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUMxRCxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDN0M7UUFDTCxDQUFDLENBQUM7UUF0REUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQztJQUM1QyxDQUFDO0lBRUQsa0JBQWtCO0lBQ1gsVUFBVSxDQUFDLFFBQWtCLEVBQUUsY0FBaUMsRUFBRSxFQUFVO1FBQy9FLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuQixPQUFPO1NBQ1Y7UUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQztRQUN0QyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsY0FBYyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDdEQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQUVELGtCQUFrQjtJQUNYLE1BQU07UUFDVCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7U0FDakM7SUFDTCxDQUFDO0lBRUQsa0JBQWtCO0lBQ1gsTUFBTTtRQUNULElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM1RTthQUFNO1lBQ0gsNkRBQTZEO1lBQzdELElBQUksQ0FBQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDdEU7UUFFRCxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBRU8sc0JBQXNCO1FBQzFCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO1lBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN6RTthQUFNO1lBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNsRTtJQUNMLENBQUM7Q0FXSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSWd4T3ZlcmxheVNlcnZpY2UgfSBmcm9tICcuLi9vdmVybGF5JztcbmltcG9ydCB7IFNjcm9sbFN0cmF0ZWd5IH0gZnJvbSAnLi9zY3JvbGwtc3RyYXRlZ3knO1xuXG4vKipcbiAqIE9uIHNjcm9sbCByZXBvc2l0aW9uIHRoZSBvdmVybGF5IGNvbnRlbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBBYnNvbHV0ZVNjcm9sbFN0cmF0ZWd5IGV4dGVuZHMgU2Nyb2xsU3RyYXRlZ3kge1xuICAgIHByaXZhdGUgX2luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50O1xuICAgIHByaXZhdGUgX292ZXJsYXlTZXJ2aWNlOiBJZ3hPdmVybGF5U2VydmljZTtcbiAgICBwcml2YXRlIF9pZDogc3RyaW5nO1xuICAgIHByaXZhdGUgX3Njcm9sbENvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfem9uZTogTmdab25lO1xuXG4gICAgY29uc3RydWN0b3Ioc2Nyb2xsQ29udGFpbmVyPzogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fc2Nyb2xsQ29udGFpbmVyID0gc2Nyb2xsQ29udGFpbmVyO1xuICAgIH1cblxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xuICAgIHB1YmxpYyBpbml0aWFsaXplKGRvY3VtZW50OiBEb2N1bWVudCwgb3ZlcmxheVNlcnZpY2U6IElneE92ZXJsYXlTZXJ2aWNlLCBpZDogc3RyaW5nKSB7XG4gICAgICAgIGlmICh0aGlzLl9pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX292ZXJsYXlTZXJ2aWNlID0gb3ZlcmxheVNlcnZpY2U7XG4gICAgICAgIHRoaXMuX2lkID0gaWQ7XG4gICAgICAgIHRoaXMuX2RvY3VtZW50ID0gZG9jdW1lbnQ7XG4gICAgICAgIHRoaXMuX3pvbmUgPSBvdmVybGF5U2VydmljZS5nZXRPdmVybGF5QnlJZChpZCkubmdab25lO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXG4gICAgcHVibGljIGF0dGFjaCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX3pvbmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkU2Nyb2xsRXZlbnRMaXN0ZW5lcigpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFkZFNjcm9sbEV2ZW50TGlzdGVuZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xuICAgIHB1YmxpYyBkZXRhY2goKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9zY3JvbGxDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX3Njcm9sbENvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRpcmVkIG9mIHRoaXMgdGhpbmcgdGhyb3dpbmcgZXZlcnkgb3RoZXIgdGltZS4gRml4IGl0IGZmcyFcbiAgICAgICAgICAgIHRoaXMuX2RvY3VtZW50Py5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsLCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRTY3JvbGxFdmVudExpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5fc2Nyb2xsQ29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9zY3JvbGxDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbCwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgb25TY3JvbGwgPSAoZTogRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3Qgb3ZlcmxheUluZm8gPSB0aGlzLl9vdmVybGF5U2VydmljZS5nZXRPdmVybGF5QnlJZCh0aGlzLl9pZCk7XG4gICAgICAgIGlmICghb3ZlcmxheUluZm8pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW92ZXJsYXlJbmZvLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMuX292ZXJsYXlTZXJ2aWNlLnJlcG9zaXRpb24odGhpcy5faWQpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbiJdfQ==