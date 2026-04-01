export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    const defaultClasses = `px-5 py-2.5  rounded-lg bg-gray-100 text-primary-color-dark  border border-gray-200 hover:bg-gray-200 transition-all duration-500`;

    return (
        <button
            {...props}
            className={
                `${disabled ? 'opacity-25 cursor-not-allowed' : ''} ` +
                (className.trim() !== '' ? className : defaultClasses)
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
