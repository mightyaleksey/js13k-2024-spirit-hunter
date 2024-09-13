# js13k

## Plan
- [x] Phase 1: MVP
  - [x] Add Entity class
  - [x] Add Enemy, Player
  - [x] Add GameObject
  - [x] Add camera movement
  - [x] Add shooting
  - [x] Basic AI
  - [x] Add enemy generation
- [ ] Phase 2
  - [x] Projectile implementation + collisions
  - [x] Show damage numbers
  - [x] Add environment
  - [x] Infinite map
  - [x] Mobile controls
  - [x] Sound
  - [x] Music
  - [ ] Enemy generation
  - [ ] Menus
  - [ ] Level progression / Cards
  - [ ] Dynamic scaling
  - [ ] Sprite generation


## How To

Prototypes:
- `Entity` — Universal building block for other game elements. Implements dimentions, statuses and rendering.
- `Character` — Base class for the interactive characters (enemies, player). Inheritor of Entity.
- `Thing` — Base class for the environment objects (obstacle, projective).

Update sequence:
1. Entity changes (I/O logic, movement).
2. Clean up destroyed entities.
3. Collision detection.

Open local server on mobile device:
- Get IP: `ipconfig getifaddr en1`.
- Run vitejs with `--host <ip>`.
- Open final address on device.


## Resources

- Music: https://keithclark.github.io/ZzFXM/
- Sound: https://sfxr.me/
