export default function useValidation(data = {}, setError, clearErrors) {

    const validateOnBlur = (field, rules = []) => () => {
        const value = data?.[field];

        for (let rule of rules) {
            const error = rule(value, data);

            if (error) {
                setError(field, error);
                return;
            }
        }

        // ✅ properly remove error
        clearErrors(field);
    };

    // 🔥 validate full form on submit
    const validateAll = (fields) => {
        let isValid = true;

        Object.keys(fields).forEach((field) => {
            const value = data?.[field];

            for (let rule of fields[field]) {
                const error = rule(value, data);

                if (error) {
                    setError(field, error);
                    isValid = false;
                    break;
                }
            }
        });

        return isValid;
    };

    return {
        validateOnBlur,
        validateAll,
    };
}