
export const state = () => ({
    chat: []
})

export const mutations = {
    SET_CHAT_IN_STATE(state, new_koment){
        if(state.chat.length >= 30){
            state.chat.splice(0, 20)
            state.chat.push(new_koment)
            console.log(state.chat)
        } else{
            state.chat.push(new_koment)
            console.log(state.chat)
        }
    }
}

export const actions = {
    // SET_CHAT_IN_STATE({commit}){
    //     let new_koment = {}
        
    //     commit('SET_CHAT_IN_STATE', new_koment)
    // }
}

export const getters = {
    CHAT : s => {
        return s.chat
    }
}