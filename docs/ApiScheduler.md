## Api Scheduler

## Prios
> - How many layers of prio do we want as default?
> - Do we want to make this customizable for the developer?

- `0` - Important
- `1` - Normal
- `2` - Background

## Status Response Handlers
- Generic - `4xx` - Catch all 400 status response
- Specific - `401` - Catch a specific status response
- Declarative - `Success`, `Error`, `Offline`, etc...
