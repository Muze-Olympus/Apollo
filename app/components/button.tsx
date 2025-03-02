import clsx from "clsx";
import { Icon } from "@iconify/react"

const cn = clsx;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  icon?: string
}

export default function Button({ isLoading, icon, children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <Icon icon="mdi:loading" className="mr-2 w-4 h-4 animate-spin" />
      ) : icon ? (
        <Icon icon={icon} className="mr-2 w-6 h-6" />
      ) : null}
      {children}
    </button>
  )
}
