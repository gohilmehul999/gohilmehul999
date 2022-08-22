import { isHorizontalAnimation, isVerticalAnimation, reverseAnimationResolver } from '../../../core/utils';
import { HorizontalAlignment, VerticalAlignment } from './../utilities';
import { BaseFitPositionStrategy } from './base-fit-position-strategy';
/**
 * Positions the element as in **Connected** positioning strategy and re-positions the element in
 * the view port (calculating a different start point) in case the element is partially getting out of view
 */
export class AutoPositionStrategy extends BaseFitPositionStrategy {
    /** @inheritdoc */
    fitInViewport(element, connectedFit) {
        const transformString = [];
        if (connectedFit.fitHorizontal.back < 0 || connectedFit.fitHorizontal.forward < 0) {
            if (this.canFlipHorizontal(connectedFit)) {
                this.flipHorizontal();
                this.flipAnimation(FlipDirection.Horizontal);
            }
            else {
                const horizontalPush = this.horizontalPush(connectedFit);
                transformString.push(`translateX(${horizontalPush}px)`);
            }
        }
        if (connectedFit.fitVertical.back < 0 || connectedFit.fitVertical.forward < 0) {
            if (this.canFlipVertical(connectedFit)) {
                this.flipVertical();
                this.flipAnimation(FlipDirection.Vertical);
            }
            else {
                const verticalPush = this.verticalPush(connectedFit);
                transformString.push(`translateY(${verticalPush}px)`);
            }
        }
        element.style.transform = transformString.join(' ').trim();
    }
    /**
     * Checks if element can be flipped without get off the viewport
     *
     * @param connectedFit connectedFit object containing all necessary parameters
     * @returns true if element can be flipped and stain in viewport
     */
    canFlipHorizontal(connectedFit) {
        //  HorizontalAlignment can be Left = -1; Center = -0.5 or Right = 0.
        //  To virtually flip direction and start point (both are HorizontalAlignment) we can do this:
        //  flippedAlignment = (-1) * (HorizontalAlignment + 1)
        //  this way:
        //  (-1) * (Left + 1) = 0 = Right
        //  (-1) * (Center + 1) = -0.5 = Center
        //  (-1) * (Right + 1) = -1 = Left
        const flippedStartPoint = (-1) * (this.settings.horizontalStartPoint + 1);
        const flippedDirection = (-1) * (this.settings.horizontalDirection + 1);
        const leftBorder = this.calculateLeft(connectedFit.targetRect, connectedFit.contentElementRect, flippedStartPoint, flippedDirection, 0);
        const rightBorder = leftBorder + connectedFit.contentElementRect.width;
        return 0 < leftBorder && rightBorder < connectedFit.viewPortRect.width;
    }
    /**
     * Checks if element can be flipped without get off the viewport
     *
     * @param connectedFit connectedFit object containing all necessary parameters
     * @returns true if element can be flipped and stain in viewport
     */
    canFlipVertical(connectedFit) {
        const flippedStartPoint = (-1) * (this.settings.verticalStartPoint + 1);
        const flippedDirection = (-1) * (this.settings.verticalDirection + 1);
        const topBorder = this.calculateTop(connectedFit.targetRect, connectedFit.contentElementRect, flippedStartPoint, flippedDirection, 0);
        const bottomBorder = topBorder + connectedFit.contentElementRect.height;
        return 0 < topBorder && bottomBorder < connectedFit.viewPortRect.height;
    }
    /**
     * Flips direction and start point of the position settings
     */
    flipHorizontal() {
        switch (this.settings.horizontalDirection) {
            case HorizontalAlignment.Left:
                this.settings.horizontalDirection = HorizontalAlignment.Right;
                break;
            case HorizontalAlignment.Right:
                this.settings.horizontalDirection = HorizontalAlignment.Left;
                break;
        }
        switch (this.settings.horizontalStartPoint) {
            case HorizontalAlignment.Left:
                this.settings.horizontalStartPoint = HorizontalAlignment.Right;
                break;
            case HorizontalAlignment.Right:
                this.settings.horizontalStartPoint = HorizontalAlignment.Left;
                break;
        }
    }
    /**
     * Flips direction and start point of the position settings
     */
    flipVertical() {
        switch (this.settings.verticalDirection) {
            case VerticalAlignment.Top:
                this.settings.verticalDirection = VerticalAlignment.Bottom;
                break;
            case VerticalAlignment.Bottom:
                this.settings.verticalDirection = VerticalAlignment.Top;
                break;
        }
        switch (this.settings.verticalStartPoint) {
            case VerticalAlignment.Top:
                this.settings.verticalStartPoint = VerticalAlignment.Bottom;
                break;
            case VerticalAlignment.Bottom:
                this.settings.verticalStartPoint = VerticalAlignment.Top;
                break;
        }
    }
    /**
     * Calculates necessary horizontal push according to provided connectedFit
     *
     * @param connectedFit connectedFit object containing all necessary parameters
     * @returns amount of necessary translation which will push the element into viewport
     */
    horizontalPush(connectedFit) {
        const leftExtend = connectedFit.left;
        const rightExtend = connectedFit.right - connectedFit.viewPortRect.width;
        //  if leftExtend < 0 overlay goes beyond left end of the screen. We should push it back with exactly
        //  as much as it is beyond the screen.
        //  if rightExtend > 0 overlay goes beyond right end of the screen. We should push it back with the
        //  extend but with amount not bigger than what left between left border of screen and left border of
        //  overlay, e.g. leftExtend
        if (leftExtend < 0) {
            return Math.abs(leftExtend);
        }
        else if (rightExtend > 0) {
            return -Math.min(rightExtend, leftExtend);
        }
        else {
            return 0;
        }
    }
    /**
     * Calculates necessary vertical push according to provided connectedFit
     *
     * @param connectedFit connectedFit object containing all necessary parameters
     * @returns amount of necessary translation which will push the element into viewport
     */
    verticalPush(connectedFit) {
        const topExtend = connectedFit.top;
        const bottomExtend = connectedFit.bottom - connectedFit.viewPortRect.height;
        if (topExtend < 0) {
            return Math.abs(topExtend);
        }
        else if (bottomExtend > 0) {
            return -Math.min(bottomExtend, topExtend);
        }
        else {
            return 0;
        }
    }
    /**
     * Changes open and close animation with reverse animation if one exists
     *
     * @param flipDirection direction for which to change the animations
     */
    flipAnimation(flipDirection) {
        if (this.settings.openAnimation) {
            this.settings.openAnimation = this.updateAnimation(this.settings.openAnimation, flipDirection);
        }
        if (this.settings.closeAnimation) {
            this.settings.closeAnimation = this.updateAnimation(this.settings.closeAnimation, flipDirection);
        }
    }
    /**
     * Tries to find the reverse animation according to provided direction
     *
     * @param animation animation to update
     * @param direction required animation direction
     * @returns reverse animation in given direction if one exists
     */
    updateAnimation(animation, direction) {
        switch (direction) {
            case FlipDirection.Horizontal:
                if (isHorizontalAnimation(animation)) {
                    return reverseAnimationResolver(animation);
                }
                break;
            case FlipDirection.Vertical:
                if (isVerticalAnimation(animation)) {
                    return reverseAnimationResolver(animation);
                }
                break;
        }
        return animation;
    }
}
var FlipDirection;
(function (FlipDirection) {
    FlipDirection[FlipDirection["Horizontal"] = 0] = "Horizontal";
    FlipDirection[FlipDirection["Vertical"] = 1] = "Vertical";
})(FlipDirection || (FlipDirection = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1wb3NpdGlvbi1zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2lnbml0ZXVpLWFuZ3VsYXIvc3JjL2xpYi9zZXJ2aWNlcy9vdmVybGF5L3Bvc2l0aW9uL2F1dG8tcG9zaXRpb24tc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLHFCQUFxQixFQUFFLG1CQUFtQixFQUFFLHdCQUF3QixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0csT0FBTyxFQUFnQixtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXZFOzs7R0FHRztBQUNILE1BQU0sT0FBTyxvQkFBcUIsU0FBUSx1QkFBdUI7SUFFN0Qsa0JBQWtCO0lBQ1IsYUFBYSxDQUFDLE9BQW9CLEVBQUUsWUFBMEI7UUFDcEUsTUFBTSxlQUFlLEdBQWEsRUFBRSxDQUFDO1FBQ3JDLElBQUksWUFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLFlBQVksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRTtZQUMvRSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNoRDtpQkFBTTtnQkFDSCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN6RCxlQUFlLENBQUMsSUFBSSxDQUFDLGNBQWMsY0FBYyxLQUFLLENBQUMsQ0FBQzthQUMzRDtTQUNKO1FBRUQsSUFBSSxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxDQUFD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LGNBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1NBQ3BHO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNLLGVBQWUsQ0FBQyxTQUFxQyxFQUFFLFNBQXdCO1FBQ25GLFFBQVEsU0FBUyxFQUFFO1lBQ2YsS0FBSyxhQUFhLENBQUMsVUFBVTtnQkFDekIsSUFBSSxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDbEMsT0FBTyx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDOUM7Z0JBQ0QsTUFBTTtZQUNWLEtBQUssYUFBYSxDQUFDLFFBQVE7Z0JBQ3ZCLElBQUksbUJBQW1CLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ2hDLE9BQU8sd0JBQXdCLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQzlDO2dCQUNELE1BQU07U0FDYjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7Q0FDSjtBQUVELElBQUssYUFHSjtBQUhELFdBQUssYUFBYTtJQUNkLDZEQUFVLENBQUE7SUFDVix5REFBUSxDQUFBO0FBQ1osQ0FBQyxFQUhJLGFBQWEsS0FBYixhQUFhLFFBR2pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQW5pbWF0aW9uUmVmZXJlbmNlTWV0YWRhdGEgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IGlzSG9yaXpvbnRhbEFuaW1hdGlvbiwgaXNWZXJ0aWNhbEFuaW1hdGlvbiwgcmV2ZXJzZUFuaW1hdGlvblJlc29sdmVyIH0gZnJvbSAnLi4vLi4vLi4vY29yZS91dGlscyc7XG5pbXBvcnQgeyBDb25uZWN0ZWRGaXQsIEhvcml6b250YWxBbGlnbm1lbnQsIFZlcnRpY2FsQWxpZ25tZW50IH0gZnJvbSAnLi8uLi91dGlsaXRpZXMnO1xuaW1wb3J0IHsgQmFzZUZpdFBvc2l0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL2Jhc2UtZml0LXBvc2l0aW9uLXN0cmF0ZWd5JztcblxuLyoqXG4gKiBQb3NpdGlvbnMgdGhlIGVsZW1lbnQgYXMgaW4gKipDb25uZWN0ZWQqKiBwb3NpdGlvbmluZyBzdHJhdGVneSBhbmQgcmUtcG9zaXRpb25zIHRoZSBlbGVtZW50IGluXG4gKiB0aGUgdmlldyBwb3J0IChjYWxjdWxhdGluZyBhIGRpZmZlcmVudCBzdGFydCBwb2ludCkgaW4gY2FzZSB0aGUgZWxlbWVudCBpcyBwYXJ0aWFsbHkgZ2V0dGluZyBvdXQgb2Ygdmlld1xuICovXG5leHBvcnQgY2xhc3MgQXV0b1Bvc2l0aW9uU3RyYXRlZ3kgZXh0ZW5kcyBCYXNlRml0UG9zaXRpb25TdHJhdGVneSB7XG5cbiAgICAvKiogQGluaGVyaXRkb2MgKi9cbiAgICBwcm90ZWN0ZWQgZml0SW5WaWV3cG9ydChlbGVtZW50OiBIVE1MRWxlbWVudCwgY29ubmVjdGVkRml0OiBDb25uZWN0ZWRGaXQpIHtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtU3RyaW5nOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBpZiAoY29ubmVjdGVkRml0LmZpdEhvcml6b250YWwuYmFjayA8IDAgfHwgY29ubmVjdGVkRml0LmZpdEhvcml6b250YWwuZm9yd2FyZCA8IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbkZsaXBIb3Jpem9udGFsKGNvbm5lY3RlZEZpdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZsaXBIb3Jpem9udGFsKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5mbGlwQW5pbWF0aW9uKEZsaXBEaXJlY3Rpb24uSG9yaXpvbnRhbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGhvcml6b250YWxQdXNoID0gdGhpcy5ob3Jpem9udGFsUHVzaChjb25uZWN0ZWRGaXQpO1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybVN0cmluZy5wdXNoKGB0cmFuc2xhdGVYKCR7aG9yaXpvbnRhbFB1c2h9cHgpYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29ubmVjdGVkRml0LmZpdFZlcnRpY2FsLmJhY2sgPCAwIHx8IGNvbm5lY3RlZEZpdC5maXRWZXJ0aWNhbC5mb3J3YXJkIDwgMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuY2FuRmxpcFZlcnRpY2FsKGNvbm5lY3RlZEZpdCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZsaXBWZXJ0aWNhbCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmxpcEFuaW1hdGlvbihGbGlwRGlyZWN0aW9uLlZlcnRpY2FsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmVydGljYWxQdXNoID0gdGhpcy52ZXJ0aWNhbFB1c2goY29ubmVjdGVkRml0KTtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1TdHJpbmcucHVzaChgdHJhbnNsYXRlWSgke3ZlcnRpY2FsUHVzaH1weClgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nLmpvaW4oJyAnKS50cmltKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIGVsZW1lbnQgY2FuIGJlIGZsaXBwZWQgd2l0aG91dCBnZXQgb2ZmIHRoZSB2aWV3cG9ydFxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbm5lY3RlZEZpdCBjb25uZWN0ZWRGaXQgb2JqZWN0IGNvbnRhaW5pbmcgYWxsIG5lY2Vzc2FyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybnMgdHJ1ZSBpZiBlbGVtZW50IGNhbiBiZSBmbGlwcGVkIGFuZCBzdGFpbiBpbiB2aWV3cG9ydFxuICAgICAqL1xuICAgIHByaXZhdGUgY2FuRmxpcEhvcml6b250YWwoY29ubmVjdGVkRml0OiBDb25uZWN0ZWRGaXQpOiBib29sZWFuIHtcbiAgICAgICAgLy8gIEhvcml6b250YWxBbGlnbm1lbnQgY2FuIGJlIExlZnQgPSAtMTsgQ2VudGVyID0gLTAuNSBvciBSaWdodCA9IDAuXG4gICAgICAgIC8vICBUbyB2aXJ0dWFsbHkgZmxpcCBkaXJlY3Rpb24gYW5kIHN0YXJ0IHBvaW50IChib3RoIGFyZSBIb3Jpem9udGFsQWxpZ25tZW50KSB3ZSBjYW4gZG8gdGhpczpcbiAgICAgICAgLy8gIGZsaXBwZWRBbGlnbm1lbnQgPSAoLTEpICogKEhvcml6b250YWxBbGlnbm1lbnQgKyAxKVxuICAgICAgICAvLyAgdGhpcyB3YXk6XG4gICAgICAgIC8vICAoLTEpICogKExlZnQgKyAxKSA9IDAgPSBSaWdodFxuICAgICAgICAvLyAgKC0xKSAqIChDZW50ZXIgKyAxKSA9IC0wLjUgPSBDZW50ZXJcbiAgICAgICAgLy8gICgtMSkgKiAoUmlnaHQgKyAxKSA9IC0xID0gTGVmdFxuICAgICAgICBjb25zdCBmbGlwcGVkU3RhcnRQb2ludCA9ICgtMSkgKiAodGhpcy5zZXR0aW5ncy5ob3Jpem9udGFsU3RhcnRQb2ludCArIDEpO1xuICAgICAgICBjb25zdCBmbGlwcGVkRGlyZWN0aW9uID0gKC0xKSAqICh0aGlzLnNldHRpbmdzLmhvcml6b250YWxEaXJlY3Rpb24gKyAxKTtcblxuICAgICAgICBjb25zdCBsZWZ0Qm9yZGVyID0gdGhpcy5jYWxjdWxhdGVMZWZ0KFxuICAgICAgICAgICAgY29ubmVjdGVkRml0LnRhcmdldFJlY3QsIGNvbm5lY3RlZEZpdC5jb250ZW50RWxlbWVudFJlY3QsIGZsaXBwZWRTdGFydFBvaW50LCBmbGlwcGVkRGlyZWN0aW9uLCAwKTtcbiAgICAgICAgY29uc3QgcmlnaHRCb3JkZXIgPSBsZWZ0Qm9yZGVyICsgY29ubmVjdGVkRml0LmNvbnRlbnRFbGVtZW50UmVjdC53aWR0aDtcbiAgICAgICAgcmV0dXJuIDAgPCBsZWZ0Qm9yZGVyICYmIHJpZ2h0Qm9yZGVyIDwgY29ubmVjdGVkRml0LnZpZXdQb3J0UmVjdC53aWR0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgZWxlbWVudCBjYW4gYmUgZmxpcHBlZCB3aXRob3V0IGdldCBvZmYgdGhlIHZpZXdwb3J0XG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29ubmVjdGVkRml0IGNvbm5lY3RlZEZpdCBvYmplY3QgY29udGFpbmluZyBhbGwgbmVjZXNzYXJ5IHBhcmFtZXRlcnNcbiAgICAgKiBAcmV0dXJucyB0cnVlIGlmIGVsZW1lbnQgY2FuIGJlIGZsaXBwZWQgYW5kIHN0YWluIGluIHZpZXdwb3J0XG4gICAgICovXG4gICAgcHJpdmF0ZSBjYW5GbGlwVmVydGljYWwoY29ubmVjdGVkRml0OiBDb25uZWN0ZWRGaXQpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QgZmxpcHBlZFN0YXJ0UG9pbnQgPSAoLTEpICogKHRoaXMuc2V0dGluZ3MudmVydGljYWxTdGFydFBvaW50ICsgMSk7XG4gICAgICAgIGNvbnN0IGZsaXBwZWREaXJlY3Rpb24gPSAoLTEpICogKHRoaXMuc2V0dGluZ3MudmVydGljYWxEaXJlY3Rpb24gKyAxKTtcblxuICAgICAgICBjb25zdCB0b3BCb3JkZXIgPSB0aGlzLmNhbGN1bGF0ZVRvcChcbiAgICAgICAgICAgIGNvbm5lY3RlZEZpdC50YXJnZXRSZWN0LCBjb25uZWN0ZWRGaXQuY29udGVudEVsZW1lbnRSZWN0LCBmbGlwcGVkU3RhcnRQb2ludCwgZmxpcHBlZERpcmVjdGlvbiwgMCk7XG4gICAgICAgIGNvbnN0IGJvdHRvbUJvcmRlciA9IHRvcEJvcmRlciArIGNvbm5lY3RlZEZpdC5jb250ZW50RWxlbWVudFJlY3QuaGVpZ2h0O1xuICAgICAgICByZXR1cm4gMCA8IHRvcEJvcmRlciAmJiBib3R0b21Cb3JkZXIgPCBjb25uZWN0ZWRGaXQudmlld1BvcnRSZWN0LmhlaWdodDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGbGlwcyBkaXJlY3Rpb24gYW5kIHN0YXJ0IHBvaW50IG9mIHRoZSBwb3NpdGlvbiBzZXR0aW5nc1xuICAgICAqL1xuICAgIHByaXZhdGUgZmxpcEhvcml6b250YWwoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5zZXR0aW5ncy5ob3Jpem9udGFsRGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIEhvcml6b250YWxBbGlnbm1lbnQuTGVmdDpcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLmhvcml6b250YWxEaXJlY3Rpb24gPSBIb3Jpem9udGFsQWxpZ25tZW50LlJpZ2h0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBIb3Jpem9udGFsQWxpZ25tZW50LlJpZ2h0OlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuaG9yaXpvbnRhbERpcmVjdGlvbiA9IEhvcml6b250YWxBbGlnbm1lbnQuTGVmdDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKHRoaXMuc2V0dGluZ3MuaG9yaXpvbnRhbFN0YXJ0UG9pbnQpIHtcbiAgICAgICAgICAgIGNhc2UgSG9yaXpvbnRhbEFsaWdubWVudC5MZWZ0OlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuaG9yaXpvbnRhbFN0YXJ0UG9pbnQgPSBIb3Jpem9udGFsQWxpZ25tZW50LlJpZ2h0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBIb3Jpem9udGFsQWxpZ25tZW50LlJpZ2h0OlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuaG9yaXpvbnRhbFN0YXJ0UG9pbnQgPSBIb3Jpem9udGFsQWxpZ25tZW50LkxlZnQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGbGlwcyBkaXJlY3Rpb24gYW5kIHN0YXJ0IHBvaW50IG9mIHRoZSBwb3NpdGlvbiBzZXR0aW5nc1xuICAgICAqL1xuICAgIHByaXZhdGUgZmxpcFZlcnRpY2FsKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuc2V0dGluZ3MudmVydGljYWxEaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgVmVydGljYWxBbGlnbm1lbnQuVG9wOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudmVydGljYWxEaXJlY3Rpb24gPSBWZXJ0aWNhbEFsaWdubWVudC5Cb3R0b207XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFZlcnRpY2FsQWxpZ25tZW50LkJvdHRvbTpcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRpbmdzLnZlcnRpY2FsRGlyZWN0aW9uID0gVmVydGljYWxBbGlnbm1lbnQuVG9wO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAodGhpcy5zZXR0aW5ncy52ZXJ0aWNhbFN0YXJ0UG9pbnQpIHtcbiAgICAgICAgICAgIGNhc2UgVmVydGljYWxBbGlnbm1lbnQuVG9wOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MudmVydGljYWxTdGFydFBvaW50ID0gVmVydGljYWxBbGlnbm1lbnQuQm90dG9tO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBWZXJ0aWNhbEFsaWdubWVudC5Cb3R0b206XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0aW5ncy52ZXJ0aWNhbFN0YXJ0UG9pbnQgPSBWZXJ0aWNhbEFsaWdubWVudC5Ub3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIG5lY2Vzc2FyeSBob3Jpem9udGFsIHB1c2ggYWNjb3JkaW5nIHRvIHByb3ZpZGVkIGNvbm5lY3RlZEZpdFxuICAgICAqXG4gICAgICogQHBhcmFtIGNvbm5lY3RlZEZpdCBjb25uZWN0ZWRGaXQgb2JqZWN0IGNvbnRhaW5pbmcgYWxsIG5lY2Vzc2FyeSBwYXJhbWV0ZXJzXG4gICAgICogQHJldHVybnMgYW1vdW50IG9mIG5lY2Vzc2FyeSB0cmFuc2xhdGlvbiB3aGljaCB3aWxsIHB1c2ggdGhlIGVsZW1lbnQgaW50byB2aWV3cG9ydFxuICAgICAqL1xuICAgIHByaXZhdGUgaG9yaXpvbnRhbFB1c2goY29ubmVjdGVkRml0OiBDb25uZWN0ZWRGaXQpOiBudW1iZXIge1xuICAgICAgICBjb25zdCBsZWZ0RXh0ZW5kID0gY29ubmVjdGVkRml0LmxlZnQ7XG4gICAgICAgIGNvbnN0IHJpZ2h0RXh0ZW5kID0gY29ubmVjdGVkRml0LnJpZ2h0IC0gY29ubmVjdGVkRml0LnZpZXdQb3J0UmVjdC53aWR0aDtcbiAgICAgICAgLy8gIGlmIGxlZnRFeHRlbmQgPCAwIG92ZXJsYXkgZ29lcyBiZXlvbmQgbGVmdCBlbmQgb2YgdGhlIHNjcmVlbi4gV2Ugc2hvdWxkIHB1c2ggaXQgYmFjayB3aXRoIGV4YWN0bHlcbiAgICAgICAgLy8gIGFzIG11Y2ggYXMgaXQgaXMgYmV5b25kIHRoZSBzY3JlZW4uXG4gICAgICAgIC8vICBpZiByaWdodEV4dGVuZCA+IDAgb3ZlcmxheSBnb2VzIGJleW9uZCByaWdodCBlbmQgb2YgdGhlIHNjcmVlbi4gV2Ugc2hvdWxkIHB1c2ggaXQgYmFjayB3aXRoIHRoZVxuICAgICAgICAvLyAgZXh0ZW5kIGJ1dCB3aXRoIGFtb3VudCBub3QgYmlnZ2VyIHRoYW4gd2hhdCBsZWZ0IGJldHdlZW4gbGVmdCBib3JkZXIgb2Ygc2NyZWVuIGFuZCBsZWZ0IGJvcmRlciBvZlxuICAgICAgICAvLyAgb3ZlcmxheSwgZS5nLiBsZWZ0RXh0ZW5kXG4gICAgICAgIGlmIChsZWZ0RXh0ZW5kIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguYWJzKGxlZnRFeHRlbmQpO1xuICAgICAgICB9IGVsc2UgaWYgKHJpZ2h0RXh0ZW5kID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIC0gTWF0aC5taW4ocmlnaHRFeHRlbmQsIGxlZnRFeHRlbmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxjdWxhdGVzIG5lY2Vzc2FyeSB2ZXJ0aWNhbCBwdXNoIGFjY29yZGluZyB0byBwcm92aWRlZCBjb25uZWN0ZWRGaXRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb25uZWN0ZWRGaXQgY29ubmVjdGVkRml0IG9iamVjdCBjb250YWluaW5nIGFsbCBuZWNlc3NhcnkgcGFyYW1ldGVyc1xuICAgICAqIEByZXR1cm5zIGFtb3VudCBvZiBuZWNlc3NhcnkgdHJhbnNsYXRpb24gd2hpY2ggd2lsbCBwdXNoIHRoZSBlbGVtZW50IGludG8gdmlld3BvcnRcbiAgICAgKi9cbiAgICBwcml2YXRlIHZlcnRpY2FsUHVzaChjb25uZWN0ZWRGaXQ6IENvbm5lY3RlZEZpdCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IHRvcEV4dGVuZCA9IGNvbm5lY3RlZEZpdC50b3A7XG4gICAgICAgIGNvbnN0IGJvdHRvbUV4dGVuZCA9IGNvbm5lY3RlZEZpdC5ib3R0b20gLSBjb25uZWN0ZWRGaXQudmlld1BvcnRSZWN0LmhlaWdodDtcbiAgICAgICAgaWYgKHRvcEV4dGVuZCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmFicyh0b3BFeHRlbmQpO1xuICAgICAgICB9IGVsc2UgaWYgKGJvdHRvbUV4dGVuZCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiAtIE1hdGgubWluKGJvdHRvbUV4dGVuZCwgdG9wRXh0ZW5kKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hhbmdlcyBvcGVuIGFuZCBjbG9zZSBhbmltYXRpb24gd2l0aCByZXZlcnNlIGFuaW1hdGlvbiBpZiBvbmUgZXhpc3RzXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZmxpcERpcmVjdGlvbiBkaXJlY3Rpb24gZm9yIHdoaWNoIHRvIGNoYW5nZSB0aGUgYW5pbWF0aW9uc1xuICAgICAqL1xuICAgIHByaXZhdGUgZmxpcEFuaW1hdGlvbihmbGlwRGlyZWN0aW9uOiBGbGlwRGlyZWN0aW9uKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLm9wZW5BbmltYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3Mub3BlbkFuaW1hdGlvbiA9IHRoaXMudXBkYXRlQW5pbWF0aW9uKHRoaXMuc2V0dGluZ3Mub3BlbkFuaW1hdGlvbiwgZmxpcERpcmVjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MuY2xvc2VBbmltYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuY2xvc2VBbmltYXRpb24gPSB0aGlzLnVwZGF0ZUFuaW1hdGlvbih0aGlzLnNldHRpbmdzLmNsb3NlQW5pbWF0aW9uLCBmbGlwRGlyZWN0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWVzIHRvIGZpbmQgdGhlIHJldmVyc2UgYW5pbWF0aW9uIGFjY29yZGluZyB0byBwcm92aWRlZCBkaXJlY3Rpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSBhbmltYXRpb24gYW5pbWF0aW9uIHRvIHVwZGF0ZVxuICAgICAqIEBwYXJhbSBkaXJlY3Rpb24gcmVxdWlyZWQgYW5pbWF0aW9uIGRpcmVjdGlvblxuICAgICAqIEByZXR1cm5zIHJldmVyc2UgYW5pbWF0aW9uIGluIGdpdmVuIGRpcmVjdGlvbiBpZiBvbmUgZXhpc3RzXG4gICAgICovXG4gICAgcHJpdmF0ZSB1cGRhdGVBbmltYXRpb24oYW5pbWF0aW9uOiBBbmltYXRpb25SZWZlcmVuY2VNZXRhZGF0YSwgZGlyZWN0aW9uOiBGbGlwRGlyZWN0aW9uKTogQW5pbWF0aW9uUmVmZXJlbmNlTWV0YWRhdGEge1xuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBGbGlwRGlyZWN0aW9uLkhvcml6b250YWw6XG4gICAgICAgICAgICAgICAgaWYgKGlzSG9yaXpvbnRhbEFuaW1hdGlvbihhbmltYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXZlcnNlQW5pbWF0aW9uUmVzb2x2ZXIoYW5pbWF0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIEZsaXBEaXJlY3Rpb24uVmVydGljYWw6XG4gICAgICAgICAgICAgICAgaWYgKGlzVmVydGljYWxBbmltYXRpb24oYW5pbWF0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV2ZXJzZUFuaW1hdGlvblJlc29sdmVyKGFuaW1hdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFuaW1hdGlvbjtcbiAgICB9XG59XG5cbmVudW0gRmxpcERpcmVjdGlvbiB7XG4gICAgSG9yaXpvbnRhbCxcbiAgICBWZXJ0aWNhbFxufVxuIl19