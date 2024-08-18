# Hypixel Skyblock Discord Bot
Early development bot that tracks information on hypixel skyblock.

## Bot Commands
### /profile
Returns an embed containing a level summary of a player's skyblock profile.

- **username**: player's Minecraft username.
- **profile_name**: Skyblock profile name.
```
/profile {username} {profile_name}
```
example call
```
/profile sheebar Lime
```

## TODO
- [ ] Fetch auction house data from api endpoint.
- [ ] Create auction command where user can track an auction.
- [ ] Have bot notify user when auction reaches a certain price.
- [ ] Use a scheduler to retrieve auction house data periodically. 
- [ ] Setup database for storing auctions a user is tracking.
- [ ] Create other informational commands.
