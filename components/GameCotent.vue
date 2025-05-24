<template>
    <div>
        <ul class="side-nav">
            <li v-for="game in gameType" :key="game">{{ game }}</li>
        </ul>
    </div>
</template>
<script setup lang="ts">
    const gameType = reactive(['电子','捕鱼','真人','体育','彩票','电竞','棋牌','区块链','电子','捕鱼','真人','体育','彩票','电竞','棋牌','区块链','电子','捕鱼','真人','体育','彩票','电竞','棋牌','区块链'])

</script>
<style scoped>
    ul {
        list-style: none;
    }
    .side-nav li {
        height: 5vh;
        width: 9vw;
        background-color: #222222;
        display: flex;
        justify-content: center;
        align-items: center;
        word-wrap: break-word;
        margin: 2vh 0;
        border-radius: 10%;
        font-size: 1.5vh;
        cursor: pointer;
    }

</style>