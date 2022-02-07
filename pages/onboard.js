import { Button } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { UserContext } from '../src/lib/UserDataProvider';
import Step1 from '../src/components/onboard/Step1';
import Step2 from '../src/components/onboard/Step2';
import Step3 from '../src/components/onboard/Step3';
import Step4 from '../src/components/onboard/Step4';
import Step5 from '../src/components/onboard/Step5';
import Step6 from '../src/components/onboard/Step6';

export default function Onboard(props) {

	const ctx = useContext(UserContext);
	// console.log('onboard', ctx.userData);

	const [step, setStep] = useState(1);

	// console.log('onboard mail & phone');
	// console.log(ctx.userSignInInfo.user.email);
	// console.log(ctx.userSignInInfo.user.phoneNumber);
	const nextStep = () => setStep(step + 1);

	const prevStep = () => setStep(step - 1);
	
	const switchStep = () => {
		switch (step) {
			case 1:
				return <Step1 nextStep={nextStep} />
			case 2:
				if(ctx.userSignInInfo.user.email===null)
				{
					return <Step2 prevStep={prevStep} nextStep={nextStep} />
				}
				else
				{
					return <Step3 prevStep={prevStep} nextStep={nextStep} />
				}
			case 3:
				return <Step4 prevStep={prevStep} nextStep={nextStep} />;
			case 4:
				return <Step5 prevStep={prevStep} nextStep={nextStep} />;
			case 5:
				return <Step6 prevStep={prevStep}  />;
			default:
				return null;
		}
	};

	return <>{switchStep()}</>;
}

