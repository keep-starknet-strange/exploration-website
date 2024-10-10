import { RegisterSwEmployee } from './kudos/RegisterSwEmployee'
import { LinkWallet } from '@/components/checklist/LinkWallet'
import { Container } from '@/components/Container'
import { CheckIcon } from '@heroicons/react/20/solid'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useAccount } from '@starknet-react/core'
import { useState } from 'react'
import { useEffect } from 'react'

// status: 'complete' | 'current' | 'upcoming'
const steps = [
  {
    name: 'Link Wallet',
    description: 'To SSO account',
    comp: LinkWallet,
    status: 'current',
  },
  {
    name: 'Register',
    description: 'Mint ERC20 Token',
    comp: RegisterSwEmployee,
    status: 'upcoming',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function KudosApp({ userData }) {
  const { address, status } = useAccount()
  const [activeStep, setActiveStep] = useState(
    steps.findIndex((x) => x.status === 'current'),
  )
  const [stepsState, setStepsState] = useState(steps)

  useEffect(() => {
    if (status === 'connected') {
      markStepComplete()
    }
  }, [status])

  function markStepComplete() {
    setStepsState((prevSteps) => {
      const newSteps = [...prevSteps]
      if (activeStep < newSteps.length) {
        newSteps[activeStep].status = 'complete'
      }
      if (activeStep + 1 < newSteps.length) {
        newSteps[activeStep + 1].status = 'current'
      }
      return newSteps
    })

    moveForward()
  }

  function moveBackward() {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1)
    }
  }

  function moveForward() {
    if (activeStep !== steps.length - 1) {
      setActiveStep(activeStep + 1)
    }
  }

  return (
    <Container className="relative mt-10 sm:mt-24">
      <div className="inline-flex px-10">
        <img
          className="inline-block h-24 w-24 rounded-full"
          src={userData.image}
          alt="usrProf"
        />
        <div className="ml-14 text-4xl font-bold tracking-tighter text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text">
          {userData.name}
          {status === 'connected' && (
            <span className="text-2xl font-extralight tracking-tighter">
              &nbsp;&nbsp;({address.slice(0, 10)})
            </span>
          )}
          <div className="text-xl font-extralight tracking-tighter text-slate-700">
            {userData.email}
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <nav aria-label="Progress" className="mt-14 mx-6">
          <ol role="list" className="overflow-hidden">
            {steps.map((step, stepIdx) => (
              <li
                key={step.name}
                className={classNames(
                  stepIdx !== steps.length - 1 ? 'pb-10' : '',
                  'relative',
                )}
              >
                {step.status === 'complete' ? (
                  <>
                    {stepIdx !== steps.length - 1 ? (
                      <div
                        className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-emerald-600"
                        aria-hidden="true"
                      />
                    ) : null}
                    <a className="group relative flex items-start">
                      <span className="flex h-9 items-center">
                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 group-hover:bg-emerald-800">
                          <CheckIcon
                            className="h-5 w-5 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                      <span className="ml-4 flex min-w-0 flex-col">
                        <span className="text-md font-medium text-emerald-700">
                          {step.name}
                        </span>
                        <span className="text-sm font-extralight text-emerald-800">
                          {step.description}
                        </span>
                      </span>
                    </a>
                  </>
                ) : step.status === 'current' ? (
                  <>
                    {stepIdx !== steps.length - 1 ? (
                      <div
                        className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                        aria-hidden="true"
                      />
                    ) : null}
                    <a
                      className="group relative flex items-start"
                      aria-current="step"
                    >
                      <span
                        className="flex h-9 items-center"
                        aria-hidden="true"
                      >
                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                        </span>
                      </span>
                      <span className="ml-4 flex min-w-0 flex-col ">
                        <span className="text-md font-medium text-emerald-400">
                          {step.name}
                        </span>
                        <span className="text-sm font-medium text-gray-500">
                          {step.description}
                        </span>
                      </span>
                    </a>
                  </>
                ) : (
                  <>
                    {stepIdx !== steps.length - 1 ? (
                      <div
                        className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                        aria-hidden="true"
                      />
                    ) : null}
                    <a className="group relative flex items-start">
                      <span
                        className="flex h-9 items-center"
                        aria-hidden="true"
                      >
                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                          <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                        </span>
                      </span>
                      <span className="ml-4 flex min-w-0 flex-col">
                        <span className="text-md font-medium text-gray-500">
                          {step.name}
                        </span>
                        <span className="text-sm font-extralight text-gray-600">
                          {step.description}
                        </span>
                      </span>
                    </a>
                  </>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="grow pr-4 my-14">
          {steps.map(
            (step, stepIdx) =>
              stepIdx === activeStep && (
                <Container
                  key={stepIdx}
                  className="relative text-center mx-auto max-w-2xl lg:max-w-4xl lg:px-28"
                >
                  <div className="divide-y divide-slate-500 overflow-hidden rounded-lg bg-slate-700 shadow">
                    <div className="px-4 py-5 sm:p-6">
                      {status === 'connected' ? (
                        <step.comp
                          userData={userData}
                          markStepComplete={markStepComplete}
                        />
                      ) : (
                        <LinkWallet userData={userData} />
                      )}
                    </div>
                    <div className="px-4 py-4 sm:px-6 flex flex-row justify-between">
                      <div
                        type="button"
                        onClick={() => moveBackward()}
                        className="rounded-md bg-slate-500 px-2 py-2 shadow-sm hover:bg-slate-800"
                      >
                        <ChevronLeftIcon className="h-5 w-5 mx-auto text-sm font-semibold text-slate-900" />
                      </div>
                      <div
                        type="button"
                        onClick={() => moveForward()}
                        className="rounded-md bg-slate-500 px-2 py-2 shadow-sm hover:bg-slate-800"
                      >
                        <ChevronRightIcon className="h-5 w-5 mx-auto text-sm font-semibold text-slate-900" />
                      </div>
                    </div>
                  </div>
                </Container>
              ),
          )}
        </div>
      </div>
    </Container>
  )
}
