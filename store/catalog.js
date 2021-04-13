export const state = () => ({
    catalog: []
})

export const mutations = {
    SET_CATALOG_FROM_SERVER(state, catalog){
        state.catalog = catalog
    }
}

export const actions = {
    async SET_CATALOG_FROM_SERVER({commit}) {
        const catalog = await (await fetch('https://raw.githubusercontent.com/ArtemRostomyan/server/main/server.js')).json()
        commit('SET_CATALOG_FROM_SERVER', catalog)
    }
}

export const getters = {
    CATALOG : s => {
        return s.catalog
    }
}