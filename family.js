class Family {
    static get parent_names() {
        return ['mom', 'dad'];
    }

    static get children_names() {
        return ['son', 'daughter'];
    }

    static get emoji_table() {
        return {
            mom: '👩',
            dad: '👨',
            son: '👦',
            daughter: '👧',
            JOINER: '‍'
        };
    }

    static emojify(member) {
        return Family.emoji_table[member];
    }

    constructor(props) {
        props = {
            parents: ['dad', 'mom'],
            children: ['daughter', 'son'],
            ...props
        };

        if (props.members) {
            props.parents = [];
            props.children = [];
            props.members.forEach(member => {
                if (Family.parent_names.includes(member)) {
                    if (props.parents.length < 2) {
                        props.parents.push(member);
                    }
                } else if (Family.children_names.includes(member)) {
                    if (props.children.length < 2) {
                        props.parents.push(member);
                    }
                }
            });
            delete props.members;
        }

        for (let key in props) {
            this[key] = props[key];
        }
    }

    get members() {
        return this.parents.concat(this.children);
    }

    kill(member) {
        let table = Family.parent_names.includes(member) ? this.parents : this.children;
        let i = table.indexOf(member);
        if (i == -1) return false;
        if (this.verbose && table.length == 1) {
            console.warn('A family cannot have no children/parents! It must have at least one of both to be correctly converted to emoji.');
            return false;
        }
        table.splice(i, 1);
        return true;
    }

    adopt(child) {
        if (!Family.children_names.includes(child)) {
            throw new Error('Family.adopt: first parameter is not a child!');
        }

        if (this.children.length == 2) return false;

        return this.add(child);
    }

    add(member) {
        if (Family.children_names.includes(member)) {
            if (this.children.length < 2) {
                this.children.push(member);
                this.children = this.children.sort(); // Required not to form invalid emoji
                return true;
            }
        } else if (Family.parent_names.includes(member)) {
            if (this.parents.length < 2) {
                this.parents.push(member);
                this.parents = this.parents.sort(); // Required not to form invalid emoji
                return true;
            }
        }
        return false;
    }

    divorce() {
        if (this.parents.length == 1) {
            if (this.verbose) {
                console.warn('Divorce cannot be called when there is just one parent!');
            }
            return false;
        }
        let child = this.children[1];
        let parent = this.parents[0];
        this.kill(child);
        this.kill(parent);
        return new Family({
            children: [child],
            parents: [parent]
        });
    }

    toString() {
        return this.members.map(Family.emojify).join(
            this.parents.length && this.children.length ? Family.emoji_table.JOINER : ''
        );
    }
}

if(typeof module != 'undefined' && module.exports) {
    module.exports = Family;
} else if (typeof define == 'function' && define.amd) {
    define(Family);
}