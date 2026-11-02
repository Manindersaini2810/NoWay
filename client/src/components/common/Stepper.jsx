const Stepper = ({ steps = [], currentStep = 0, onStepClick }) => {
  return (
    <nav aria-label="Progress" className="w-full py-4">
      <ol className="flex items-center justify-between gap-2 sm:gap-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep

          return (
            <li key={step.title || index} className="flex-1">
              <div
                className={`group flex items-center gap-3 transition-colors ${
                  onStepClick && isCompleted ? 'cursor-pointer' : ''
                }`}
                onClick={() => onStepClick && isCompleted && onStepClick(index)}
              >
                <div
                  className={`flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                      : isCurrent
                      ? 'border-2 border-teal-600 bg-white text-teal-700 shadow-sm'
                      : 'border border-gray-200 bg-gray-50 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                <div className="hidden sm:block">
                  <p
                    className={`text-xs font-medium uppercase tracking-wider ${
                      isCurrent ? 'text-teal-600 font-semibold' : 'text-gray-400'
                    }`}
                  >
                    Step {index + 1}
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      isCurrent ? 'text-gray-900 font-bold' : isCompleted ? 'text-gray-700' : 'text-gray-400'
                    }`}
                  >
                    {step.title || step}
                  </p>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default Stepper

