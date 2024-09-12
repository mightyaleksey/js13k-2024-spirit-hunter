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
  - [ ] Music
  - [ ] Enemy generation
  - [ ] Menus
  - [ ] Level progression / Cards
  - [ ] Dynamic scaling
  - [ ] Sprite generation


## Specs

Archetypes:
- `Entity` — universal class that defines dimentions, statuses and handles rendering
- `Character` — base class for the interactive characters (enemies, player and etc)
- `Thing` — base class for the environment objects (walls)

Update sequence:
- entity update
  - custom logic (I/O handlers for example)
  - position update
- clean up destroyed entities
- collision detection


## Resources

- Sound: https://sfxr.me/


## How To

Open local server on mobile device:
- Get IP: `ipconfig getifaddr en1`.
- Run vitejs with `--host <ip>`.
- Open final address on device.