import { useState } from 'react';
import Step1 from '../src/components/onboard/Step1';
import Step2 from '../src/components/onboard/Step2';
import Step3 from '../src/components/onboard/Step3';
import Step4 from '../src/components/onboard/Step4';

export default function Onboard(props) {

	const [step, setStep] = useState(1);

	const nextStep = () => setStep(step + 1);

	const prevStep = () => setStep(step - 1);
	
	const switchStep = () => {
		switch (step) {
			case 1:
				return <Step1 nextStep={nextStep} />
			case 2:
				return <Step2 prevStep={prevStep} nextStep={nextStep} />
			case 3:
				return <Step3 prevStep={prevStep} nextStep={nextStep} />;
			case 4:
				return <Step4 prevStep={prevStep} />;
			default:
				return null;
		}
	};

	return <>{switchStep()}</>;
}

