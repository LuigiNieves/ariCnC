import { Validators } from "@angular/forms";


export const singUpValidators = [
  Validators.required,
  Validators.minLength(8),
  Validators.maxLength(12)
]

