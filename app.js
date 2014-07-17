// I've never used Ember before--please forgive any poor style!

// Create the app
App = Ember.Application.create();

 // Grab saved users if possible; if not, set some default initial values
var users = JSON.parse(localStorage.getItem('users')) || [{
    firstName: 'Jeff',
    lastName: 'Goldblum',
    email: 'jeff@jeffgoldblum.com',
    access: 'Admin'
}];

// Create the model
App.IndexRoute = Ember.Route.extend({
    model: function() {
        return users;
    }
});

// Create the controller
App.IndexController = Ember.ObjectController.extend({
    accessLevels: ['Admin', 'Write', 'Edit', 'Read'], // Options for the access dropdown
    save: function() {
        var entry = {};
        entry.firstName = this.get('firstName');
        entry.lastName = this.get('lastName');
        entry.email = this.get('email');
        entry.access = this.get('access');
        function valid(entry) {
            function validEmail(email) {
                var pattern = /\S+@\S+\.\S+/; // Obviously not a perfect regex, but enough to weed out typos
                return pattern.test(email);
            }
            var shouldSave = true;
            if (entry.firstName === '') {
                alert('Sorry: first name is required');
                shouldSave = false;
            }
            if (!validEmail(entry.email)) {
                alert('Looks like that might not be a valid email address!');
                shouldSave = false;
            }
            return shouldSave;
        }
        if (valid(entry)) {
            if (this.get('editing')) {
                users.replace(this.get('index'), 1, [{firstName: entry.firstName, lastName: entry.lastName, email: entry.email, access: entry.access}]); // If we're editing, replace in the array...
            } else {
                users.addObject({firstName: entry.firstName, lastName: entry.lastName, email: entry.email, access: entry.access}); // ... otherwise, just add the object
            }
            window.localStorage.setItem("users", JSON.stringify(users)); // Persist the changes before clearing the form
            this.set('firstName', '');
            this.set('lastName', '');
            this.set('email', '');
            this.set('editing', false);
            document.activeElement.blur(); // Unfocus the form
        }
    },
    delete: function(user) {
        var confirmed = confirm('Are you sure you want to delete this user?');
        if (confirmed) {
            users.removeObject(user);
            window.localStorage.setItem("users", JSON.stringify(users)); // Persist the changes
        }
    },
    edit: function(user, index) {
        this.set('firstName', user.firstName);
        this.set('lastName', user.lastName);
        this.set('email', user.email);
        this.set('access', user.access);
        this.set('index', index); // Which we'll need to replace the object in the array
        this.set('editing', true);
    }
});