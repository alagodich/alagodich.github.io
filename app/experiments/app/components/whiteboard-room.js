import Ember from 'ember';

export default Ember.Component.extend({
    drawModes: ['line', 'erase'],
    drawMode: 'line',
    titleLimit: 50,
    savingInProcess: false,
    savingQueue: [],

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
            let queueChunk = queue;
            this.set('savingQueue', []);
            queueChunk.forEach((element) => {
                Ember.run.once(this, function () {
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
            });
        }
    },

    refreshControls() {
        this.$('.ui.button').removeClass('active');
        this.$('.ui.button[data-id="' + this.get('drawMode') + '"]').addClass('active');
    }
});
