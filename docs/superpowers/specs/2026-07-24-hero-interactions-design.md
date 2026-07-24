# Hero Interactions Design

## Goal

Add personality to the homepage through a deliberate correction in the name typing sequence and a custom green pointer for mouse devices.

## Typing Correction

The name types one character at a time at the existing pace. At the cedilla position, it follows this sequence:

1. `Lucas Lourenc`
2. Pause for approximately 400ms.
3. Remove the `c`.
4. Pause for approximately 220ms.
5. Type `ç`.
6. Pause for approximately 180ms and continue with `o`.

The insertion caret stays beside the current text throughout the sequence and begins blinking only after the final `o`. The title keeps its reserved dimensions so no surrounding content moves. Users who prefer reduced motion see the complete correct name immediately.

## Custom Pointer

On devices matching `(hover: hover) and (pointer: fine)`, replace the native pointer with a 10px green circle using the existing accent color. The circle follows the pointer directly and never captures pointer events.

When the pointer is over a link, button, or another explicitly interactive control, the circle grows smoothly to 28px. It returns to 10px when leaving the control. The custom pointer is hidden when the pointer leaves the document and restored when it returns.

Touch and coarse-pointer devices retain the native behavior. With reduced motion, the custom pointer remains available but size changes happen without animation.

## Architecture

Keep the typing behavior inside `TypingName.tsx` and express its sequence as timed frames rather than deriving every state from a character count. Implement the pointer as a focused client component mounted once by the shared portfolio shell, with document-level pointer listeners and CSS transforms.

## Verification

Contract tests cover the deliberate `C` correction sequence, timing, pointer capability query, interactive hover state, touch fallback, and reduced-motion behavior. Validate with automated tests, lint, TypeScript, production build, and Playwright measurements/screenshots.
