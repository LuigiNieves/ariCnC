import { Validators } from "@angular/forms";


export const singUpValidators = [
  Validators.required,
  Validators.minLength(8),
  Validators.maxLength(12),
  Validators.pattern("^[A-Za-z][A-Za-z0-9_]{7,14}$")
]

