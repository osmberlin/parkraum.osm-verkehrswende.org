type Props = {
  className?: string
  children: React.ReactNode
}

export const Section: React.FC<Props> = ({ className, children }) => {
  return (
    <section className={className}>
      <div className="m-auto max-w-[90%] lg:max-w-[964px]">{children}</div>
    </section>
  )
}
