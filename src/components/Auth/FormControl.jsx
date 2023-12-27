import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { ChangeEvent, FocusEvent, useState } from 'react';

const FormControlComponent = ({
    isRequired,
    isInvalid,
    formLabel,
    type,
    name,
    autoComplete,
    value,
    onChange,
    onBlur,
    error
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordField = type === "password";
    const inputType = isPasswordField && showPassword ? "text" : type;

    return (
        <FormControl isRequired={isRequired} isInvalid={isInvalid}>
            <FormLabel htmlFor={name}>{formLabel}</FormLabel>
            <InputGroup>
                <Input
                    type={inputType}
                    name={name}
                    id={name}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                />
                {isPasswordField && (
                    <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={() => setShowPassword(prev => !prev)}>
                            {showPassword ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                )}
            </InputGroup>
            <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
    );
};

export default FormControlComponent;