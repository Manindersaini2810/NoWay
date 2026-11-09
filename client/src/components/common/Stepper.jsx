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
                  className={`flex h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 items-center justify-center rounded-full text-xs sm:text-sm font-black transition-all duration-300 ${
                    isCompleted
                      ? 'bg-[#1E1E1C] text-[#2F6BFF] border border-[#2F6BFF]/40 shadow-sm'
                      : isCurrent
                      ? 'border-2 border-[#2F6BFF] bg-[#EDE4D4] text-[#2F6BFF] shadow-sm ring-2 ring-[#2F6BFF]/20'
                      : 'border border-[#1E1E1C]/20 bg-[#EDE4D4]/50 text-[#1E1E1C]/40'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="h-4 w-4 text-[#2F6BFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                <div className="hidden sm:block">
                  <p
                    className={`text-[10px] font-black uppercase tracking-wider ${
                      isCurrent ? 'text-[#2F6BFF]' : 'text-[#1E1E1C]/50'
                    }`}
                  >
                    Step {index + 1}
                  </p>
                  <p
                    className={`text-xs font-bold ${
                      isCurrent ? 'text-[#1E1E1C]' : isCompleted ? 'text-[#1E1E1C]/80' : 'text-[#1E1E1C]/40'
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
