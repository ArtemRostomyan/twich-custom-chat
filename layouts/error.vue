<template>
    <section>
        <div class="error-block">
            <h2>Ошибка</h2>
            <p>Видимо данный раздел прекратил свое существование, либо вы ввели неправельную ссылку</p>
        </div>
    </section>
</template>

<style scoped lang="scss">
section{
    display: flex;
    justify-content: center;
    margin-top: 100px;
}
.error-block{
    max-width: 400px;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 2px;
}
h2{
    color: rgb(156, 4, 4);
    font-weight: 600;
}
p{
    font-weight: 500;
    color: rgb(39, 39, 39);
}
</style>