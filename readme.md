# Spirit Hunter

The repository contains the game made for the js13kGames competition in 2024.

Competition rules:
> js13kGames is a JavaScript coding competition for Web Game Developers running yearly since 2012. The fun part of the compo is the file size limit set to 13 kilobytes. The competition started at 13:00 CEST, 13th August and will end at 13:00 CEST, 13th September 2024. Theme this year is [Triskaidekaphobia](https://medium.com/js13kgames/js13kgames-2024-start-and-theme-announcement-5d734f77da68).


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
  - [ ] Level progression / Cards
  - [x] Menus
  - [x] Dynamic scaling
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
