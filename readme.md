# js13k

## Plan
- [ ] Phase 1: MVP
  - [x] Add Entity class
  - [x] Add Enemy, Player
  - [ ] Add GameObject
  - [ ] Generate two rooms
  - [ ] Add camera movement
  - [ ] Handle touch events

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