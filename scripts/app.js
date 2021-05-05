const app = new Vue({
    el: "#app",
    data: {
        chatsList: globalChatsList,
        currentChat: {}
    },
    methods: {
        getAvatar: user => 'img/avatar' + user.avatar + '.jpg',

        chatWith(user) {
            this.currentChat = user;
        }
    },
    mounted() {
        this.currentChat = this.chatsList[2];
    }
});