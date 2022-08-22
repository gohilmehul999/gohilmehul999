import { fadeIn, fadeOut } from '../../../animations/main';
import { HorizontalAlignment, Util, VerticalAlignment } from './../utilities';
/**
 * Positions the element based on the directions passed in trough PositionSettings.
 * These are Top/Middle/Bottom for verticalDirection and Left/Center/Right for horizontalDirection
 */
export class GlobalPositionStrategy {
    constructor(settings) {
        this._defaultSettings = {
            horizontalDirection: HorizontalAlignment.Center,
            verticalDirection: VerticalAlignment.Middle,
            horizontalStartPoint: HorizontalAlignment.Center,
            verticalStartPoint: VerticalAlignment.Middle,
            openAnimation: fadeIn,
            closeAnimation: fadeOut,
            minSize: { width: 0, height: 0 }
        };
        this.settings = Object.assign({}, this._defaultSettings, settings);
    }
    /** @inheritdoc */
    position(contentElement) {
        contentElement.classList.add('igx-overlay__content--relative');
        contentElement.parentElement.classList.add('igx-overlay__wrapper--flex');
        this.setPosition(contentElement);
    }
    /** @inheritdoc */
    clone() {
        return Util.cloneInstance(this);
    }
    setPosition(contentElement) {
        switch (this.settings.horizontalDirection) {
            case HorizontalAlignment.Left:
                contentElement.parentElement.style.justifyContent = 'flex-start';
                break;
            case HorizontalAlignment.Center:
                contentElement.parentElement.style.justifyContent = 'center';
                break;
            case HorizontalAlignment.Right:
                contentElement.parentElement.style.justifyContent = 'flex-end';
                break;
            default:
                break;
        }
        switch (this.settings.verticalDirection) {
            case VerticalAlignment.Top:
                contentElement.parentElement.style.alignItems = 'flex-start';
                break;
            case VerticalAlignment.Middle:
                contentElement.parentElement.style.alignItems = 'center';
                break;
            case VerticalAlignment.Bottom:
                contentElement.parentElement.style.alignItems = 'flex-end';
                break;
            default:
                break;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLXBvc2l0aW9uLXN0cmF0ZWd5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvaWduaXRldWktYW5ndWxhci9zcmMvbGliL3NlcnZpY2VzL292ZXJsYXkvcG9zaXRpb24vZ2xvYmFsLXBvc2l0aW9uLXN0cmF0ZWd5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFvQixJQUFJLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdoRzs7O0dBR0c7QUFDSCxNQUFNLE9BQU8sc0JBQXNCO0lBYy9CLFlBQVksUUFBMkI7UUFWN0IscUJBQWdCLEdBQXFCO1lBQzNDLG1CQUFtQixFQUFFLG1CQUFtQixDQUFDLE1BQU07WUFDL0MsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUMsTUFBTTtZQUMzQyxvQkFBb0IsRUFBRSxtQkFBbUIsQ0FBQyxNQUFNO1lBQ2hELGtCQUFrQixFQUFFLGlCQUFpQixDQUFDLE1BQU07WUFDNUMsYUFBYSxFQUFFLE1BQU07WUFDckIsY0FBYyxFQUFFLE9BQU87WUFDdkIsT0FBTyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxFQUFFO1NBQ25DLENBQUM7UUFHRSxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsa0JBQWtCO0lBQ1gsUUFBUSxDQUFDLGNBQTJCO1FBQ3ZDLGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7UUFDL0QsY0FBYyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsa0JBQWtCO0lBQ1gsS0FBSztRQUNSLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRVMsV0FBVyxDQUFDLGNBQTJCO1FBQzdDLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRTtZQUN2QyxLQUFLLG1CQUFtQixDQUFDLElBQUk7Z0JBQ3pCLGNBQWMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUM7Z0JBQ2pFLE1BQU07WUFDVixLQUFLLG1CQUFtQixDQUFDLE1BQU07Z0JBQzNCLGNBQWMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7Z0JBQzdELE1BQU07WUFDVixLQUFLLG1CQUFtQixDQUFDLEtBQUs7Z0JBQzFCLGNBQWMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUM7Z0JBQy9ELE1BQU07WUFDVjtnQkFDSSxNQUFNO1NBQ2I7UUFFRCxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUU7WUFDckMsS0FBSyxpQkFBaUIsQ0FBQyxHQUFHO2dCQUN0QixjQUFjLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsWUFBWSxDQUFDO2dCQUM3RCxNQUFNO1lBQ1YsS0FBSyxpQkFBaUIsQ0FBQyxNQUFNO2dCQUN6QixjQUFjLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO2dCQUN6RCxNQUFNO1lBQ1YsS0FBSyxpQkFBaUIsQ0FBQyxNQUFNO2dCQUN6QixjQUFjLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO2dCQUMzRCxNQUFNO1lBQ1Y7Z0JBQ0ksTUFBTTtTQUNiO0lBQ0wsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZmFkZUluLCBmYWRlT3V0IH0gZnJvbSAnLi4vLi4vLi4vYW5pbWF0aW9ucy9tYWluJztcbmltcG9ydCB7IEhvcml6b250YWxBbGlnbm1lbnQsIFBvc2l0aW9uU2V0dGluZ3MsIFV0aWwsIFZlcnRpY2FsQWxpZ25tZW50IH0gZnJvbSAnLi8uLi91dGlsaXRpZXMnO1xuaW1wb3J0IHsgSVBvc2l0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL0lQb3NpdGlvblN0cmF0ZWd5JztcblxuLyoqXG4gKiBQb3NpdGlvbnMgdGhlIGVsZW1lbnQgYmFzZWQgb24gdGhlIGRpcmVjdGlvbnMgcGFzc2VkIGluIHRyb3VnaCBQb3NpdGlvblNldHRpbmdzLlxuICogVGhlc2UgYXJlIFRvcC9NaWRkbGUvQm90dG9tIGZvciB2ZXJ0aWNhbERpcmVjdGlvbiBhbmQgTGVmdC9DZW50ZXIvUmlnaHQgZm9yIGhvcml6b250YWxEaXJlY3Rpb25cbiAqL1xuZXhwb3J0IGNsYXNzIEdsb2JhbFBvc2l0aW9uU3RyYXRlZ3kgaW1wbGVtZW50cyBJUG9zaXRpb25TdHJhdGVneSB7XG4gICAgLyoqIEBpbmhlcml0ZG9jICovXG4gICAgcHVibGljIHNldHRpbmdzOiBQb3NpdGlvblNldHRpbmdzO1xuXG4gICAgcHJvdGVjdGVkIF9kZWZhdWx0U2V0dGluZ3M6IFBvc2l0aW9uU2V0dGluZ3MgPSB7XG4gICAgICAgIGhvcml6b250YWxEaXJlY3Rpb246IEhvcml6b250YWxBbGlnbm1lbnQuQ2VudGVyLFxuICAgICAgICB2ZXJ0aWNhbERpcmVjdGlvbjogVmVydGljYWxBbGlnbm1lbnQuTWlkZGxlLFxuICAgICAgICBob3Jpem9udGFsU3RhcnRQb2ludDogSG9yaXpvbnRhbEFsaWdubWVudC5DZW50ZXIsXG4gICAgICAgIHZlcnRpY2FsU3RhcnRQb2ludDogVmVydGljYWxBbGlnbm1lbnQuTWlkZGxlLFxuICAgICAgICBvcGVuQW5pbWF0aW9uOiBmYWRlSW4sXG4gICAgICAgIGNsb3NlQW5pbWF0aW9uOiBmYWRlT3V0LFxuICAgICAgICBtaW5TaXplOiB7IHdpZHRoOiAwLCBoZWlnaHQ6IDAgfVxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5ncz86IFBvc2l0aW9uU2V0dGluZ3MpIHtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX2RlZmF1bHRTZXR0aW5ncywgc2V0dGluZ3MpO1xuICAgIH1cblxuICAgIC8qKiBAaW5oZXJpdGRvYyAqL1xuICAgIHB1YmxpYyBwb3NpdGlvbihjb250ZW50RWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY29udGVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaWd4LW92ZXJsYXlfX2NvbnRlbnQtLXJlbGF0aXZlJyk7XG4gICAgICAgIGNvbnRlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaWd4LW92ZXJsYXlfX3dyYXBwZXItLWZsZXgnKTtcbiAgICAgICAgdGhpcy5zZXRQb3NpdGlvbihjb250ZW50RWxlbWVudCk7XG4gICAgfVxuXG4gICAgLyoqIEBpbmhlcml0ZG9jICovXG4gICAgcHVibGljIGNsb25lKCk6IElQb3NpdGlvblN0cmF0ZWd5IHtcbiAgICAgICAgcmV0dXJuIFV0aWwuY2xvbmVJbnN0YW5jZSh0aGlzKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0UG9zaXRpb24oY29udGVudEVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5zZXR0aW5ncy5ob3Jpem9udGFsRGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIEhvcml6b250YWxBbGlnbm1lbnQuTGVmdDpcbiAgICAgICAgICAgICAgICBjb250ZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2ZsZXgtc3RhcnQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBIb3Jpem9udGFsQWxpZ25tZW50LkNlbnRlcjpcbiAgICAgICAgICAgICAgICBjb250ZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2NlbnRlcic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEhvcml6b250YWxBbGlnbm1lbnQuUmlnaHQ6XG4gICAgICAgICAgICAgICAgY29udGVudEVsZW1lbnQucGFyZW50RWxlbWVudC5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdmbGV4LWVuZCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnNldHRpbmdzLnZlcnRpY2FsRGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFZlcnRpY2FsQWxpZ25tZW50LlRvcDpcbiAgICAgICAgICAgICAgICBjb250ZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnN0eWxlLmFsaWduSXRlbXMgPSAnZmxleC1zdGFydCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFZlcnRpY2FsQWxpZ25tZW50Lk1pZGRsZTpcbiAgICAgICAgICAgICAgICBjb250ZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnN0eWxlLmFsaWduSXRlbXMgPSAnY2VudGVyJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgVmVydGljYWxBbGlnbm1lbnQuQm90dG9tOlxuICAgICAgICAgICAgICAgIGNvbnRlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuc3R5bGUuYWxpZ25JdGVtcyA9ICdmbGV4LWVuZCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4iXX0=