import Image from 'next/image'
import clsx from 'clsx'

export function BackgroundImage({ className, position = 'left' }) {
  return (
    <div
      className={clsx(
        'absolute inset-0 overflow-hidden bg-slate-900',
        className,
      )}
    >
      <Image
        className={clsx('absolute top-10')}
        src="/images/darkSw.png"
        alt="bckgrnd"
        width={750}
        height={1495}
        priority
        unoptimized
      />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-900" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-900" />
    </div>
  )
}
