const app = new Vue({
    el: "#app",
    data: {
        chatsList: globalChatsList,
    },
    methods: {
        getAvatar: user => 'img/avatar' + user.avatar + '.jpg',
    }
});