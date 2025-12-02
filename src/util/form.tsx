import { Input, type InputProps } from "@heroui/react";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

const extractErrorMessages = (errors: unknown): string | undefined => {
	if (errors === null || errors === undefined) {
		return "";
	}

	if (Array.isArray(errors)) {
		return errors.map(extractErrorMessages).join(", ");
	}
	if (typeof errors === "string") {
		return errors;
	}

	if (
		typeof errors === "object" &&
		"message" in errors &&
		typeof errors.message === "string"
	) {
		return errors.message;
	}
};

const { fieldContext, useFieldContext, formContext } = createFormHookContexts();

const InputField: React.FC<InputProps> = (props) => {
	const field = useFieldContext<string>();

	return (
		<Input
			variant="flat"
			{...props}
			errorMessage={
				field.state.meta.isTouched &&
				!field.state.meta.isValid &&
				extractErrorMessages(field.state.meta.errors)
			}
			isInvalid={field.state.meta.isTouched && !field.state.meta.isValid}
			name={field.name}
			onBlur={field.handleBlur}
			onChange={(e) => field.handleChange(e.target.value)}
			value={field.state.value?.toString() ?? ""}
		/>
	);
};

const { useAppForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		InputField,
	},
	formComponents: {},
});

export { useAppForm };
