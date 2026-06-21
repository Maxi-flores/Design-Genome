function toDataValue(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function SentientProvider({ themeDeclaration, children }) {
  return (
    <div
      data-project={toDataValue(themeDeclaration.project)}
      data-design-personality={toDataValue(themeDeclaration.design_personality)}
      data-theme-mode={themeDeclaration.theme_mode}
      data-density-mode={themeDeclaration.density_mode}
      data-motion-mode={themeDeclaration.motion_mode}
      data-chapter-accent={toDataValue(themeDeclaration.chapter_accent)}
      data-architectural-family={toDataValue(themeDeclaration.architectural_family)}
      data-spatial-identity={themeDeclaration.spatial_identity}
      data-application-mode={themeDeclaration.application_mode}
    >
      {children}
    </div>
  );
}
