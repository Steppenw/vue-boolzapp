const app = new Vue({
    el: "#app",
    data: {
        chatsList: globalChatsList,
        //currentChat: {},
        currentChat: globalChatsList[2],
        searchText: "",
        newMsg: ""
    },
    computed: {
        currentChatLastAccess() {
            /*const inMsgs = this.currentChat.messages.filter(function(message) {
                return message.status === 'received';
            });*/
            const inMsgs = this.currentChat.messages.filter((message) => message.status === 'received');
            //console.log(inMsgs);
            if (inMsgs.length === 0) {
                return 'Dati ultimo accesso non disponibili.';
            }
            const DateLastInMsgs = inMsgs[inMsgs.length - 1].date;
            //console.log(DateLastInMsgs);
            return 'Ultimo accesso alle ' + this.time(DateLastInMsgs);
        },
        
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

        time(stringDate) {
            return (moment(stringDate, 'DD/MM/YYYY HH:mm:ss').format('HH:mm'));
        },

        sendMessage() {
            const newMessage = {
                date: moment().format('DD/MM/YYYY HH:mm:ss'),
                text: this.newMsg,
                status: 'sent'
            };

            //this.currentChat.messages.push(newMessage);

            //fix per quando varii 'currentChat' prima dell'arrivo di 'newInMsg'
            const ThisChat = this.currentChat;
            ThisChat.messages.push(newMessage);

            this.newMsg = "";

            this.autoScrollMessages();

            setTimeout(() => {
                //Non fosse 'arrow' non vi sarebbe accesso al 'this' di Vue
                const newInMsg = {
                    date: moment().format('DD/MM/YYYY HH:mm:ss'),
                    text: 'Ok!',
                    status: 'received'
                }

                //this.currentChat.messages.push(newInMsg);
                ThisChat.messages.push(newInMsg);

                this.autoScrollMessages();
            }, 3000);
        },

        autoScrollMessages() {
            this.$nextTick(() => {
                //HtmlEl = this.$refs.autoScrollMessages;
                this.$refs.autoScrollMessages.scrollTop = this.$refs.autoScrollMessages.scrollHeight;
            });
            
        },

        onMsgClick(message, event) {
            this.$set(message, "showPopup", true);
            event.currentTarget.focus();
            //event.stopPropagation();
        },

        onFocusLoss(message) {
            message.showPopup = false;
        },

        onPopupClick(message) {
            this.onFocusLoss(message);
        },

        onDeleteClick(index) {
            this.currentChat.messages.splice(index, 1);
        },

        getLastMsg(messages) {
            if (messages.length === 0) {
                return 'Non ci sono messaggi.';
            }

            const lastMsg = messages[messages.length - 1];
            const lastMsgDate = this.time(lastMsg.date);
            let truncatedMsg = lastMsg.text.slice(0, 20);
            
            if (lastMsg.text.length > 20) {
                truncatedMsg += '...';
            }
            return truncatedMsg + ' - ' + lastMsgDate;
        }
    },
    /*mounted() {
        this.currentChat = this.chatsList[2];
    }*/
});