import { IgxStepper } from './stepper.common';
import { IgxStepComponent } from './step/step.component';
import * as i0 from "@angular/core";
/** @hidden @internal */
export declare class IgxStepperService {
    activeStep: IgxStepComponent;
    previousActiveStep: IgxStepComponent;
    focusedStep: IgxStepComponent;
    collapsingSteps: Set<IgxStepComponent>;
    linearDisabledSteps: Set<IgxStepComponent>;
    visitedSteps: Set<IgxStepComponent>;
    stepper: IgxStepper;
    /**
     * Activates the step, fires the steps change event and plays animations.
     */
    expand(step: IgxStepComponent): void;
    /**
     * Activates the step and fires the steps change event without playing animations.
     */
    expandThroughApi(step: IgxStepComponent): void;
    /**
     * Collapses the currently active step and fires the change event.
     */
    collapse(step: IgxStepComponent): void;
    /**
     * Determines the steps that should be marked as visited based on the active step.
     */
    calculateVisitedSteps(): void;
    /**
     * Determines the steps that should be disabled in linear mode based on the validity of the active step.
     */
    calculateLinearDisabledSteps(): void;
    emitActivatingEvent(step: IgxStepComponent): boolean;
    /**
     * Updates the linearDisabled steps from the current active step to the next required invalid step.
     *
     * @param toIndex the index of the last step that should be enabled.
     */
    private updateLinearDisabledSteps;
    private getNextRequiredStep;
    static ɵfac: i0.ɵɵFactoryDeclaration<IgxStepperService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IgxStepperService>;
}
