import { AbstractControl, ValidationErrors } from '@angular/forms';

export function requiredArray(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!Array.isArray(value) || value.length === 0) {
        return { required: true };
    }

    return null;
}