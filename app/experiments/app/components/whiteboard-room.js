import Ember from 'ember';

export default Ember.Component.extend({
    drawModes: ['point', 'line', 'polyline', 'erase'],
    drawMode: 'line',
    titleLimit: 50,

    didInsertElement() {
        this.refreshControls();
    },

    actions: {
        setDrawMode(mode) {
            if (this.get('drawModes').indexOf(mode) !== -1) {
                this.set('drawMode', mode);
                this.refreshControls();
            }
        },
        handleClear(callback) {
            this.set('handleClear', callback);
        },
        clearWhiteboard() {
            this.get('handleClear')();
        },
        save() {
            var title = this.get('title'),
                whiteboard;

            if (typeof title !== 'string' || !title.trim().length) {
                this.$('#title').focus();
                return;
            }
            whiteboard = this.get('targetObject.store').createRecord('whiteboard', {
                title: title.trim().substring(0, this.get('titleLimit'))
            });
            this.set('title');
            whiteboard.save();
        }
    },

    refreshControls() {
        this.$('.ui.button').removeClass('active');
        this.$('.ui.button[data-id="' + this.get('drawMode') + '"]').addClass('active');
    }
});
