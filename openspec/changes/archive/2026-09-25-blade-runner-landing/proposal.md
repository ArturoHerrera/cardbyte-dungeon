## Why

The current landing page functions as a feature showcase but suffers from visual fatigue and oversaturation: excessive boxy containers, heavy bezels, faux gold pins, and cluttered telemetry badges that fight for visual attention. 

To create a truly compelling, atmospheric first impression aligned with the game's identity, the portal needs a complete aesthetic and experiential overhaul inspired by the cinematic, melancholic, and elegant visual language of *Blade Runner* (volumetric mist, warm amber and rain-cyan lighting, breathing room/dark space, high-contrast typography, and smooth retro-cyberpunk micro-interactions) while showcasing the project's 48-hour AI acceleration story and integrating the creator's real photograph with an interactive biometric scan.

## What Changes

- **Cinematic Volumetric Mist & Lighting**: Replace rigid matrix grid overlays with a smooth, lightweight CSS/Canvas volumetric fog and ambient amber/cyan light shafts that breathe organically.
- **Blade Runner Noir Typography & Layout**: Eliminate heavy nested boxes and borders; introduce generous dark space, high-contrast typography, and minimalist structural lines.
- **Direct Jack-in & Streamlined Controls**: Header with minimalist ambient audio toggle (Vangelis-inspired analog synth pad), bilingual locale switcher (ES/EN), and direct game launch button (`/game.html`).
- **Genesis Narrative & Tech Radiography**: Merge the 48-hour AI acceleration experiment, OpenSpec workflow story, and love letter to 1984 Gibsonian cyberpunk seamlessly with the underlying technology architecture (React 19, TypeScript, Zustand, Tailwind CSS v4, WebAudio API).
- **Physical Grimoires Showcase with Real Cover Art**: Display the actual canonical cover art (`/assets/book/cover.jpg`) with a physical collector's book finish, displaying page counts (85 pages ES / 82 pages EN) and direct 1-click PDF download buttons.
- **Architect Dossier with Real Portrait & Biometric Scanner**: Integrate Arturo Herrera's nocturnal city portrait into a Tyrell-style biometric security clearance dossier featuring an interactive laser scan line on hover (`Voight-Kampff` optical scan), highlighting 7+ years of Senior Android Engineering experience, current AI Engineering studies, and a direct link to LinkedIn.

## Capabilities

### Modified Capabilities
- `landing-portal`: Redefine the visual style, hero presentation, manual downloads showcase (with real cover art), audio synthesizer tone (Blade Runner / Vangelis warmth), and architect dossier with authentic photography and biometric scanning.

## Impact

- **Frontend Code**: Complete overhaul of `src/landing/` components (`LandingApp.tsx`, `HeroCRT.tsx` -> `HeroBladeRunner.tsx`, `GenesisStory.tsx`, `RomCartridges.tsx` -> `GrimoiresShowcase.tsx`, `OperatorBadge.tsx` -> `ArchitectDossier.tsx`, `TopNav.tsx`).
- **Assets**: Copy user-uploaded portrait to `public/assets/architect.jpg` (or `.png`), utilize existing `public/assets/book/cover.jpg` for book showcase.
- **Audio Engine**: Fine-tune `src/landing/audio/landingAudio.ts` for warmer analog Vangelis-style synth drone and biometric scan audio effects.
- **Styling**: Add volumetric fog and biometric scanline animation utilities in `src/index.css` without breaking the core game styles.
