<template>
    <div class="game-diary">
        <div class="game-option" v-for="num in 10">
            <div class="game-img">{{ num }}</div>
            <div class="game-name">{{ num }}</div>
        </div>
    </div>
</template>
<style scoped>
    .game-diary {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: .5rem;
        gap: .8rem;
    }
    .game-option {
        
    }
    .game-img {
        width: 100%;
        padding-bottom: 100%;
        height: 0;
        background-color: aquamarine;
        margin: 0 auto;
        border-radius: .7rem;
    }
    .game-name {
        color: var(--lead);
        text-align: center;
        font-size: 1rem;
    }
    @media(width > 450px) {
        .game-img {
            aspect-ratio: 1 / 1; 
        }
    }
</style>