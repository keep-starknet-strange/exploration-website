import { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { BeakerIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

export function MissionCard({ app }) {
  const [open, setOpen] = useState(false)

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  return (
    <section>
      <div className="group relative overflow-hidden rounded-lg bg-white shadow-lg">
        <img
          className="h-48 w-full object-cover"
          src={app.imageUrl}
          alt={app.title}
        />
        <div className="p-6">
          <h2 className="text-xl font-semibold">{app.title}</h2>
          <button
            className="mt-4 rounded bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4 py-2 text-white hover:from-purple-600 hover:via-pink-600 hover:to-red-600"
            onClick={openModal}
          >
            View More
          </button>
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="p-4">{app.description}</p>
        </div>
      </div>

      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <Transition
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              <span
                className="hidden sm:inline-block sm:h-screen sm:align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={closeModal}
                  >
                    <span className="sr-only">Close</span>
                    <BeakerIcon className="size-6 text-blue-500" />
                  </button>
                </div>
                {app && (
                  <div>
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 sm:mx-0 sm:h-10 sm:w-10">
                        <Image
                          className="rounded-full"
                          width={300}
                          height={200}
                          src={app.imageUrl}
                          alt={app.title}
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          {app.title}
                        </Dialog>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {app.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Transition>
          </div>
        </Dialog>
      </Transition>
    </section>
  )
}
