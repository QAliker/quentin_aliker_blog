import clsx from "clsx"

const variants = {
    primary: "bg-blue-600 active:bg-blue-700 text-white",
}
const sizes = {
    md: "px-3 py-2 text-xl font-semibold",
}
const Button = ({
    variant = "primary",
    size = "md",
    className,
    ...otherProps
}) => (
    <button
    className={clsx(variants[variant], sizes[size], className)}
    {...otherProps}
    />
    )
    
    export default Button