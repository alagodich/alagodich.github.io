import Ember from 'ember';

export default Ember.Component.extend({
    channelId: 659,
    channelName: 'web_channel',
    notificationChannelName: 'notification_channel',

    // Doesn't work for now, TODO implement actions: https://guides.emberjs.com/v2.2.0/components/triggering-changes-with-actions/
    messages: [{name: 'tester', text: 'first message test'}],

    /**
     * Init chat room
     */
    didInsertElement() {
        this.startServer();
        this.subscribe();
        this.attachEvents();
    },

    /**
     * Start comet server
     */
    startServer() {
        CometServer().start({dev_id: this.channelId}, () => {
            console.log('Server started.');
        });
    },

    /**
     * Subscribe to the main and notification channels
     */
    subscribe() {
        CometServer().subscription(this.channelName, (message) => {
            this.messages.push({
                name: message.data.name,
                text: message.data.text
            });
            //this.$('#messages').append("<p><b>" + this.htmlEncode(message.data.name) + ": </b>" + this.htmlEncode(message.data.text) + "</p>");
        });

        comet_server_signal().connect(this.notificationChannelName, (message) => {
            this.messages.push({
                name: message.name,
                text: message.text
            });
            //this.$('#messages').append("<p><b>" + this.htmlEncode(message.name) + ": </b>" + this.htmlEncode(message.text) + "</p>");
        });

        // Подписываемся на канал в который и будут отправляется уведомления о доставке отправленных сообщений.
        //CometServer().subscription("#web_MainPageChat", (p) => {
        //    console.log('subscribed to notifications');
        //    console.log(p);
        //    // Запишем время в момент получения отчёта о доставке сообщения
        //    var etime = new Date();
        //
        //    console.log(["answer_to_chat_pipe", p]);
        //    this.$('#answer').append("Delivered: " + p.data.number_messages + " получателям за " + (etime.getTime() - timer.getTime() ) + "ms");
        //    //$("#answer_div").html("Сообщение доставлено " + p.data.number_messages + " получателям за " + (etime.getTime() - timer.getTime() ) + "ms");
        //    //$("#answer_error").html(" " + p.data.error);
        //});
    },

    attachEvents() {
        // Send message
        this.$('#send').on('click', () => {
            var name = this.$('#name').val(),
                textarea = this.$('#text');
            this.send(name, textarea.val());
            textarea.val('');
        });

        // Refresh history
        this.$('#refresh').on('click', () => {
            CometServer().get_pipe_log(this.channelName, function (history) {
                console.log(history);
            });
            console.log('refresh');
        });
    },

    /**
     * Send to the main channel and notification channel
     * @param name
     * @param text
     */
    send(name, text) {
        CometServer().web_pipe_send(this.channelName, {"text": text, "name": name});
        comet_server_signal().send_emit(this.notificationChannelName, {"text": text, "name": name});
    },

    /**
     * Create a in-memory div, set it's inner text(which jQuery automatically encodes)
     * then grab the encoded contents back out.  The div never exists on the page.
     * @param value
     * @returns {*|jQuery}
     */
    htmlEncode(value){

        return $('<div/>').text(value).html();
    },

    htmlDecode(value){
        return $('<div/>').html(value).text();
    }
});
