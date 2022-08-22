/** Header orientation in `dialog` mode. */
export declare const PickerHeaderOrientation: {
    Horizontal: "horizontal";
    Vertical: "vertical";
};
export declare type PickerHeaderOrientation = (typeof PickerHeaderOrientation)[keyof typeof PickerHeaderOrientation];
/**
 * This enumeration is used to configure whether the date/time picker has an editable input with drop down
 * or is readonly - the date/time is selected only through a dialog.
 */
export declare const PickerInteractionMode: {
    DropDown: "dropdown";
    Dialog: "dialog";
};
export declare type PickerInteractionMode = (typeof PickerInteractionMode)[keyof typeof PickerInteractionMode];
