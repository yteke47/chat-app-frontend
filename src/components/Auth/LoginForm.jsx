import { Stack, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import { object, string } from "yup";
import FormControlComponent from "./FormControl";

function LoginForm({ onSubmit }) {
    const formik = useFormik({
        initialValues: {
            credential: '',
            password: ''
        },
        validationSchema: object({
            credential: string().required("Username or email is required"),
            password: string().required("Password is required")
        }),
        onSubmit
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing="4">
                <FormControlComponent
                    formLabel="Username or email"
                    isInvalid={Boolean(formik.touched.credential && formik.errors.credential)}
                    type="text"
                    name="credential"
                    value={formik.values.credential}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.credential}
                />
                <FormControlComponent
                    formLabel="Password"
                    isInvalid={Boolean(formik.touched.password && formik.errors.password)}
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.password}
                />
                <Button disabled={formik.isSubmitting} type="submit" colorScheme="blue" variant="solid" width="full">
                    Sign In
                </Button>
            </Stack>
        </form>
    )
}

export default LoginForm