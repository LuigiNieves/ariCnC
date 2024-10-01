import { Validators } from "@angular/forms";


export const loginValidators = [
  Validators.required,
  Validators.minLength(8),
  Validators.maxLength(12)
]