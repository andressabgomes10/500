
import React, { memo } from 'react';
import { AppLayout } from './layouts/AppLayout';
import { ContentRenderer } from './layouts/ContentRenderer';
import { useNavigation } from '@/hooks/useNavigation';

const CRMLayout = memo(() => {
  const { activeSection, setActiveSection } = useNavigation();

  return (
    <AppLayout 
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      <ContentRenderer activeSection={activeSection} />
    </AppLayout>
  );
});

export default CRMLayout;
