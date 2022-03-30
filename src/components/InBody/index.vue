<template>
    <div v-if="visible">
        <slot/>
    </div>
</template>
<script>
export default {
    name:'InBody',
    props:['visible'],
    mounted() {
        const node = this.$mount().$el;
        document.body.appendChild(node);
    },
    destroyed() {
        const node = this.$mount().$el;
        node.remove();
    },
}
</script>
<style>
    
</style>