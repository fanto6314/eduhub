import yup from "./validationMessageLocales";

export default yup.object({
    username: yup.string().required(), email: yup.string().email().required(), password: yup.string().min(5).required(),
});
