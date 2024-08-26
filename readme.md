# js13k

## Plan
- [ ] Phase 1: MVP
  - [x] Add Entity class
  - [x] Add Enemy, Player
  - [x] Add GameObject
  - [x] Add camera movement
  - [x] Add shooting
  - [x] Basic AI
  - [x] Add enemy generation
  - [ ] Generate two rooms
  - [ ] Add transition between rooms
- [ ] Phase 2: Gameplay
  - [ ] Level progression
  - [ ] Shop and consumables & Income
  - [ ] Status effects
  - [ ] Handle touch events
- [ ] Phase 3: Polish
  - [ ] Main plot, Theme
  - [ ] Graphics
  - [ ] Bosses
  - [ ] Second hero

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