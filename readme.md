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
- [ ] Phase 2
  - [ ] Projectile implementation + collisions
  - [ ] Show damage numbers
  - [ ] Sound
  - [ ] Infinite room with environment
  - [ ] Enemy generation
  - [ ] Level progression / Cards
  - [ ] Sprite generation
  - [ ] Music

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