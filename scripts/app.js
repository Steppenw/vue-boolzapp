const app = new Vue({
    el: "#app",
    data: {
        chatsList: globalChatsList,
        currentChat: {},
        searchText: "",
        newMsg: ""
    },
    computed: {
        filteredChatsList() {
            return this.chatsList.filter((element) => {
                //return element.name.toLowerCase().includes(this.searchText.toLowerCase());
                return element.name.toLowerCase().startsWith(this.searchText.toLowerCase());
            });
        }
    },
    methods: {
        getAvatar: user => 'img/avatar' + user.avatar + '.jpg',

        chatWith(user) {
            this.currentChat = user;
        },

        sendMessage() {
            const newMessage = {
                date: '',
                text: this.newMsg,
                status: 'sent'
            };

            this.currentChat.messages.push(newMessage);
            //fix: quando cambi 'currentChat' prima del tempo settato per l'invio di 'newInMsg'
            //const activeChat = this.currentChat;
            //activeChat.messages.push(newMessage);

            this.newMsg = "";

            this.autoScrollMessages();

            setTimeout(() => {
                //Non fosse 'arrow' non vi sarebbe accesso al 'this' di Vue
                const newInMsg = {
                    date: '',
                    text: 'Ok!',
                    status: 'received'
                }

                this.currentChat.messages.push(newInMsg);
                //activeChat.messages.push(newInMsg);

                this.autoScrollMessages();
            }, 1000);
        },

        autoScrollMessages() {
            this.$nextTick(() => {
                //HtmlEl = this.$refs.autoScrollMessages;
                this.$refs.autoScrollMessages.scrollTop = this.$refs.autoScrollMessages.scrollHeight;
            });
            
        }
    },
    mounted() {
        this.currentChat = this.chatsList[2];
    }
});