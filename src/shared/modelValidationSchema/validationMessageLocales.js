import * as yup from 'yup';

yup.setLocale({
    mixed: {
        required: "È un campo obbligatorio", min: "Il valore deve essere minimo di ${val}"
    }, string: {
        email: "Deve essere una email", min: "Deve essere più lungo di ${min} caratteri"
    }
});

export default yup;
