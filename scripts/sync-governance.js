import fs from 'fs';
import path from 'path';

// Define your paths
const GENOME_SKILLS_PATH = path.join(process.cwd(), 'src/design-genome/skills.md');
const ARCHITECTURE_PATH = path.join(process.cwd(), 'architecture.md');

function syncGovernance() {
  if (!fs.existsSync(GENOME_SKILLS_PATH)) {
    console.error('❌ Design Genome submodule missing. Run: git submodule update --init');
    process.exit(1);
  }

  // 1. Read the external design genome guardrails
  const genomeSkills = fs.readFileSync(GENOME_SKILLS_PATH, 'utf8');

  // 2. Read your current architecture document
  let architectureDoc = fs.readFileSync(ARCHITECTURE_PATH, 'utf8');

  // 3. Target placeholders inside architecture.md to inject the rules dynamically
  const startMarker = '<!-- GENOME-GUARDRAILS:START -->';
  const endMarker = '<!-- GENOME-GUARDRAILS:END -->';
  
  const regex = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`, 'g');
  const updatedSection = `${startMarker}\n\n### System Guardrails (Synced)\n${genomeSkills}\n\n${endMarker}`;

  architectureDoc = architectureDoc.replace(regex, updatedSection);

  // 4. Overwrite architecture.md with the updated live guardrails
  fs.writeFileSync(ARCHITECTURE_PATH, architectureDoc, 'utf8');
  console.log('✅ Main architecture layer successfully updated with external Design Genome!');
}

syncGovernance();
