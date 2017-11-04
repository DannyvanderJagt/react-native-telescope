## Data Separation

## UI Store
> Best option: Redux

- Network Status
- Device Info
- App Status (active, orientation etc)
- Language (Strings for UI)
- Navigator ('Global' react-native-navigation top layer)

### Pros & Cons
**Pros:**
- Redux actions
- React UI implementation

**Cons:**
- Gets messy quite quickly with a lot of actions fired.
- Slow

### Expose as:
- Reducers
- Navigation: `Global` object

## Data Store
> Best option: Realm

- Handle Api calls
- Offline support
- Normalize
- Queries
- Data Sets

### Extras:
- Add a redux like queue to monitor changes for developers.
- (No wind-back because of performance)

## Expose as:
- `connect` style method
- `Global` objects

## Pros & Cons
**Pros:**
- Fast
- Build in Query engine
- Large data sets
- Direct reference, no copied data
- Auto updating queries / UI
- Clear layer between Api and Database
- Normalization
- Track history in debug mode (Query speed, api calls, normalization etc.)

**Cons:**
- Hidden event queue (no actions), fixable see Extras
