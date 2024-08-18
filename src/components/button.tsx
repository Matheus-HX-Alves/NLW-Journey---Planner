import { ComponentProps, ReactNode } from "react"
import { tv, VariantProps } from 'tailwind-variants'

const buttonVaritants = tv({
  base: 'flex items-center justify-center gap-2 text-md px-4 rounded-md ',

  variants: {
    variants: {
      'primary': 'bg-lime-400 text-lime-950 hover:bg-lime-300',
      'secondary': 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700 ',
    },

    size: {
      'default': 'py-2',
      'full': 'w-full h-11'
    }
  },


  defaultVariants: { variants: 'primary', size: 'default' }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVaritants> {
  children: ReactNode
}

export default function Button({ children, variants, size, ...props }: ButtonProps) {
  return (
    <button {...props} className={buttonVaritants({ variants, size })}>
      {children}
    </button>
  )
}