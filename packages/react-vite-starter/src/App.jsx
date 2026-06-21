import { useState } from 'react';
import { SentientProvider } from './SentientProvider.jsx';
import { themeDeclaration } from './theme/themeDeclaration.js';
import { PFNavigation } from './components/PFNavigation.jsx';
import { PFCommandBar } from './components/PFCommandBar.jsx';
import { PFWorkspaceGrid } from './components/PFWorkspaceGrid.jsx';
import { PFCard } from './components/PFCard.jsx';
import { PFPanel } from './components/PFPanel.jsx';
import { PFSection } from './components/PFSection.jsx';
import { PFMetricCard } from './components/PFMetricCard.jsx';
import { PFButton } from './components/PFButton.jsx';
import { PFStatusBadge } from './components/PFStatusBadge.jsx';
import { PFDataTable } from './components/PFDataTable.jsx';
import { PFEmptyState } from './components/PFEmptyState.jsx';
import { PFTimeline } from './components/PFTimeline.jsx';
import { PFTabs } from './components/PFTabs.jsx';
import { PFInput } from './components/PFInput.jsx';
import { PFSelect } from './components/PFSelect.jsx';
import { PFModal } from './components/PFModal.jsx';
import { PFDrawer } from './components/PFDrawer.jsx';

export function App() {
  const [activeTab, setActiveTab] = useState('foundation');
  const [inputValue, setInputValue] = useState('Foundation Loaded');
  const [selectValue, setSelectValue] = useState('contracts');
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const tabs = [
    { id: 'foundation', label: 'Foundation', content: 'Generated Foundation CSS and tokens are connected.' },
    { id: 'primitives', label: 'Primitives', content: 'Neutral primitive classes are active in the React wrappers.' },
    { id: 'contracts', label: 'Contracts', content: 'Wrapper structure follows approved component contracts.' }
  ];

  return (
    <SentientProvider themeDeclaration={themeDeclaration}>
      <div style={{ padding: 'var(--space-6)', display: 'grid', gap: 'var(--space-6)' }}>
        <PFSection
          title="React/Vite Integration Starter"
          description="This is a neutral framework integration preview, not an application screen or project dashboard."
          footer={<PFStatusBadge status="active">Theme Declaration Applied</PFStatusBadge>}
        >
          <PFNavigation
            label="Starter Navigation"
            items={[
              { label: 'Foundation', href: '#foundation', active: true },
              { label: 'Primitives', href: '#primitives', active: false },
              { label: 'Contracts', href: '#contracts', active: false }
            ]}
          />

          <PFCommandBar
            primaryActions={
              <>
                <PFButton variant="primary" onClick={() => setModalOpen(true)}>Open Modal</PFButton>
                <PFButton onClick={() => setDrawerOpen(true)}>Open Drawer</PFButton>
              </>
            }
            secondaryActions={<PFButton variant="ghost">Neutral Action</PFButton>}
            filters={
              <PFSelect
                id="starter-filter"
                label="Mode"
                value={selectValue}
                onChange={(event) => setSelectValue(event.target.value)}
                options={[
                  { value: 'foundation', label: 'Foundation' },
                  { value: 'primitives', label: 'Primitives' },
                  { value: 'contracts', label: 'Contracts' }
                ]}
              />
            }
            search={
              <PFInput
                id="starter-search"
                label="Signal"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                placeholder="Search neutral placeholders"
              />
            }
            status={<PFStatusBadge status="running">Primitive Classes Active</PFStatusBadge>}
          />

          <PFWorkspaceGrid density="standard">
            <PFCard
              title="Foundation Loaded"
              description="The starter consumes generated Foundation CSS and Primitive CSS from the root dist layer."
              footer={<PFButton variant="ghost">Inspect Contract</PFButton>}
              variant="interactive"
            >
              Neutral wrappers add structure but not project identity.
            </PFCard>

            <PFPanel
              title="Component Contracts Connected"
              actions={<PFStatusBadge status="completed">Approved</PFStatusBadge>}
              variant="context"
            >
              React wrappers consume existing primitive classes and remain aligned with approved contracts.
            </PFPanel>

            <PFMetricCard
              label="Integration State"
              value="Ready"
              delta="No project styling applied"
              status="completed"
              description="Neutral component wrappers are connected."
            />

            <PFDataTable
              caption="Starter Signals"
              columns={[
                { key: 'signal', label: 'Signal' },
                { key: 'state', label: 'State' },
                { key: 'note', label: 'Note' }
              ]}
              rows={[
                { signal: 'Foundation', state: 'Loaded', note: 'CSS imported from root dist.' },
                { signal: 'Primitives', state: 'Active', note: 'Primitive classes used by wrappers.' },
                { signal: 'Contracts', state: 'Connected', note: 'Approved component structure preserved.' }
              ]}
            />

            <PFTabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} />

            <PFTimeline
              items={[
                { title: 'Foundation tokens', time: 'v0.3', status: 'completed', description: 'Base CSS variables generated.' },
                { title: 'Component contracts', time: 'v0.4', status: 'completed', description: 'Machine-readable governance layer active.' },
                { title: 'React wrappers', time: 'v0.6', status: 'running', description: 'Framework integration proof in progress.' }
              ]}
            />

            <PFEmptyState
              title="No project styling present"
              description="This starter intentionally avoids project-specific UI, personality themes, and architectural family styling."
              action={<PFButton variant="primary">Review Neutral Layer</PFButton>}
            />
          </PFWorkspaceGrid>

          <PFModal
            open={modalOpen}
            title="Neutral Modal Wrapper"
            onClose={() => setModalOpen(false)}
            actions={
              <>
                <PFButton variant="ghost" onClick={() => setModalOpen(false)}>Close</PFButton>
                <PFButton variant="primary" onClick={() => setModalOpen(false)}>Confirm</PFButton>
              </>
            }
          >
            Production-grade focus trapping is intentionally deferred to a later implementation phase.
          </PFModal>

          <PFDrawer
            open={drawerOpen}
            title="Neutral Drawer Wrapper"
            onClose={() => setDrawerOpen(false)}
            actions={<PFButton onClick={() => setDrawerOpen(false)}>Done</PFButton>}
          >
            This drawer demonstrates framework integration without adding project-specific design language.
          </PFDrawer>
        </PFSection>
      </div>
    </SentientProvider>
  );
}
