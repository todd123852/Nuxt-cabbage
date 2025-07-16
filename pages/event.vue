<template>
  <div class="event-container">
      <div class="event-tab">
        <div class="event-type" v-for="type in eventTypes" :key="type.name">
          <span class="type-icon">
            <van-icon :name="type.icon" />
          </span>
          <div class="type-name">
            {{ type.name }}
          </div>
        </div>
      </div>
      <div class="event-scroll">
        <div class="publicityImg"
        v-for="num in 50"
        >{{ num }}</div>
      </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'event-page',
  });
  const eventTypes = reactive([
    {name: '综合', icon: 'qr-invalid', events: {}}, 
    {name: '代理推广', icon: 'friends', events: {}}, 
    {name: '新年加码', icon: 'cash', events: {}}, 
    {name: '新人彩金', icon: 'gem', events: {}}, 
    {name: '大放送', icon: 'point-gift', events: {}}, 
    {name: '世界杯', icon: 'flag', events: {}}, 
    {name: '转转乐转圈圈赚钱钱', icon: 'after-sale', events: {}}
  ])
</script>
<style scoped>
  .event-container {
    width: 100%;
    display: flex;
    padding: 0 .7rem;
    height: 100%;
  }
  .event-tab {
    height:100%;
    width: 25%;
    padding-right: .7rem;
  }
  .event-scroll {
    overflow-y: scroll;
    height: 100%;
    width: 75%;
    padding-top: 1rem;
  }
  .event-type {
    width: 100%;
    height: 2.7rem;
    display: flex;
    flex-shrink: 1;
    align-items: center;
    color: var(--primary);
    border-radius: .4rem;
    border: .1rem solid var(--primary);
    margin: 1rem 0;
    background-color: var(--bg_3);
    cursor: pointer;
  }
  .type-name {
    display:-webkit-box;
    -webkit-box-orient: vertical;
    vertical-align: middle;
    -webkit-line-clamp: 2;
    justify-content: center;
    flex-grow: 1;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: .9rem;
    cursor: pointer;
  }
  .type-icon {
    font-size: 1.5rem;
    margin: 0 .2rem;
    cursor: pointer;
  }
  .publicityImg {
    height: 7rem;
    width: 100%;
    background-color: antiquewhite;
    margin-bottom: 1rem;
  }
</style>