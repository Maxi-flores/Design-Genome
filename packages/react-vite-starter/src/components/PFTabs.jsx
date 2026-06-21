export function PFTabs({ tabs, activeId, onChange }) {
  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

  return (
    <div className="pf-tabs">
      <div className="pf-tabs__list" role="tablist" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="pf-tabs__trigger"
            data-state={tab.id === activeTab.id ? 'active' : 'default'}
            id={`tab-${tab.id}`}
            role="tab"
            type="button"
            aria-selected={tab.id === activeTab.id}
            aria-controls={`panel-${tab.id}`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        className="pf-tabs__panel"
        id={`panel-${activeTab.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab.id}`}
      >
        {activeTab.content}
      </div>
    </div>
  );
}
