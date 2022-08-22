import { scaleInVerTop, scaleOutVerTop } from '../../../animations/main';
import { HorizontalAlignment, Util, VerticalAlignment } from './../utilities';
/**
 * Positions the element based on the directions and start point passed in trough PositionSettings.
 * It is possible to either pass a start point or an HTMLElement as a positioning base.
 */
export class ConnectedPositioningStrategy {
    constructor(settings) {
        this._defaultSettings = {
            horizontalDirection: HorizontalAlignment.Right,
            verticalDirection: VerticalAlignment.Bottom,
            horizontalStartPoint: HorizontalAlignment.Left,
            verticalStartPoint: VerticalAlignment.Bottom,
            openAnimation: scaleInVerTop,
            closeAnimation: scaleOutVerTop,
            minSize: { width: 0, height: 0 }
        };
        this.settings = Object.assign({}, this._defaultSettings, settings);
    }
    /** @inheritdoc */
    position(contentElement, size, document, initialCall, target) {
        const targetElement = target || this.settings.target;
        const rects = this.calculateElementRectangles(contentElement, targetElement);
        this.setStyle(contentElement, rects.targetRect, rects.elementRect, {});
    }
    /**
     * @inheritdoc
     * Creates clone of this position strategy
     * @returns clone of this position strategy
     */
    clone() {
        return Util.cloneInstance(this);
    }
    /**
     * Obtains the DomRect objects for the required elements - target and element to position
     *
     * @returns target and element DomRect objects
     */
    calculateElementRectangles(contentElement, target) {
        return {
            targetRect: Util.getTargetRect(target),
            elementRect: contentElement.getBoundingClientRect()
        };
    }
    /**
     * Sets element's style which effectively positions provided element according
     * to provided position settings
     *
     * @param element Element to position
     * @param targetRect Bounding rectangle of strategy target
     * @param elementRect Bounding rectangle of the element
     */
    setStyle(element, targetRect, elementRect, connectedFit) {
        const horizontalOffset = connectedFit.horizontalOffset ? connectedFit.horizontalOffset : 0;
        const verticalOffset = connectedFit.verticalOffset ? connectedFit.verticalOffset : 0;
        const startPoint = {
            x: targetRect.right + targetRect.width * this.settings.horizontalStartPoint + horizontalOffset,
            y: targetRect.bottom + targetRect.height * this.settings.verticalStartPoint + verticalOffset
        };
        const wrapperRect = element.parentElement.getBoundingClientRect();
        //  clean up styles - if auto position strategy is chosen we may pass here several times
        element.style.right = '';
        element.style.left = '';
        element.style.bottom = '';
        element.style.top = '';
        switch (this.settings.horizontalDirection) {
            case HorizontalAlignment.Left:
                element.style.right = `${Math.round(wrapperRect.right - startPoint.x)}px`;
                break;
            case HorizontalAlignment.Center:
                element.style.left = `${Math.round(startPoint.x - wrapperRect.left - elementRect.width / 2)}px`;
                break;
            case HorizontalAlignment.Right:
                element.style.left = `${Math.round(startPoint.x - wrapperRect.left)}px`;
                break;
        }
        switch (this.settings.verticalDirection) {
            case VerticalAlignment.Top:
                element.style.bottom = `${Math.round(wrapperRect.bottom - startPoint.y)}px`;
                break;
            case VerticalAlignment.Middle:
                element.style.top = `${Math.round(startPoint.y - wrapperRect.top - elementRect.height / 2)}px`;
                break;
            case VerticalAlignment.Bottom:
                element.style.top = `${Math.round(startPoint.y - wrapperRect.top)}px`;
                break;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGVkLXBvc2l0aW9uaW5nLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWduaXRldWktYW5ndWxhci9zcmMvbGliL3NlcnZpY2VzL292ZXJsYXkvcG9zaXRpb24vY29ubmVjdGVkLXBvc2l0aW9uaW5nLXN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFekUsT0FBTyxFQUNMLG1CQUFtQixFQUluQixJQUFJLEVBQ0osaUJBQWlCLEVBQ2xCLE1BQU0sZ0JBQWdCLENBQUM7QUFHeEI7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLDRCQUE0QjtJQWN2QyxZQUFZLFFBQTJCO1FBVi9CLHFCQUFnQixHQUFxQjtZQUMzQyxtQkFBbUIsRUFBRSxtQkFBbUIsQ0FBQyxLQUFLO1lBQzlDLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDLE1BQU07WUFDM0Msb0JBQW9CLEVBQUUsbUJBQW1CLENBQUMsSUFBSTtZQUM5QyxrQkFBa0IsRUFBRSxpQkFBaUIsQ0FBQyxNQUFNO1lBQzVDLGFBQWEsRUFBRSxhQUFhO1lBQzVCLGNBQWMsRUFBRSxjQUFjO1lBQzlCLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtTQUNqQyxDQUFDO1FBR0EsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELGtCQUFrQjtJQUNYLFFBQVEsQ0FBQyxjQUEyQixFQUFFLElBQVUsRUFBRSxRQUFtQixFQUFFLFdBQXFCLEVBQUUsTUFBNEI7UUFDL0gsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMs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LENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQzVFLE1BQU07WUFDUixLQUFLLGlCQUFpQixDQUFDLE1BQU07Z0JBQzNCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUMvRixNQUFNO1lBQ1IsS0FBSyxpQkFBaUIsQ0FBQyxNQUFNO2dCQUMzQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDdEUsTUFBTTtTQUNUO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2NhbGVJblZlclRvcCwgc2NhbGVPdXRWZXJUb3AgfSBmcm9tICcuLi8uLi8uLi9hbmltYXRpb25zL21haW4nO1xuaW1wb3J0IHsgQ29ubmVjdGVkRml0IH0gZnJvbSAnLi4vdXRpbGl0aWVzJztcbmltcG9ydCB7XG4gIEhvcml6b250YWxBbGlnbm1lbnQsXG4gIFBvaW50LFxuICBQb3NpdGlvblNldHRpbmdzLFxuICBTaXplLFxuICBVdGlsLFxuICBWZXJ0aWNhbEFsaWdubWVudFxufSBmcm9tICcuLy4uL3V0aWxpdGllcyc7XG5pbXBvcnQgeyBJUG9zaXRpb25TdHJhdGVneSB9IGZyb20gJy4vSVBvc2l0aW9uU3RyYXRlZ3knO1xuXG4vKipcbiAqIFBvc2l0aW9ucyB0aGUgZWxlbWVudCBiYXNlZCBvbiB0aGUgZGlyZWN0aW9ucyBhbmQgc3RhcnQgcG9pbnQgcGFzc2VkIGluIHRyb3VnaCBQb3NpdGlvblNldHRpbmdzLlxuICogSXQgaXMgcG9zc2libGUgdG8gZWl0aGVyIHBhc3MgYSBzdGFydCBwb2ludCBvciBhbiBIVE1MRWxlbWVudCBhcyBhIHBvc2l0aW9uaW5nIGJhc2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25uZWN0ZWRQb3NpdGlvbmluZ1N0cmF0ZWd5IGltcGxlbWVudHMgSVBvc2l0aW9uU3RyYXRlZ3kge1xuICAvKiogQGluaGVyaXRkb2MgKi9cbiAgcHVibGljIHNldHRpbmdzOiBQb3NpdGlvblNldHRpbmdzO1xuXG4gIHByaXZhdGUgX2RlZmF1bHRTZXR0aW5nczogUG9zaXRpb25TZXR0aW5ncyA9IHtcbiAgICBob3Jpem9udGFsRGlyZWN0aW9uOiBIb3Jpem9udGFsQWxpZ25tZW50LlJpZ2h0LFxuICAgIHZlcnRpY2FsRGlyZWN0aW9uOiBWZXJ0aWNhbEFsaWdubWVudC5Cb3R0b20sXG4gICAgaG9yaXpvbnRhbFN0YXJ0UG9pbnQ6IEhvcml6b250YWxBbGlnbm1lbnQuTGVmdCxcbiAgICB2ZXJ0aWNhbFN0YXJ0UG9pbnQ6IFZlcnRpY2FsQWxpZ25tZW50LkJvdHRvbSxcbiAgICBvcGVuQW5pbWF0aW9uOiBzY2FsZUluVmVyVG9wLFxuICAgIGNsb3NlQW5pbWF0aW9uOiBzY2FsZU91dFZlclRvcCxcbiAgICBtaW5TaXplOiB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzPzogUG9zaXRpb25TZXR0aW5ncykge1xuICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9kZWZhdWx0U2V0dGluZ3MsIHNldHRpbmdzKTtcbiAgfVxuXG4gIC8qKiBAaW5oZXJpdGRvYyAqL1xuICBwdWJsaWMgcG9zaXRpb24oY29udGVudEVsZW1lbnQ6IEhUTUxFbGVtZW50LCBzaXplOiBTaXplLCBkb2N1bWVudD86IERvY3VtZW50LCBpbml0aWFsQ2FsbD86IGJvb2xlYW4sIHRhcmdldD86IFBvaW50IHwgSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCB0YXJnZXRFbGVtZW50ID0gdGFyZ2V0IHx8IHRoaXMuc2V0dGluZ3MudGFyZ2V0O1xuICAgIGNvbnN0IHJlY3RzID0gIHRoaXMuY2FsY3VsYXRlRWxlbWVudFJlY3RhbmdsZXMoY29udGVudEVsZW1lbnQsIHRhcmdldEVsZW1lbnQpO1xuICAgIHRoaXMuc2V0U3R5bGUoY29udGVudEVsZW1lbnQsIHJlY3RzLnRhcmdldFJlY3QsIHJlY3RzLmVsZW1lbnRSZWN0LCB7fSk7XG4gIH1cblxuICAvKipcbiAgICogQGluaGVyaXRkb2NcbiAgICogQ3JlYXRlcyBjbG9uZSBvZiB0aGlzIHBvc2l0aW9uIHN0cmF0ZWd5XG4gICAqIEByZXR1cm5zIGNsb25lIG9mIHRoaXMgcG9zaXRpb24gc3RyYXRlZ3lcbiAgICovXG4gIHB1YmxpYyBjbG9uZSgpOiBJUG9zaXRpb25TdHJhdGVneSB7XG4gICAgcmV0dXJuIFV0aWwuY2xvbmVJbnN0YW5jZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPYnRhaW5zIHRoZSBEb21SZWN0IG9iamVjdHMgZm9yIHRoZSByZXF1aXJlZCBlbGVtZW50cyAtIHRhcmdldCBhbmQgZWxlbWVudCB0byBwb3NpdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB0YXJnZXQgYW5kIGVsZW1lbnQgRG9tUmVjdCBvYmplY3RzXG4gICAqL1xuICBwcm90ZWN0ZWQgY2FsY3VsYXRlRWxlbWVudFJlY3RhbmdsZXMoY29udGVudEVsZW1lbnQsIHRhcmdldDogUG9pbnQgfCBIVE1MRWxlbWVudCk6XG4gICAgeyB0YXJnZXRSZWN0OiBQYXJ0aWFsPERPTVJlY3Q+OyBlbGVtZW50UmVjdDogUGFydGlhbDxET01SZWN0PiB9IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGFyZ2V0UmVjdDogVXRpbC5nZXRUYXJnZXRSZWN0KHRhcmdldCksXG4gICAgICAgICAgZWxlbWVudFJlY3Q6IGNvbnRlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIGFzIERPTVJlY3RcbiAgICAgIH07XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBlbGVtZW50J3Mgc3R5bGUgd2hpY2ggZWZmZWN0aXZlbHkgcG9zaXRpb25zIHByb3ZpZGVkIGVsZW1lbnQgYWNjb3JkaW5nXG4gICAqIHRvIHByb3ZpZGVkIHBvc2l0aW9uIHNldHRpbmdzXG4gICAqXG4gICAqIEBwYXJhbSBlbGVtZW50IEVsZW1lbnQgdG8gcG9zaXRpb25cbiAgICogQHBhcmFtIHRhcmdldFJlY3QgQm91bmRpbmcgcmVjdGFuZ2xlIG9mIHN0cmF0ZWd5IHRhcmdldFxuICAgKiBAcGFyYW0gZWxlbWVudFJlY3QgQm91bmRpbmcgcmVjdGFuZ2xlIG9mIHRoZSBlbGVtZW50XG4gICAqL1xuICBwcm90ZWN0ZWQgc2V0U3R5bGUoZWxlbWVudDogSFRNTEVsZW1lbnQsIHRhcmdldFJlY3Q6IFBhcnRpYWw8RE9NUmVjdD4sIGVsZW1lbnRSZWN0OiBQYXJ0aWFsPERPTVJlY3Q+LCBjb25uZWN0ZWRGaXQ6IENvbm5lY3RlZEZpdCkge1xuICAgICAgY29uc3QgaG9yaXpvbnRhbE9mZnNldCA9IGNvbm5lY3RlZEZpdC5ob3Jpem9udGFsT2Zmc2V0ID8gY29ubmVjdGVkRml0Lmhvcml6b250YWxPZmZzZXQgOiAwO1xuICAgICAgY29uc3QgdmVydGljYWxPZmZzZXQgPSBjb25uZWN0ZWRGaXQudmVydGljYWxPZmZzZXQgPyBjb25uZWN0ZWRGaXQudmVydGljYWxPZmZzZXQgOiAwO1xuICAgIGNvbnN0IHN0YXJ0UG9pbnQ6IFBvaW50ID0ge1xuICAgICAgeDogdGFyZ2V0UmVjdC5yaWdodCArIHRhcmdldFJlY3Qud2lkdGggKiB0aGlzLnNldHRpbmdzLmhvcml6b250YWxTdGFydFBvaW50ICsgaG9yaXpvbnRhbE9mZnNldCxcbiAgICAgIHk6IHRhcmdldFJlY3QuYm90dG9tICsgdGFyZ2V0UmVjdC5oZWlnaHQgKiB0aGlzLnNldHRpbmdzLnZlcnRpY2FsU3RhcnRQb2ludCArIHZlcnRpY2FsT2Zmc2V0XG4gICAgfTtcbiAgICBjb25zdCB3cmFwcGVyUmVjdDogQ2xpZW50UmVjdCA9IGVsZW1lbnQucGFyZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vICBjbGVhbiB1cCBzdHlsZXMgLSBpZiBhdXRvIHBvc2l0aW9uIHN0cmF0ZWd5IGlzIGNob3NlbiB3ZSBtYXkgcGFzcyBoZXJlIHNldmVyYWwgdGltZXNcbiAgICBlbGVtZW50LnN0eWxlLnJpZ2h0ID0gJyc7XG4gICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gJyc7XG4gICAgZWxlbWVudC5zdHlsZS5ib3R0b20gPSAnJztcbiAgICBlbGVtZW50LnN0eWxlLnRvcCA9ICcnO1xuXG4gICAgc3dpdGNoICh0aGlzLnNldHRpbmdzLmhvcml6b250YWxEaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgSG9yaXpvbnRhbEFsaWdubWVudC5MZWZ0OlxuICAgICAgICBlbGVtZW50LnN0eWxlLnJpZ2h0ID0gYCR7TWF0aC5yb3VuZCh3cmFwcGVyUmVjdC5yaWdodCAtIHN0YXJ0UG9pbnQueCl9cHhgO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgSG9yaXpvbnRhbEFsaWdubWVudC5DZW50ZXI6XG4gICAgICAgIGVsZW1lbnQuc3R5bGUubGVmdCA9IGAke01hdGgucm91bmQoc3RhcnRQb2ludC54IC0gd3JhcHBlclJlY3QubGVmdCAtIGVsZW1lbnRSZWN0LndpZHRoIC8gMil9cHhgO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgSG9yaXpvbnRhbEFsaWdubWVudC5SaWdodDpcbiAgICAgICAgZWxlbWVudC5zdHlsZS5sZWZ0ID0gYCR7TWF0aC5yb3VuZChzdGFydFBvaW50LnggLSB3cmFwcGVyUmVjdC5sZWZ0KX1weGA7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHN3aXRjaCAodGhpcy5zZXR0aW5ncy52ZXJ0aWNhbERpcmVjdGlvbikge1xuICAgICAgY2FzZSBWZXJ0aWNhbEFsaWdubWVudC5Ub3A6XG4gICAgICAgIGVsZW1lbnQuc3R5bGUuYm90dG9tID0gYCR7TWF0aC5yb3VuZCh3cmFwcGVyUmVjdC5ib3R0b20gLSBzdGFydFBvaW50LnkpfXB4YDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFZlcnRpY2FsQWxpZ25tZW50Lk1pZGRsZTpcbiAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBgJHtNYXRoLnJvdW5kKHN0YXJ0UG9pbnQueSAtIHdyYXBwZXJSZWN0LnRvcCAtIGVsZW1lbnRSZWN0LmhlaWdodCAvIDIpfXB4YDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFZlcnRpY2FsQWxpZ25tZW50LkJvdHRvbTpcbiAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBgJHtNYXRoLnJvdW5kKHN0YXJ0UG9pbnQueSAtIHdyYXBwZXJSZWN0LnRvcCl9cHhgO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cbiJdfQ==