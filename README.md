# Family.js

A library to form and break a family.

### Installing

#### Require the module
```javascript
const Family = require('family');
```

#### Creating a family
```javascript
let family = new Family();
```
The constructor can take one plain object parameter, which can hold the following keys:
**verbose**: Throws more stuff in your console.
**parents**: A list of parents for the family. If missing, will default to mom and dad.
**children**: A list of children for the family. If missing, will default to son and daughter.
**members**: A list of members for the family, if you're lazy to split the names. Will default to mom, dad, son, and daughter.

#### Kill family member
```javascript
family.kill(member);
```
where `member` is one of dad, mom, son, pr daughter.

Violently murders a member of the family, you monster. Returns true if the execution succeded, or false if it cannot be completed because the member is missing.

#### Add a family member

##### adopt
```javascript
family.adopt(child);
```
where `child` is either son or daughter.

Adopts a child to the current family. Stricter alternative to `add()`, `adopt()` throws an error if `child` is not a child name. There is no parent counterpart.

##### add
```javascript
family.add(member);
```
where `member` is either dad, mom, son, or daughter.

Adds a member to the family.

#### Divorce the family
```javascript
let sad_family = family.divorce();
```

Splits the parents of the family and divides the children equitatively. Returns another `Family` object. I hope you're happy.

#### toString, emoji representation
```javascript
let emoji = family.toString();
let emoji_message = `Look at the family I destroyed! ${family}`;
```

Returns an emoji representation of the family.