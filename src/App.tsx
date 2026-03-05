import { useState } from 'react'; // Añadido useState
import { RegistrationPage } from './app/pages/RegistrationPage';
import { ConfiguratorPage } from './app/pages/ConfiguratorPage';
import { RegistrationData } from './app/types/registration';

type AppView = 'registration' | 'configurator';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('registration');
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);

  const handleRegistrationComplete = (data: RegistrationData) => {
    setRegistrationData(data);
    setCurrentView('configurator');
  };

  const handleReset = () => {
    setRegistrationData(null);
    setCurrentView('registration');
  };

  return (
    <>
      {currentView === 'registration' && (
        <RegistrationPage onComplete={handleRegistrationComplete} />
      )}
      {currentView === 'configurator' && registrationData && (
        <ConfiguratorPage 
          registrationData={registrationData} 
          onReset={handleReset}
        />
      )}
    </>
  );
}