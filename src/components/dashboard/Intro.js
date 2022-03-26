import { useState } from 'react'
import 'intro.js/introjs.css';
import { Steps } from 'intro.js-react';

const Intro = () => {
  const [enabled, setEnabled] = useState(true);
  const [initialStep, setInitialStep] = useState(0);
  const onExit = () => {
    setEnabled(false)
  }
  const steps = [
    {
      element: '#sidebar',
      intro: 'Hey there! Quick Tour? This is your user profile!',
    },
    {
      element: '#editprofile',
      intro: ' Here you can edit your profile.',
    },
    {
      element: '#analytics',
      intro: ' Here you can find your analytics stats.',
    },
    {
      element: '#addbuttons',
      intro: ' Add your recommend products and custom links.',
    },
  ];

  return (
    <div>
    <Steps
        enabled={enabled}
        steps={steps}
        initialStep={initialStep}
        onExit={onExit}
    />
    </div>
  )
}

export default Intro