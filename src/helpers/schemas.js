import * as Yup from 'yup'

export const SIGNIN = Yup.object().shape({
  email: Yup.string().email().required().label('E-mail'),
  password: Yup.string().min(8).required().label('Password')
});

export const SIGNUP = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().email().required().label('E-mail'),
  password: Yup.string().min(8).required().label('Password'),
  password_confirm: Yup.string()
    .required()
    .oneOf([Yup.ref('password')], 'The passwords not match')
    .label('Password confirmation')
});

export const NOTE_UPDATE_CREATE = Yup.object().shape({
  title: Yup.string().required().label('Title'),
  description: Yup.string().required().label('Description'),
});