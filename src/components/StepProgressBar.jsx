export default function StepProgressBar({ currentStep, totalSteps = 5 }) {
  return (
    <div className="flex gap-1.5" style={{ padding: '0 24px', marginBottom: 24 }}>
      {Array.from({ length: totalSteps }, (_, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum < currentStep;
        const isActive = stepNum === currentStep;

        return (
          <div
            key={i}
            className="flex-1 rounded-full overflow-hidden"
            style={{ height: 4, background: 'rgba(255,255,255,0.06)' }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: isCompleted ? '100%' : isActive ? '50%' : '0%',
                background: isCompleted || isActive
                  ? 'linear-gradient(90deg, #FFD866, #F0B90B)'
                  : 'transparent',
                transition: 'width 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
