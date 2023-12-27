import { Stack, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { object, string, ref } from "yup";
import FormControlComponent from "./FormControl";

function RegisterForm({ onSubmit }) {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            username: '',
            confirmPassword: ''
        },
        validationSchema: object().shape({
            email: string().email("Email is not valid").required("Email is required"),
            username: string().required("Username is required"),
            password: string().required("Password is required"),
            confirmPassword: string()
                .oneOf([ref('password')], 'Passwords must match')
                .required('Confirm Password is required')
        }),
        onSubmit
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing="4">
                <FormControlComponent
                    formLabel="Email"
                    isInvalid={Boolean(formik.touched.email && formik.errors.email)}
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.email}
                />
                <FormControlComponent
                    formLabel="Username"
                    isInvalid={Boolean(formik.touched.username && formik.errors.username)}
                    type="text"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.username}
                />
                <FormControlComponent
                    formLabel="Password"
                    isInvalid={Boolean(formik.touched.password && formik.errors.password)}
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.password}
                />
                <FormControlComponent
                    formLabel="Confirm Password"
                    isInvalid={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                    type="password"
                    name="confirmPassword"
                    autoComplete="new-password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.confirmPassword}
                />
                <Button disabled={formik.isSubmitting} type="submit" colorScheme="blue" variant="solid" width="full">
                    Sign Up
                </Button>
            </Stack>
        </form>
    )
}

export default RegisterForm