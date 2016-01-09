import Ember from 'ember';

export default Ember.Component.extend({
    drawModes: ['line', 'erase'],
    drawMode: 'line',
    titleLimit: 50,
    savingInProcess: false,
    savingQueue: [],
    strokeWidth: 2,
    stroke: '#0E6EB8',
    fill: false,

    didInsertElement() {
        this.refreshControls();
    },

    init() {
        this._super();
        this.get('activeWhiteboard');
    },

    actions: {
        setDrawMode(mode) {
            if (this.get('drawModes').indexOf(mode) !== -1) {
                this.set('drawMode', mode);
                this.refreshControls();
            }
        },

        setStroke(stroke) {
            this.set('stroke', stroke);
            this.set('drawMode', 'line');
            this.refreshControls();
        },

        /**
         * Get callback from child component to call when we want
         * @param callback
         */
        handleClear(callback) {
            this.set('handleClear', callback);
        },

        /**
         * Call clear callback received from child component
         */
        clearWhiteboard() {
            this.get('handleClear')();
        },

        saveTitle() {
            this.get('activeWhiteboard').then((whiteboard) => {
                if (whiteboard.get('title').length === 0) {
                    whiteboard.set('title', 'No name');
                }
                whiteboard.save();
            });
        },

        queueForSaving(elementData) {
            let queue = this.get('savingQueue');
            var element = this.get('targetObject.store').createRecord('svg-element', elementData);
            queue.push(element);
            this.set('savingQueue', queue);
            this.processQueue();
        }
    },

    processQueue() {
        let saving = this.get('savingInProcess');
        var queue = this.get('savingQueue');

        if (!queue.length) {
            return;
        }
        if (saving) {
            Ember.run.next(this, this.processQueue, 1000);
        } else {
            // TODO check http://emberjs.com/api/data/classes/DS.Store.html#method_scheduleSave
            var element = this.get('savingQueue').pop();
            Ember.run.once(this, function() {
                this.set('savingInProcess', true);
                this.get('activeWhiteboard').then((whiteboard) => {
                    whiteboard.get('elements').then((elements) => {
                        elements.pushObject(element);
                        whiteboard.save().then(() => {
                            element.save();
                            this.set('savingInProcess', false);
                        });
                    });
                });
            });
        }
    },

    refreshControls() {
        this.$('.mode.field .ui.button').removeClass('active');
        this.$('.mode.field .ui.button[data-id="' + this.get('drawMode') + '"]').addClass('active');

        this.$('.stroke.field .ui.button').addClass('basic');
        this.$('.stroke.field .ui.button[data-id="' + this.get('stroke') + '"]').removeClass('basic');
    }
});